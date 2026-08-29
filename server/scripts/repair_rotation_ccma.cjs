/* Repair the answer-letter distribution bias in CCMA questions.
 * The generator produced 49% B / 4% D answers. Rotate each question's
 * options cyclically so the correct answer lands on A/B/C/D in round-robin
 * (target = index % 4 => ~25% per letter). Options keep their a)/b)/c)/d)
 * prefixes re-aligned to the new position; correct_answer updated to match.
 */
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const LETTERS = ['a', 'b', 'c', 'd'];
const stripPrefix = (s) => String(s).replace(/^[a-d]\)\s*/, '').trim();

(async () => {
  const exam = await p.exam.findUnique({ where: { code: 'CCMA' } });
  if (!exam) { console.log('exam CCMA introuvable'); process.exit(1); }
  const qs = await p.question.findMany({
    where: { examId: exam.id, type: 'MCQ', status: 'APPROVED' },
    select: { id: true, options: true, correctAnswer: true },
    orderBy: { id: 'asc' },
  });
  console.log('questions:', qs.length);

  let fixed = 0, skipNoMatch = 0, globalIdx = 0;
  const byLetter = { a: 0, b: 0, c: 0, d: 0 };

  for (const q of qs) {
    // correctAnswer is a letter ('a'..'d') — find the matching option text
    const curLetter = String(q.correctAnswer).trim().toLowerCase().replace(/[^a-d]/g, '');
    let correctIdx = LETTERS.indexOf(curLetter);
    const plainOpts = q.options.map(stripPrefix);
    if (correctIdx < 0 || correctIdx >= plainOpts.length || !plainOpts[correctIdx]) { skipNoMatch++; continue; }

    // Rotate plain texts so the correct one lands on the cyclic target
    const targetIdx = globalIdx % 4;
    const rotatedPlain = [...plainOpts];
    const correctText = plainOpts[correctIdx];
    while (rotatedPlain[targetIdx] !== correctText) {
      rotatedPlain.push(rotatedPlain.shift());
    }

    const newOptions = rotatedPlain.map((o, i) => `${LETTERS[i]}) ${o}`);
    const newCorrect = LETTERS[targetIdx];

    await p.question.update({
      where: { id: q.id },
      data: { options: newOptions, correctAnswer: newCorrect },
    });
    fixed++;
    byLetter[newCorrect]++;
    globalIdx++;
  }

  console.log('réparées:', fixed, '| sans match:', skipNoMatch);
  console.log('distribution finale:', byLetter);
  await p.$disconnect();
})();

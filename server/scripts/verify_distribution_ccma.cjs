/* Verify letter->position coherence after rotation */
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

(async () => {
  const exam = await p.exam.findUnique({ where: { code: 'CCMA' } });
  const qs = await p.question.findMany({
    where: { examId: exam.id, type: 'MCQ', status: 'APPROVED' },
    select: { id: true, options: true, correctAnswer: true },
  });
  let bad = 0;
  const byLetter = { a: 0, b: 0, c: 0, d: 0 };
  for (const q of qs) {
    const ca = String(q.correctAnswer).trim().toLowerCase().replace(/[^a-d]/g, '');
    byLetter[ca] = (byLetter[ca] || 0) + 1;
    const pos = ca.charCodeAt(0) - 97;
    const opts = q.options;
    if (!opts || pos < 0 || pos >= opts.length || !String(opts[pos]).trim().startsWith(ca + ')')) {
      bad++;
      if (bad <= 3) console.log('INCOHÉRENTE:', q.id, String(opts[pos]).slice(0, 40), '| ca=', ca);
    }
  }
  console.log('total:', qs.length, '| incohérentes:', bad);
  console.log('distribution:', byLetter);
  await p.$disconnect();
})();

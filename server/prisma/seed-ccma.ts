import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const EXAMS: any[] = [
  {
    code: 'CCMA', name: 'Certified Clinical Medical Assistant (CCMA)',
    description: 'NHA CCMA — 150 scored questions + 30 pretest, 3 hours, passing score 390/500. Certified Clinical Medical Assistant exam blueprint: Foundational Knowledge 15, Anatomy & Physiology 8, Clinical Patient Care 84, Patient Care Coordination 12, Administrative Assisting 12, Communication 12, Medical Law & Ethics 7.',
    country: 'US', licenseType: 'CCMA', timeLimit: 180, passingScore: 78,
    questionsPerSimulation: 150, displayOrder: 10,
    chapters: [
      { number: 1, name: 'Foundational Knowledge and Basic Science', syllabusRef: 'NHA CCMA 15 Q (10%)' },
      { number: 2, name: 'Anatomy and Physiology', syllabusRef: 'NHA CCMA 8 Q (5%)' },
      { number: 3, name: 'Patient Intake and Vitals', syllabusRef: 'NHA CCMA 14 Q (9%)' },
      { number: 4, name: 'General Patient Care Part 1', syllabusRef: 'NHA CCMA 14 Q (9%)' },
      { number: 5, name: 'General Patient Care Part 2', syllabusRef: 'NHA CCMA 14 Q (9%)' },
      { number: 6, name: 'Infection Control and Safety', syllabusRef: 'NHA CCMA 15 Q (10%)' },
      { number: 7, name: 'Point of Care Testing and Laboratory Procedures', syllabusRef: 'NHA CCMA 9 Q (6%)' },
      { number: 8, name: 'Phlebotomy', syllabusRef: 'NHA CCMA 12 Q (8%)' },
      { number: 9, name: 'EKG and Cardiovascular Testing', syllabusRef: 'NHA CCMA 6 Q (4%)' },
      { number: 10, name: 'Patient Care Coordination and Education', syllabusRef: 'NHA CCMA 12 Q (8%)' },
      { number: 11, name: 'Administrative Assisting', syllabusRef: 'NHA CCMA 12 Q (8%)' },
      { number: 12, name: 'Communication and Customer Service', syllabusRef: 'NHA CCMA 12 Q (8%)' },
      { number: 13, name: 'Medical Law and Ethics', syllabusRef: 'NHA CCMA 7 Q (5%)' },
    ],
  },
];

async function main() {
  for (const def of EXAMS) {
    const existing = await prisma.exam.findUnique({ where: { code: def.code } });
    const exam = existing ?? (await prisma.exam.create({
      data: {
        code: def.code, name: def.name, description: def.description,
        country: def.country, licenseType: def.licenseType,
        timeLimit: def.timeLimit, passingScore: def.passingScore,
        questionsPerSimulation: def.questionsPerSimulation, displayOrder: def.displayOrder,
      },
    }));
    for (const ch of def.chapters) {
      const existingCh = await prisma.chapter.findUnique({ where: { examId_number: { examId: exam.id, number: ch.number } } });
      if (!existingCh) {
        await prisma.chapter.create({ data: { examId: exam.id, number: ch.number, name: ch.name, syllabusRef: ch.syllabusRef } });
      }
    }
    console.log(`${existing ? '[SKIP]' : '[CREATE]'} ${def.code} — ${def.chapters.length} chapters`);
  }
}

main().finally(() => prisma.$disconnect());

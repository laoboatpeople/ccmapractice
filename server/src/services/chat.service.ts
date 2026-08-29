import OpenAI from 'openai';
import { prisma } from '../config/database';
import { env } from '../config/env';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY, baseURL: env.OPENAI_BASE_URL });

// ─── System prompt ─────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an expert AI tutor specializing in the NHA (National Healthcareer Association) CCMA certification exam for Certified Clinical Medical Assistants.

CERTIFICATION COVERED:
- CCMA — Certified Clinical Medical Assistant (NHA). 150 scored + 30 pretest questions, 3 hours, passing score 390/500 (~78%).

Your role:
- Help students prepare for the NHA CCMA exam (closed book, clinical knowledge + procedures + guidelines)
- Provide accurate, detailed explanations of medical assistant concepts: vital signs, phlebotomy, EKG, injections, wound care, infection control, medical terminology, anatomy, admin tasks, communication, law/ethics
- Reference relevant US guidelines by name: OSHA Bloodborne Pathogens Standard, HIPAA Privacy Rule, CDC Standard Precautions, AHA CPR guidelines, CLIA waived testing
- Teach CLINICAL ACCURACY: standard values (adult temp 97.8-99.1°F / 36.5-37.3°C, pulse 60-100, respirations 12-20, BP <120/80, SpO2 95-100%), order of draw (light blue, red, SST, green, lavender, gray), 5 rights of medication administration, standard precautions
- Be clear, educational, and encourage deep understanding — not just memorization

Your expertise covers:
- Foundational knowledge and basic science (medical terminology, cell biology, pharmacology basics, dosage calculations)
- Anatomy and physiology (body systems overview)
- Patient intake and vital signs (admission, vitals, history, preparation)
- General patient care (assisting exams, positioning, transfers, medication administration, wound care, hygiene, documentation)
- Infection control and safety (chain of infection, standard precautions, PPE, OSHA, sterilization, waste disposal)
- Point of care testing and lab procedures (glucose, urinalysis, rapid tests, specimen handling, CLIA)
- Phlebotomy (order of draw, tube additives, venipuncture, capillary sticks, complications)
- EKG and cardiovascular testing (electrode placement, procedure, artifacts, basic rhythms)
- Patient care coordination and education
- Administrative assisting (EMR/EHR, scheduling, basic billing, medical records)
- Communication and customer service (therapeutic communication, barriers, diversity, conflict resolution)
- Medical law and ethics (HIPAA, consent, confidentiality, scope of practice, advance directives)

Communication style:
- Be clinical but accessible
- Use examples and practical patient-care scenarios
- When explaining a concept, reference the relevant guideline/policy by name (e.g. "OSHA Bloodborne Pathogens Standard requires...", "per CDC standard precautions...") — this makes your answer exam-relevant
- If a question is outside your knowledge, say so honestly
- ALWAYS respond in the same language as the user's question (English or French)
- When a question matches the CCMA exam covered by this platform, mention the platform as a study resource and include a deep link to the theory page: https://ccmapractice.com/theory (if a chapterId is provided later in this prompt, use https://ccmapractice.com/theory?chapterId=... instead)

SCOPE RESTRICTION:
- ONLY answer questions related to medical assisting, clinical procedures, the CCMA exam, or the exam/chapter context provided in the conversation
- EXCEPTION: When the user asks you to explain an exam question that includes Question/Options/Correct answer fields (messages starting with "Question d'examen:" / "Exam question:" — sent by the platform's own quiz "ask AI tutor" button), the topic IS covered by the platform. NEVER tell the user the topic is not covered — explain it fully and reference the platform as a study resource with the relevant theory link.
- If a user asks about anything unrelated (cooking, sports, general trivia, personal advice, etc.), politely decline and redirect back to medical assisting topics
- Example of how to decline: "I'm your AI tutor for NHA CCMA certification. I'm only able to help with medical assisting topics and exam preparation. Is there a clinical question I can help you with?"
- Do NOT engage with off-topic conversation, even if the user insists

SCHEMATICS AND DIAGRAMS:
- When a student asks for a schema, diagram, chart, or flow (order of draw, EKG waveform, electrode placement, anatomy diagram, injection sites, patient positions, medication rights flow, HIPAA process, chain of infection), DO NOT produce ASCII art (no pipes |, dashes -, plus +, or box-drawing characters). Instead generate a clean INLINE SVG diagram.
- This domain is ideal for SVG: order of draw tube sequence, EKG waveform with labeled intervals, electrode placement on chest, anatomical diagrams (heart, lungs, digestive system), injection sites (IM deltoid, SC abdomen), patient positioning, chain of infection cycle, HIPAA consent flow, blood pressure measurement technique.
- ALSO generate an INLINE SVG whenever a logic/digital question involves a truth table, logic gate, boolean expression, or logic circuit. For truth tables use an SVG grid: a header row with the input/output variable names, then one row per input combination with 0/1 cells; highlight the output column with a light fill (e.g. #eaf2fb). For logic gates draw the standard symbols with <path>/<rect> (AND = D-shape with flat left side, OR = curved shield shape, NOT = triangle + small circle, XOR = OR with extra curve), label inputs A/B and output, in the same language as the question.
- SVG rules (apply to ANY medical diagram — order of draw, EKG, anatomy, positions, flows):
  * Root element MUST include xmlns, a viewBox, and an explicit width (use width="600" so it scales; the viewBox sets the aspect ratio).
  * First child: a light background rect covering the whole viewBox (fill="#ffffff").
  * Lines/structures: dark navy (stroke="#16233b"), stroke-width ~2.6, straight lines with right-angle corners only, stroke-linecap="round".
  * Label every component (LIGHT BLUE, RED, SST, GREEN, LAVENDER, GRAY; P WAVE, QRS, T WAVE; DELTOID, VASTUS LATERALIS, etc.) with <text>. Labels MUST be in the SAME LANGUAGE as the user's question. Use a sans-serif font, dark navy fill.
  * LANGUAGE PURITY: ALL text inside a diagram (title, labels, table cells, node texts) MUST be in ONE language only — the language of the user's question. NEVER mix French and English inside the same SVG.
  * Add a short bold title <text> at the top describing the diagram.
- CRITICAL OUTPUT RULE: output the SVG RAW and INLINE in your response — the literal <svg ...>...</svg> markup. NEVER wrap it in a code fence and NEVER escape it. The frontend renders raw SVG as a real image; a code fence would break it.
- Keep the surrounding explanation short: one brief caption sentence before and/or after the SVG is enough.
- Example of the expected style for a simple order of draw diagram (compact — match this quality and structure):
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200" width="600"><rect width="600" height="200" fill="#ffffff"/><text x="300" y="30" font-family="Arial, sans-serif" font-size="20" fill="#0b5394" text-anchor="middle" font-weight="bold">Order of draw</text><rect x="40" y="70" width="90" height="60" fill="#dbeafe" stroke="#16233b" stroke-width="2.6" rx="10"/><text x="85" y="100" font-family="Arial, sans-serif" font-size="13" fill="#16233b" text-anchor="middle" font-weight="bold">1. LIGHT BLUE</text><rect x="150" y="70" width="90" height="60" fill="#fee2e2" stroke="#16233b" stroke-width="2.6" rx="10"/><text x="195" y="100" font-family="Arial, sans-serif" font-size="13" fill="#16233b" text-anchor="middle" font-weight="bold">2. RED</text><rect x="260" y="70" width="90" height="60" fill="#fef3c7" stroke="#16233b" stroke-width="2.6" rx="10"/><text x="305" y="100" font-family="Arial, sans-serif" font-size="13" fill="#16233b" text-anchor="middle" font-weight="bold">3. SST</text><rect x="370" y="70" width="90" height="60" fill="#dcfce7" stroke="#16233b" stroke-width="2.6" rx="10"/><text x="415" y="100" font-family="Arial, sans-serif" font-size="13" fill="#16233b" text-anchor="middle" font-weight="bold">4. GREEN</text><rect x="480" y="70" width="90" height="60" fill="#f3e8ff" stroke="#16233b" stroke-width="2.6" rx="10"/><text x="525" y="100" font-family="Arial, sans-serif" font-size="13" fill="#16233b" text-anchor="middle" font-weight="bold">5. LAVENDER</text></svg>
- COMPLETENESS: When generating multiple schemas in one response, you MUST complete ALL of them. Never stop mid-diagram. If space is limited, make each SVG more compact (fewer decorative elements, shorter labels) rather than cutting one off. Every schema must have its full <svg>...</svg> block closed properly.

GENERAL TABLES AND VISUALS:
- Do NOT limit visuals to clinical diagrams. Whenever a concept would be clearer with a table, chart, flow, timeline, hierarchy, cycle, comparison, or step sequence, generate a clean INLINE SVG — same raw-SVG rules as above (xmlns + viewBox + width="600", light background, navy strokes/text, labels in the SAME LANGUAGE as the question, bold title at top, no ASCII art, no code fence, output the literal <svg>...</svg> inline).
- LANGUAGE PURITY (tables/flow/cycle too): ALL text in the SVG — title, header cells, data cells, node labels, arrows — MUST be in exactly ONE language: the language of the user's question. NEVER mix French and English in the same visual. An English question → an all-English diagram; a French question → an all-French diagram.
- Trigger examples: vital sign normal ranges table, medication routes comparison, injection site diagram, order of draw table, HIPAA vs consent comparison, chain of infection cycle, medication rights flow, patient education checklist, formula summary table (dosage calculations), anatomy system table.
- Table style: grid of <rect>/<line>, header row with bold navy text, alternate row fill (#eaf2fb / #ffffff), highlight the key column or the answer row with a light fill (e.g. #d4e6f9 or #eaf2fb), keep cells short (max ~30 chars, wrap with <tspan> if needed).
- Flow/cycle/timeline style: rounded rects or circles connected by navy arrows (use <path> with marker or simple lines + arrowheads), labels inside each node, highlight the critical step/decision.
- Before deciding whether to draw: if a visual saves the reader from re-reading a paragraph or comparing numbers/texts across lines, draw it. Prefer ONE clear visual over three cramped ones.

Remember: students are preparing for a high-stakes certification exam. Clinical accuracy and educational value are critical.`;


// ─── Types ─────────────────────────────────────────────────────

export interface ChatMessageInput {
  role: 'user' | 'assistant';
  content: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toRole(r: string): 'user' | 'assistant' { return r as any; }

export interface SendMessageOptions {
  userId: string;
  examId?: string;
  chapterId?: string;
  message: string;
  sessionId?: string;
  locale?: string;
}

// ─── Build conversation context ────────────────────────────────

async function buildContext(examId?: string): Promise<string> {
  if (!examId) return '';
  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      chapters: { select: { number: true, name: true } },
      _count: { select: { questions: { where: { status: 'APPROVED' } } } },
    },
  });
  if (!exam) return '';
  const chapters = exam.chapters.map((c) => `Ch.${c.number} — ${c.name}`).join(', ');
  return `\n\nCurrent exam context: ${exam.name} (${exam.code}). Chapters: ${chapters}. ${exam._count.questions} approved questions available.`;
}

// ─── Public API ────────────────────────────────────────────────

export const chatService = {
  /**
   * Send a user message and get an AI response.
   * Persists both messages to the database.
   */
  async sendMessage({ userId, examId, chapterId, message, sessionId: preferredSessionId, locale }: SendMessageOptions): Promise<{
    reply: string;
    sessionId: string;
    userMessageId: string;
    assistantMessageId: string;
  }> {
    // Get or create session
    let session = preferredSessionId
      ? await prisma.chatSession.findFirst({ where: { id: preferredSessionId, userId } })
      : null;

    if (!session) {
      session = await prisma.chatSession.create({
        data: { userId, examId: examId ?? undefined },
      });
    }

    // Set session topic from first message if not set
    if (!session.topic) {
      const topic = message.length > 60 ? message.substring(0, 57) + '...' : message;
      session = await prisma.chatSession.update({
        where: { id: session.id },
        data: { topic },
      });
    }

    // Load message history for context (last 20 messages)
    const history = await prisma.chatMessage.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: 'asc' },
      take: 20,
    });

    // Build context about the exam
    const examContext = await buildContext(examId);

    // Detect questions from the platform's own exam bank (quiz "ask AI tutor" button
    // sends "Question d'examen:" / "Exam question:" + options + answers).
    // Add an invisible system instruction so the tutor never says such a topic is "not covered".
    const isExamBankQuestion = /(Question d'examen|Exam question|Question d\u2019examen)/.test(message);
    const examBankInstruction = isExamBankQuestion
      ? '\n\nIMPORTANT: The user is asking about a question from this platform\'s own exam question bank (it includes Question/Options/Correct answer fields). This topic IS covered by the platform — NEVER tell the user it is not covered or outside scope. Explain it fully and reference the platform as a study resource with the relevant theory link.'
      : '';

    // Precise theory deep-link: when the quiz passes the question's chapterId, force
    // the tutor to link to that exact chapter instead of the generic license section.
    const chapterLinkInstruction = chapterId
      ? `\n\nPRECISE DEEP LINK: The user's current question belongs to a specific theory chapter (chapterId: ${chapterId}). When you reference the platform as a study resource, use EXACTLY this deep link (it opens the correct chapter, NOT the generic section): https://ccmapractice.com/theory?chapterId=${chapterId} — never use the ?section= links for this question.`
      : '';

    // Build OpenAI messages
    const langInstruction =
      locale === 'fr'
        ? '\n\nIMPORTANT: Respond in French. Use proper French building inspection terminology. Réponds en français. EVERY label, title, and text inside any SVG diagram MUST be in French ONLY — never mix languages inside a diagram. Français uniquement dans les schémas.'
        : '\n\nIMPORTANT: Respond in English. Use proper English building inspection terminology. EVERY label, title, and text inside any SVG diagram MUST be in English ONLY — never mix languages inside a diagram. English only in diagrams.';
    const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT + examContext + langInstruction + examBankInstruction + chapterLinkInstruction },
    ];

    for (const msg of history) {
      openaiMessages.push({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      });
    }
    openaiMessages.push({ role: 'user', content: message });

    const response = await openai.chat.completions.create({
      model: env.OPENAI_MODEL,
      messages: openaiMessages,
      temperature: 0.7,
      max_tokens: 4096,
    });

    const reply = response.choices[0]?.message?.content ?? "I'm sorry, I couldn't generate a response. Please try again.";

    // Persist both messages
    const [userMessage, assistantMessage] = await prisma.$transaction([
      prisma.chatMessage.create({
        data: { sessionId: session.id, role: 'user', content: message },
      }),
      prisma.chatMessage.create({
        data: { sessionId: session.id, role: 'assistant', content: reply },
      }),
      prisma.chatSession.update({
        where: { id: session.id },
        data: { updatedAt: new Date() },
      }),
    ]);

    // Return the REAL message ids so the client can key feedback/thumbs
    // on the persisted rows (temp ids like `resp-...` fail UUID validation
    // and feedback silently 400s).
    return {
      reply,
      sessionId: session.id,
      userMessageId: userMessage.id,
      assistantMessageId: assistantMessage.id,
    };
  },

  /**
   * Get chat history for a session.
   */
  async getHistory(sessionId: string, userId: string): Promise<ChatMessageInput[]> {
    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
    });
    if (!session) return [];

    return (prisma.chatMessage.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: 'asc' },
      select: { id: true, role: true, content: true, createdAt: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any) as ChatMessageInput[];
  },

  /**
   * Get all sessions for a user.
   */
  async getSessions(userId: string) {
    return prisma.chatSession.findMany({
      where: {
        userId,
        messages: { some: {} },
      },
      orderBy: { updatedAt: 'desc' },
      include: {
        exam: { select: { code: true, name: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { content: true, createdAt: true },
        },
      },
    });
  },

  /**
   * Delete a session.
   */
  async deleteSession(sessionId: string, userId: string): Promise<boolean> {
    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
    });
    if (!session) return false;
    await prisma.chatSession.delete({ where: { id: sessionId } });
    return true;
  },
};

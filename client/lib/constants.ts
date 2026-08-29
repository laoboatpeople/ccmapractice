export const APP_NAME = 'CCMAPractice';
export const APP_DESCRIPTION = 'AI-Powered NHA CCMA Exam Prep';

export const EXAMS = [
  { code: 'CCMA', name: 'CCMA - Certified Clinical Medical Assistant (NHA)', country: 'US', licenseType: 'CCMA' },
];

export const QUESTION_TYPES = [
  { value: 'MCQ', label: 'Multiple Choice' },
  { value: 'TRUEFALSE', label: 'True/False' },
  { value: 'WRITTEN', label: 'Written' },
];

export const DIFFICULTY_LEVELS = [
  { value: 'EASY', label: 'Easy' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HARD', label: 'Hard' },
];

export const PLANS = [
  { value: 'FREE', label: 'Free', price: 0 },
  { value: 'MONTHLY', label: 'Monthly', price: 19 },
  { value: 'YEARLY', label: 'Yearly', price: 69 },
  { value: 'LIFETIME', label: 'Lifetime', price: 149 },
];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/admin/questions', label: 'Question Bank', icon: 'FileQuestion' },
  { href: '/admin/exams', label: 'Exams', icon: 'ClipboardList' },
  { href: '/admin/users', label: 'Users', icon: 'Users' },
  { href: '/admin/subscriptions', label: 'Subscriptions', icon: 'CreditCard' },
  { href: '/admin/settings', label: 'Settings', icon: 'Settings' },
];

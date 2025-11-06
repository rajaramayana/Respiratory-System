
import { MODULES } from './constants';

export type Language = 'en' | 'ne';
export type ModuleName = typeof MODULES[number];

export interface ExplainItem {
  topic: string;
  summary_html: string;
}

export interface AlgorithmItem {
  name: string;
  ascii_flow: string;
}

export interface CaseItem {
  title: string;
  stem: string;
  questions: string[];
  teaching_points: string[];
}

export interface ImageDrillItem {
  type: 'ECG' | 'CXR';
  prompt: string;
  model_answer: string;
}

export interface DentalEmergencyCard {
  condition: string;
  first_aid_steps: string[];
  refer_when: string[];
}

export interface OsceStation {
  name: string;
  checklist: string[];
  marks: {
    history: number;
    exam: number;
    reasoning: number;
    total: number;
  };
}

export interface OsceData {
  stations: OsceStation[];
  global_rating: string[];
}

export interface McqItem {
  q: string;
  options: string[];
  answer_index: number;
  why: string;
}

export interface ShortAnswerItem {
  q: string;
  expected_points: string[];
  marks: number;
}

export interface SyllabusModule {
  module_title: string;
  language: Language;
  outcomes: string[];
  explain: ExplainItem[];
  algorithms: AlgorithmItem[];
  cases: CaseItem[];
  image_drills: ImageDrillItem[];
  dental_emergency_cards: DentalEmergencyCard[];
  osce: OsceData;
  quiz_mcq: McqItem[];
  quiz_short: ShortAnswerItem[];
  reflection: string[];
  references_note: string;
  version: string;
}

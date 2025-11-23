export interface Strategy {
  id: string;
  title: string;
  description: string;
  example: string; // Concrete scenario/example for teachers
  reason: string; // The "Why it helps" section
  icon: 'clock' | 'eye' | 'message' | 'wind' | 'check' | 'alert' | 'heart';
}

export interface GenerationRequest {
  observation: string;
  currentStrategies: Strategy[];
}

export const INITIAL_STRATEGIES: Strategy[] = [
  {
    id: '1',
    title: 'Processing Time (8–10 seconds)',
    description: 'Provide a short pause after instructions before expecting a response. Do not repeat the instruction immediately.',
    example: 'Teacher says: "Timmie, put your bag away." ... (Wait 8 seconds) ... Timmie stands up and moves to the cubby.',
    reason: 'Supports his verbal processing and leads to independent follow-through.',
    icon: 'clock'
  },
  {
    id: '2',
    title: 'Visual Timer for Transitions',
    description: 'Use a visible timer (e.g., Sand Timer or Time Timer app) during activity shifts or cool-down periods.',
    example: 'Place a large 5-minute sand timer on the desk 5 minutes before tidy-up time starts.',
    reason: 'Gives clarity and structure during shifts between activities, reducing anxiety.',
    icon: 'eye'
  },
  {
    id: '3',
    title: 'Clear, One-Step Instructions',
    description: 'Keep directions short and direct. Avoid chaining multiple requests together.',
    example: 'Instead of "Go get your bag and sit on the carpet," say "Get your bag." (Wait for action). Then say, "Sit on the carpet."',
    reason: 'Reduces cognitive load and avoids confusion from multi-step commands.',
    icon: 'check'
  },
  {
    id: '4',
    title: 'Allowing a Brief Observational Pause',
    description: 'Allow him to watch peers first to understand the social expectation, then join independently.',
    example: 'During circle time, let Timmie stand at the edge and watch for 30 seconds before inviting him to sit.',
    reason: 'Supports his natural way of understanding sequence and reduces social pressure.',
    icon: 'message'
  },
  {
    id: '5',
    title: 'Calm, Low-Stimulation Approach',
    description: 'Use a calm, flat tone and avoid rushing him, especially during down times or when he appears tired.',
    example: 'If he is lying on the floor, sit nearby quietly rather than standing over him and urging him to get up.',
    reason: 'Keeps him regulated and makes it easier for him to stay engaged.',
    icon: 'wind'
  }
];
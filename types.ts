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
    title: 'Processing Time (8-10s)',
    description: 'Pause for 8–10 seconds after giving an instruction. Allow him to process fully before repeating yourself.',
    example: 'Teacher says: "Timmie, put your bag away." → Teacher counts to 10 mentally while looking busy. → Timmie processes and moves.',
    reason: 'Supports verbal processing speed; prevents pressure-induced shutdown.',
    icon: 'clock'
  },
  {
    id: '2',
    title: 'Visual Timer for Transitions',
    description: 'Use a sand timer or visual clock to show remaining time. Visualizes the end of an activity before the transition occurs.',
    example: 'Before the "Tidy Up" song, place a 5-minute sand timer on his desk and say, "5 minutes, then carpet."',
    reason: 'Reduces anxiety by making abstract time concrete and predictable.',
    icon: 'eye'
  },
  {
    id: '3',
    title: 'One-Step Instructions',
    description: 'Give one instruction at a time. Wait for him to complete the first task before giving the next.',
    example: 'Incorrect: "Put your bag away and sit on the carpet." \nCorrect: "Put your bag away." (Wait for action). "Now, sit on the carpet."',
    reason: 'Reduces cognitive load and avoids working memory overload.',
    icon: 'check'
  },
  {
    id: '4',
    title: 'Observational Pause',
    description: 'Allow him to observe from the periphery first. Let him watch peers engaged in the activity before asking him to join.',
    example: 'During circle time, let him stand by the bookshelf watching the song for 30 seconds before inviting him to sit.',
    reason: 'Lowers demand for immediate participation; allows him to map the social sequence.',
    icon: 'message'
  },
  {
    id: '5',
    title: 'Low-Stimulation Approach',
    description: 'Use a calm, flat vocal tone and slow movements when he is dysregulated. Avoid rushing or raising your voice.',
    example: 'If he refuses to move, sit quietly nearby (side-on, not facing direct) without speaking for a minute.',
    reason: 'Reduces sensory input to prevent escalation during overwhelm.',
    icon: 'wind'
  }
];
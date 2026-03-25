export const currentUser = {
  name: 'Sarah',
  role: 'caregiver',
  careRecipient: 'Robert Martinez',
};

export const upcomingAppointment = {
  title: 'Physical Therapy Appointment',
  time: '02:00 PM',
  location: 'A1 care',
  isNow: true,
};

export const healthSummary = {
  completed: 1,
  pending: 4,
  appointments: 2,
};

export const healthLogsSummary = {
  bpToday: '120/80',
  bpUnit: 'mmHg',
  walks: '2/2',
  walksLabel: 'Completed',
  meals: '1,240',
  mealsUnit: 'Calories',
  mood: 'Good',
  moodLabel: 'Improving',
};

export const weeklyActivity = [
  { day: 'Su', level: 0 },
  { day: 'Mo', level: 3 },
  { day: 'Tu', level: 3 },
  { day: 'We', level: 3 },
  { day: 'Th', level: 3 },
  { day: 'Fr', level: 1 },
  { day: 'Sa', level: 0 },
];

export const recentLogs = [
  {
    id: 1,
    type: 'vitals',
    title: 'Blood pressure Check',
    date: '2025-12-19',
    details: 'Resting - Right Arm',
    values: { systolic: 120, diastolic: 80, heartRate: 72 },
    reading: '120/80',
  },
  {
    id: 2,
    type: 'lab',
    title: 'Glucose Check',
    date: '2025-12-17',
    details: 'Resting - Right Arm',
    reading: '95 mg/dL',
    notes: 'Fasting · Range: normal',
  },
  {
    id: 3,
    type: 'wellness',
    title: 'Weight Check',
    date: '2025-12-15',
    details: 'Resting - Right Arm',
    reading: '70 kg',
    notes: 'Weekly trend: good · Hydration: good',
  },
];

export const todaysTasks = [
  {
    id: 1,
    title: 'Blood Pressure Check',
    description: 'Record morning blood pressure reading',
    time: '09:00 AM',
    date: 'Jan 27',
    priority: 'MEDIUM',
    status: 'pending',
    tag: '#BP-tracker',
  },
  {
    id: 2,
    title: 'Prepare Lunch',
    description: 'Low-sodium meal as per dietary plan',
    time: '12:00 PM',
    date: 'Jan 27',
    priority: 'MEDIUM',
    status: 'pending',
    tag: '#meals',
  },
];

export const overdueTasks = [
  {
    id: 3,
    title: 'Medication Refill',
    description: 'Call pharmacy for refill',
    priority: 'HIGH',
    status: 'overdue',
  },
  {
    id: 4,
    title: 'Insurance Paperwork',
    description: 'Submit claim forms',
    priority: 'HIGH',
    status: 'overdue',
  },
];

export const taskOverview = {
  today: 2,
  overdue: 2,
  done: 1,
};

export const messages = [
  {
    id: 1,
    from: 'Robert Martinez',
    isOnline: true,
    messages: [
      { id: 1, sender: 'robert', text: 'Morning walk completed. Felt great today.', time: '9:15 AM' },
      { id: 2, sender: 'robert', text: 'About 30 minutes around the neighborhood', time: '9:16 AM' },
      { id: 3, sender: 'user', text: "That's wonderful! How long did you walk?", time: '9:20 AM' },
    ],
  },
];

export const quickReplies = ['Yes', 'On my way', 'Call me', 'Thanks'];

export const calendarEvents = [
  {
    id: 1,
    title: 'Check-up',
    description: 'Knee rehabilitation session',
    time: '10:00 AM',
    provider: 'Dr. Lisa Chen, PT',
    status: 'SCHEDULED',
    date: '2026-01-26',
  },
  {
    id: 2,
    title: 'Morning Medication',
    description: 'Take morning pills',
    time: '08:00 AM',
    status: 'COMPLETED',
    date: '2026-01-26',
  },
];

export const navItems = [
  { path: '/dashboard', label: 'Home', icon: 'home' },
  { path: '/messages', label: 'Messages', icon: 'messages' },
  { path: '/calendar', label: 'Calendar', icon: 'calendar' },
  { path: '/tasks', label: 'Tasks', icon: 'tasks' },
  { path: '/profile', label: 'Profile', icon: 'profile' },
];

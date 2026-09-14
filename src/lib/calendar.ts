import { AssessmentResult, PhasePlan } from '@/types/plan';

/**
 * Formats a Date object to iCalendar UTC timestamp format: YYYYMMDDTHHMMSSZ
 */
function formatIcsDate(date: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Formats a Date object to iCalendar local date-time format: YYYYMMDDTHHMMSS
 */
function formatIcsLocalDateTime(date: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Escapes characters for iCalendar text values (RFC 5545)
 */
function escapeIcsText(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Generates an RFC 5545 iCalendar (.ics) string containing all 9 phased roadmap
 * milestones scheduled within the user's selected energy window across their horizon.
 */
export function generateIcsCalendar(assessment: AssessmentResult): string {
  const now = new Date();
  const dtStamp = formatIcsDate(now);
  const horizon = assessment.horizon || 60;
  const userName = assessment.userName || 'Fieldwork';

  // Determine hour of day based on user's peak mental energy window
  let startHour = 8;
  let startMinute = 30;

  if (assessment.energyLabel.includes('midday') || assessment.energyLabel.includes('noon')) {
    startHour = 11;
    startMinute = 30;
  } else if (assessment.energyLabel.includes('evening')) {
    startHour = 18;
    startMinute = 30;
  } else if (assessment.energyLabel.includes('night')) {
    startHour = 21;
    startMinute = 0;
  }

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Fieldwork//Development Plan Studio//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeIcsText(`Fieldwork Plan — ${userName}`)}`,
    'X-WR-TIMEZONE:UTC',
  ];

  // Distribute milestones across the horizon (days)
  // Phase 1 in first third, Phase 2 in second third, Phase 3 in final third
  const phaseStepDays: number[][] =
    horizon === 30
      ? [[2, 5, 8], [12, 16, 19], [22, 26, 29]]
      : horizon === 60
      ? [[4, 9, 14], [22, 30, 38], [44, 51, 57]]
      : [[7, 15, 23], [35, 48, 58], [68, 78, 88]];

  // Schedule Phased Tasks
  assessment.phases.forEach((phase: PhasePlan, phaseIdx: number) => {
    const dayOffsets = phaseStepDays[phaseIdx] || [phaseIdx * 10 + 3, phaseIdx * 10 + 6, phaseIdx * 10 + 9];

    phase.tasks.forEach((task, taskIdx) => {
      const dayOffset = dayOffsets[taskIdx] ?? (phaseIdx * 20 + taskIdx * 6 + 3);
      const eventDate = new Date(now);
      eventDate.setDate(now.getDate() + dayOffset);
      eventDate.setHours(startHour, startMinute, 0, 0);

      const endDate = new Date(eventDate);
      endDate.setMinutes(eventDate.getMinutes() + 60);

      const uid = `fieldwork-${assessment.horizon}d-p${phaseIdx + 1}-t${taskIdx + 1}-${Date.now()}@fieldwork.dev`;

      const summary = `[Fieldwork ${phase.label}] ${task.text}`;
      const description = `Milestone: ${phase.title}\\nPhase: ${phase.label}\\nAction: ${task.text}\\nPace: ${assessment.paceDescription}\\nArchetype: ${assessment.archetypeName}`;

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${dtStamp}`);
      lines.push(`DTSTART:${formatIcsLocalDateTime(eventDate)}`);
      lines.push(`DTEND:${formatIcsLocalDateTime(endDate)}`);
      lines.push(`SUMMARY:${escapeIcsText(summary)}`);
      lines.push(`DESCRIPTION:${escapeIcsText(description)}`);
      lines.push('STATUS:CONFIRMED');
      lines.push('CATEGORIES:CAREER,DEVELOPMENT,FIELDWORK');
      lines.push('END:VEVENT');
    });
  });

  // Schedule Weekly Friday Habit Check-in for the full horizon duration
  const weeksCount = Math.ceil(horizon / 7);
  // Find upcoming Friday
  const upcomingFriday = new Date(now);
  const dayOfWeek = upcomingFriday.getDay();
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
  upcomingFriday.setDate(now.getDate() + daysUntilFriday);
  upcomingFriday.setHours(16, 30, 0, 0);

  const habitEndDate = new Date(upcomingFriday);
  habitEndDate.setMinutes(upcomingFriday.getMinutes() + 20);

  const habitUid = `fieldwork-weekly-habit-${Date.now()}@fieldwork.dev`;
  const habitsSummary = 'Fieldwork Weekly Review: What moved, what stalled';
  const habitsDesc = `Weekly 15-minute reflection on your ${horizon}-day development roadmap.\\n\\nKey Habits to check:\\n${assessment.habits.map((h) => `• ${h}`).join('\\n')}`;

  lines.push('BEGIN:VEVENT');
  lines.push(`UID:${habitUid}`);
  lines.push(`DTSTAMP:${dtStamp}`);
  lines.push(`DTSTART:${formatIcsLocalDateTime(upcomingFriday)}`);
  lines.push(`DTEND:${formatIcsLocalDateTime(habitEndDate)}`);
  lines.push(`RRULE:FREQ=WEEKLY;COUNT=${weeksCount}`);
  lines.push(`SUMMARY:${escapeIcsText(habitsSummary)}`);
  lines.push(`DESCRIPTION:${escapeIcsText(habitsDesc)}`);
  lines.push('STATUS:CONFIRMED');
  lines.push('CATEGORIES:REFLECTION,HABIT,FIELDWORK');
  lines.push('END:VEVENT');

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Triggers a browser download for the generated iCalendar file
 */
export function downloadIcsFile(filename: string, icsContent: string): void {
  if (typeof window === 'undefined') return;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.ics') ? filename : `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

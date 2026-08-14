import React from 'react';
import { Stethoscope, Pill, FlaskConical, Syringe, FileHeart } from 'lucide-react';
import { Card, PageHeader, Avatar, Badge } from '../components/primitives';

const events = [
  { date: '02 Jun 2024', title: 'Consultation — Fever & cough', by: 'Dr. Ananya Sen, Sonatikari PHC', icon: Stethoscope, tone: 'blue' as const, tag: 'Visit' },
  { date: '02 Jun 2024', title: 'Prescribed Metformin 500mg, Amlodipine 5mg', by: 'Dr. Ananya Sen', icon: Pill, tone: 'amber' as const, tag: 'Prescription' },
  { date: '21 May 2024', title: 'Blood sugar (fasting): 142 mg/dL', by: 'Sonatikari PHC lab', icon: FlaskConical, tone: 'teal' as const, tag: 'Lab report' },
  { date: '02 Apr 2024', title: 'Tetanus booster administered', by: 'ASHA worker — Rina Das', icon: Syringe, tone: 'success' as const, tag: 'Immunisation' },
  { date: '14 Feb 2024', title: 'Annual health check-up recorded', by: 'Dr. Ananya Sen', icon: FileHeart, tone: 'neutral' as const, tag: 'Check-up' },
];

const Timeline = () => (
  <div className="space-y-3">
    <PageHeader title="Health timeline" />
    <Card>
      <ol className="relative ml-3 space-y-4 border-l border-border pl-5">
        {events.map((e) => {
          const Icon = e.icon;
          return (
            <li key={e.title} className="relative">
              <span className="absolute -left-[26px] top-0.5">
                <Avatar tone={e.tone} className="h-7 w-7"><Icon /></Avatar>
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">{e.date}</span>
                <Badge tone={e.tone}>{e.tag}</Badge>
              </div>
              <div className="mt-0.5 text-xs font-medium text-foreground">{e.title}</div>
              <div className="text-[11px] text-muted-foreground">{e.by}</div>
            </li>
          );
        })}
      </ol>
    </Card>
  </div>
);

export default Timeline;

import React, { useState } from 'react';
import { Bell, Clock, CheckCircle2 } from 'lucide-react';
import { Card, PageHeader, Row, Avatar, Toggle, Badge } from '../components/primitives';

const initialReminders = [
  { id: 'r1', title: 'Metformin 500mg', time: '8:00 AM & 8:00 PM', on: true },
  { id: 'r2', title: 'Amlodipine 5mg', time: '8:00 AM', on: true },
  { id: 'r3', title: 'Vitamin D3 sachet', time: 'Sunday, 9:00 AM', on: false },
  { id: 'r4', title: 'Drink 2L water daily', time: 'All day', on: true },
];

const Reminders = () => {
  const [reminders, setReminders] = useState(initialReminders);

  const toggle = (id: string) =>
    setReminders((rs) => rs.map((r) => (r.id === id ? { ...r, on: !r.on } : r)));

  return (
    <div className="space-y-3">
      <PageHeader title="Reminders" />
      <Card>
        <PageHeader title="Medicine &amp; care reminders" action={<Badge tone="teal">{reminders.filter((r) => r.on).length} active</Badge>} />
        {reminders.map((r) => (
          <Row
            key={r.id}
            avatar={<Avatar tone="amber"><Bell /></Avatar>}
            title={r.title}
            meta={<span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {r.time}</span>}
            action={<Toggle on={r.on} onClick={() => toggle(r.id)} label={`Toggle reminder for ${r.title}`} />}
          />
        ))}
      </Card>

      <Card className="border-clinical-success/30 bg-clinical-success-soft">
        <div className="flex items-center gap-2 text-xs text-clinical-success">
          <CheckCircle2 className="h-4 w-4" /> You took today's morning dose at 8:05 AM
        </div>
      </Card>
    </div>
  );
};

export default Reminders;

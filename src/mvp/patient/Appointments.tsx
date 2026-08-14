import React from 'react';
import { CalendarPlus, Stethoscope, MapPin, Video } from 'lucide-react';
import { Card, PageHeader, Row, Avatar, Badge, ButtonRow } from '../components/primitives';
import MvpButton from '../components/Button';

const upcoming = [
  { doctor: 'Dr. Ananya Sen', spec: 'General Physician', place: 'Sonatikari PHC, Room 2', when: 'Tomorrow, 4:30 PM', mode: 'In-person' },
];

const past = [
  { doctor: 'Dr. Ananya Sen', spec: 'General Physician', place: 'Sonatikari PHC', when: '02 Jun 2024', mode: 'In-person' },
  { doctor: 'Dr. Bikash Roy', spec: 'Video consult', place: 'Teleconsultation', when: '30 Nov 2023', mode: 'Video' },
];

const Appointments = () => (
  <div className="space-y-3">
    <PageHeader title="Appointments" action={<MvpButton size="sm"><CalendarPlus /> Book new</MvpButton>} />

    <Card>
      <PageHeader title="Upcoming" action={<Badge tone="amber">1</Badge>} />
      {upcoming.map((a) => (
        <Row
          key={a.when}
          avatar={<Avatar tone="blue"><Stethoscope /></Avatar>}
          title={`${a.doctor} — ${a.spec}`}
          meta={<span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {a.place} · {a.when}</span>}
          action={<Badge tone="blue">{a.mode}</Badge>}
        />
      ))}
      <ButtonRow>
        <MvpButton variant="outline" size="sm">Reschedule</MvpButton>
        <MvpButton variant="danger" size="sm">Cancel</MvpButton>
      </ButtonRow>
    </Card>

    <Card>
      <PageHeader title="Past visits" />
      {past.map((a) => (
        <Row
          key={a.when}
          avatar={<Avatar tone="neutral">{a.mode === 'Video' ? <Video /> : <Stethoscope />}</Avatar>}
          title={`${a.doctor} — ${a.spec}`}
          meta={<>{a.place} · {a.when}</>}
          action={<Badge tone="success">Completed</Badge>}
        />
      ))}
    </Card>
  </div>
);

export default Appointments;

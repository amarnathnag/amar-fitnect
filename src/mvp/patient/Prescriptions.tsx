import React from 'react';
import { Pill, Download, MessageCircle } from 'lucide-react';
import { Card, PageHeader, Row, Avatar, Badge, ButtonRow } from '../components/primitives';
import MvpButton from '../components/Button';

const active = [
  { name: 'Metformin 500mg', freq: '1 tablet, twice daily after meals', doctor: 'Dr. Ananya Sen', date: '02 Jun 2024', qty: '20 tablets' },
  { name: 'Amlodipine 5mg', freq: '1 tablet, once daily morning', doctor: 'Dr. Ananya Sen', date: '02 Jun 2024', qty: '10 tablets' },
  { name: 'Vitamin D3 60K IU', freq: '1 sachet, once weekly', doctor: 'Dr. Ananya Sen', date: '02 Jun 2024', qty: '4 sachets' },
];

const past = [
  { name: 'Azithromycin 500mg', freq: '1 tablet, once daily × 3 days', doctor: 'Dr. Ananya Sen', date: '14 Feb 2024', qty: 'Completed' },
  { name: 'ORS + Zinc', freq: 'As needed', doctor: 'Dr. Bikash Roy', date: '30 Nov 2023', qty: 'Completed' },
];

const Prescriptions = () => (
  <div className="space-y-3">
    <PageHeader title="Prescriptions (Rx)" />
    <Card>
      <PageHeader title="Active medicines" action={<Badge tone="success">3 active</Badge>} />
      {active.map((m) => (
        <Row
          key={m.name}
          avatar={<Avatar tone="amber"><Pill /></Avatar>}
          title={m.name}
          meta={<>{m.freq} · {m.qty} · {m.doctor} · {m.date}</>}
          action={<Badge tone="amber">Ongoing</Badge>}
        />
      ))}
      <ButtonRow>
        <MvpButton variant="whatsapp" size="sm"><MessageCircle /> Send to WhatsApp</MvpButton>
        <MvpButton variant="outline" size="sm"><Download /> Download PDF</MvpButton>
      </ButtonRow>
    </Card>

    <Card>
      <PageHeader title="Past prescriptions" />
      {past.map((m) => (
        <Row
          key={m.name}
          avatar={<Avatar tone="neutral"><Pill /></Avatar>}
          title={m.name}
          meta={<>{m.freq} · {m.doctor} · {m.date}</>}
          action={<Badge tone="neutral">{m.qty}</Badge>}
        />
      ))}
    </Card>
  </div>
);

export default Prescriptions;

import React from 'react';
import { UserPlus, ChevronRight } from 'lucide-react';
import { Card, PageHeader, Row, Avatar, Badge } from '../components/primitives';
import MvpButton from '../components/Button';

const family = [
  { name: 'Sabita Mondal', rel: 'Wife', age: '49', note: 'Hypertension — on Amlodipine', tone: 'blue' as const },
  { name: 'Rahul Mondal', rel: 'Son', age: '24', note: 'No active conditions', tone: 'success' as const },
  { name: 'Puja Mondal', rel: 'Daughter', age: '19', note: 'Vaccination up to date', tone: 'teal' as const },
];

const Family = () => (
  <div className="space-y-3">
    <PageHeader title="Family members" action={<MvpButton size="sm"><UserPlus /> Add member</MvpButton>} />
    <Card>
      {family.map((f) => (
        <Row
          key={f.name}
          avatar={<Avatar tone={f.tone}>{f.name.split(' ').map((n) => n[0]).join('')}</Avatar>}
          title={`${f.name} · ${f.rel}, ${f.age}y`}
          meta={f.note}
          action={<ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
        />
      ))}
    </Card>
    <Card className="bg-clinical-teal-soft border-clinical-teal/30">
      <div className="text-xs text-clinical-teal-ink">Managing family records lets you book appointments and view Rx history for the whole household from one account.</div>
    </Card>
  </div>
);

export default Family;

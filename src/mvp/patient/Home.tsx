import React from 'react';
import { CalendarDays, Pill, FileHeart, ShieldCheck, Bell, Stethoscope, QrCode, ChevronRight } from 'lucide-react';
import { Card, PageHeader, StatGrid, Stat, Alert, Row, Avatar, Badge } from '../components/primitives';
import MvpButton from '../components/Button';

const Home = () => {
  return (
    <div className="space-y-3">
      <PageHeader title="নমস্কার, Ramesh Mondal" />
      <Card className="bg-clinical-teal-soft border-clinical-teal/30">
        <div className="text-xs text-clinical-teal-ink">সুস্বাগতম! Your health record is up to date.</div>
        <div className="mt-0.5 text-[11px] text-muted-foreground">Health ID: AH-2049-7731-RM</div>
      </Card>

      <StatGrid cols={4}>
        <Stat value="1" label="Upcoming visit" hint="Tomorrow" />
        <Stat value="3" label="Active medicines" />
        <Stat value="12" label="Days since last visit" />
        <Stat value="98%" label="Record complete" tone="success" />
      </StatGrid>

      <Alert
        tone="amber"
        icon={<Bell aria-hidden="true" />}
        title="আজ বিকেল ৫টায় Metformin খাওয়ার সময়"
        body="Take Metformin 500mg after dinner. Tap Reminders to snooze or mark as taken."
      />

      <Card>
        <PageHeader title="Your Health Card" />
        <div className="flex items-center gap-3 rounded-xl border border-clinical-teal/30 bg-clinical-teal-soft p-3">
          <Avatar tone="teal" className="h-12 w-12 text-sm">RM</Avatar>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-clinical-teal-ink">Ramesh Mondal</div>
            <div className="text-[11px] text-muted-foreground">Age 54 · O+ · Sonatikari village</div>
          </div>
          <QrCode className="h-9 w-9 shrink-0 text-clinical-teal-ink" aria-hidden="true" />
        </div>
      </Card>

      <Card>
        <PageHeader title="Recent activity" />
        <Row
          avatar={<Avatar tone="blue"><Stethoscope /></Avatar>}
          title="Consultation with Dr. Ananya Sen"
          meta="Fever &amp; cough · 3 days ago"
          action={<Badge tone="success">Completed</Badge>}
        />
        <Row
          avatar={<Avatar tone="amber"><Pill /></Avatar>}
          title="Prescription: Metformin, Amlodipine"
          meta="Issued by Dr. Ananya Sen · 3 days ago"
        />
        <Row
          avatar={<Avatar tone="teal"><FileHeart /></Avatar>}
          title="Blood sugar report uploaded"
          meta="Sonatikari PHC lab · 12 days ago"
        />
      </Card>

      <Card>
        <PageHeader title="Quick actions" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <MvpButton variant="soft" className="w-full"><CalendarDays /> Book visit</MvpButton>
          <MvpButton variant="soft" className="w-full"><Pill /> My Rx</MvpButton>
          <MvpButton variant="soft" className="w-full"><FileHeart /> Reports</MvpButton>
          <MvpButton variant="soft" className="w-full"><ShieldCheck /> Consent</MvpButton>
        </div>
      </Card>
    </div>
  );
};

export default Home;

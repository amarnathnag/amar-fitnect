import React from 'react';
import { Home as HomeIcon, Activity, Pill, CalendarDays, BellRing, Users, FileHeart, ShieldCheck, IdCard, Settings as SettingsIcon, ChevronRight, Lock, Download, Upload } from 'lucide-react';
import MvpShell, { MvpNavItem } from '@/mvp/components/MvpShell';
import { Card, PageHeader, Row, Avatar, Badge, Alert, Toggle, Tile } from '@/mvp/components/primitives';
import MvpButton from '@/mvp/components/Button';
import Home from '@/mvp/patient/Home';
import Timeline from '@/mvp/patient/Timeline';
import Prescriptions from '@/mvp/patient/Prescriptions';
import Appointments from '@/mvp/patient/Appointments';
import Reminders from '@/mvp/patient/Reminders';
import Family from '@/mvp/patient/Family';

const Reports = () => (
  <div className="space-y-3">
    <PageHeader title="Reports & documents" action={<MvpButton size="sm" variant="soft"><Upload /> Upload</MvpButton>} />
    <Card>
      <Row avatar={<Avatar tone="teal"><FileHeart /></Avatar>} title="Blood sugar (FBS / PPBS)" meta="Sonatikari PHC lab · 15 Jun 2026" action={<MvpButton size="sm" variant="outline"><Download /> PDF</MvpButton>} />
      <Row avatar={<Avatar tone="blue"><FileHeart /></Avatar>} title="Lipid profile" meta="Pingla Diagnostics · 02 May 2026" action={<MvpButton size="sm" variant="outline"><Download /> PDF</MvpButton>} />
      <Row avatar={<Avatar tone="amber"><FileHeart /></Avatar>} title="Chest X-Ray" meta="Midnapore Medical · 11 Mar 2026" action={<MvpButton size="sm" variant="outline"><Download /> PDF</MvpButton>} />
      <Row avatar={<Avatar tone="neutral"><FileHeart /></Avatar>} title="Thyroid profile (TSH)" meta="Pingla Diagnostics · 20 Jan 2026" action={<MvpButton size="sm" variant="outline"><Download /> PDF</MvpButton>} />
    </Card>
  </div>
);

const Consent = () => {
  const [flags, setFlags] = React.useState({ doctor: true, pharmacy: true, family: true, research: false });
  return (
    <div className="space-y-3">
      <PageHeader title="Consent & privacy" />
      <Alert tone="teal" icon={<ShieldCheck aria-hidden="true" />} title="You control who sees your records" body="Every access is recorded in your audit trail with the reason it was requested." />
      <Card>
        <Row title="Dr. Anirban Das — treating doctor" meta="Full history · Pingla Clinic" action={<Toggle on={flags.doctor} label="Doctor access" onClick={() => setFlags((f) => ({ ...f, doctor: !f.doctor }))} />} />
        <Row title="Amar Medical Store — pharmacy" meta="Active prescriptions only" action={<Toggle on={flags.pharmacy} label="Pharmacy access" onClick={() => setFlags((f) => ({ ...f, pharmacy: !f.pharmacy }))} />} />
        <Row title="Family caregiver — Sujata Mondal" meta="Reminders and appointments" action={<Toggle on={flags.family} label="Family access" onClick={() => setFlags((f) => ({ ...f, family: !f.family }))} />} />
        <Row title="Anonymous public-health research" meta="De-identified data only" action={<Toggle on={flags.research} label="Research sharing" onClick={() => setFlags((f) => ({ ...f, research: !f.research }))} />} />
      </Card>
      <Card>
        <PageHeader title="Recent record access" />
        <Row avatar={<Avatar tone="blue"><Lock /></Avatar>} title="Full history viewed by Dr. Anirban Das" meta="Reason: Hypertension follow-up · 12 Jun, 10:30 AM" />
        <Row avatar={<Avatar tone="amber"><Lock /></Avatar>} title="Active Rx viewed by Amar Medical Store" meta="Reason: Dispensing · 12 Jun, 11:05 AM" />
      </Card>
    </div>
  );
};

const Emr = () => (
  <div className="space-y-3">
    <PageHeader title="Health record (EMR)" action={<Badge tone="success">ABHA linked</Badge>} />
    <Card>
      <PageHeader title="Vitals · last visit" />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Tile title="138/88" meta="Blood pressure" />
        <Tile title="146 mg/dL" meta="Fasting sugar" />
        <Tile title="72 kg" meta="Weight" />
        <Tile title="O+" meta="Blood group" />
      </div>
    </Card>
    <Card>
      <PageHeader title="Chronic conditions" />
      <Row title="Hypertension" meta="Diagnosed Mar 2023 · Amlodipine 5mg" action={<Badge tone="amber">Ongoing</Badge>} />
      <Row title="Type 2 Diabetes" meta="Diagnosed Aug 2024 · Metformin 500mg" action={<Badge tone="amber">Ongoing</Badge>} />
    </Card>
    <Card>
      <PageHeader title="Allergies & history" />
      <Row title="No known drug allergies" meta="Confirmed by Dr. Anirban Das · 12 Jun 2026" action={<Badge tone="success">Verified</Badge>} />
      <Row title="Appendectomy" meta="Midnapore Medical College · 2011" />
    </Card>
  </div>
);

const Settings = () => (
  <div className="space-y-3">
    <PageHeader title="Settings" />
    <Card>
      <Row avatar={<Avatar tone="teal"><IdCard /></Avatar>} title="Ramesh Mondal · AH-PM-00247" meta="Sonatikari village, Pingla · 54 yrs" action={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
      <Row title="Language" meta="বাংলা (Bengali)" action={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
      <Row title="WhatsApp notifications" meta="Prescriptions, reminders, reports" action={<Toggle on label="WhatsApp notifications" />} />
      <Row title="SMS fallback" meta="Used when there is no internet" action={<Toggle on label="SMS fallback" />} />
      <Row title="ABHA linking" meta="ABHA 12-3456-7890-1234 · verified" action={<Badge tone="success">Linked</Badge>} />
    </Card>
  </div>
);

const nav: MvpNavItem[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'timeline', label: 'Timeline', icon: Activity },
  { id: 'rx', label: 'My Rx', icon: Pill },
  { id: 'appointments', label: 'Visits', icon: CalendarDays },
  { id: 'reminders', label: 'Reminders', icon: BellRing, badge: 2 },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileHeart },
  { id: 'consent', label: 'Consent', icon: ShieldCheck },
  { id: 'emr', label: 'Record', icon: IdCard },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

const PatientApp = () => (
  <MvpShell
    role="Patient"
    userName="Ramesh Mondal"
    nav={nav}
    screens={{
      home: <Home />,
      timeline: <Timeline />,
      rx: <Prescriptions />,
      appointments: <Appointments />,
      reminders: <Reminders />,
      family: <Family />,
      reports: <Reports />,
      consent: <Consent />,
      emr: <Emr />,
      settings: <Settings />,
    }}
  />
);

export default PatientApp;

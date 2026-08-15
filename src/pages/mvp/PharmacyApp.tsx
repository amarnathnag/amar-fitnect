import React, { useState } from 'react';
import {
  Home as HomeIcon, ClipboardList, Check, Package, AlertCircle, LineChart, Settings as SettingsIcon,
  ShieldCheck, Printer, CircleCheck, Clock, Building2, Stethoscope, Bell, MessageCircle, RefreshCw, Activity,
} from 'lucide-react';
import MvpShell, { MvpNavItem } from '@/mvp/components/MvpShell';
import { Card, PageHeader, SectionTitle, StatGrid, Stat, Alert, Row, Avatar, Badge, Bar, Toggle, ButtonRow, StepList } from '@/mvp/components/primitives';
import MvpButton from '@/mvp/components/Button';
import { WeekChart } from './DoctorApp';

const Dashboard = () => (
  <div className="space-y-3">
    <Alert tone="danger" icon={<Package aria-hidden="true" />} title="3 medicines critical — reorder now" body="Azithromycin 500mg (5), Eltroxin 50mcg (2), Montelukast 10mg (3)" />
    <StatGrid cols={4}>
      <Stat value="18" label="Rx received" />
      <Stat value="15" label="Dispensed" />
      <Stat value="3" label="Pending" tone="amber" />
      <Stat value="₹8,450" label="Today's sales" />
    </StatGrid>
    <div className="grid gap-3 lg:grid-cols-2">
      <div>
        <SectionTitle>Recent queue</SectionTitle>
        <Card>
          <Row avatar={<Avatar tone="teal">RM</Avatar>} title="Ramesh Mondal" meta="Dr. Anirban Das · 10:30 AM" action={<Badge tone="success">Done</Badge>} />
          <Row avatar={<Avatar tone="blue">SR</Avatar>} title="Sita Rani Das" meta="Dr. Anirban Das · 11:15 AM" action={<Badge tone="success">Done</Badge>} />
          <Row avatar={<Avatar tone="amber">SP</Avatar>} title="Subhajit Pal" meta="Dr. Anirban Das · 12:05 PM" action={<Badge tone="amber">Pending</Badge>} />
        </Card>
      </div>
      <div>
        <SectionTitle>Top sellers today</SectionTitle>
        <Card>
          <Bar label="Paracetamol 500mg" value={88} valueLabel="24" />
          <Bar label="Cetirizine 10mg" value={52} valueLabel="14" />
          <Bar label="Metformin 500mg" value={44} valueLabel="12" />
        </Card>
      </div>
    </div>
  </div>
);

const Queue = () => (
  <div className="space-y-3">
    <PageHeader title="Prescription queue" action={<Badge tone="amber">3 pending</Badge>} />
    <Card className="border-l-[3px] border-l-clinical-amber">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium">Subhajit Pal</div>
          <div className="text-[10px] text-muted-foreground">Dr. Anirban Das · MBBS MCI #WB12345 · 12:05 PM</div>
        </div>
        <Badge tone="amber">Pending</Badge>
      </div>
      <Row title="Amoxicillin 500mg" meta="1 cap · 3x daily · 5 days" action={<Badge tone="success">In stock (45)</Badge>} />
      <Row title="Benadryl Cough Syrup 100ml" meta="10ml · 3x daily · 5 days" action={<Badge tone="success">In stock (12)</Badge>} />
      <ButtonRow><MvpButton><Check /> Dispense now</MvpButton></ButtonRow>
    </Card>
    <Card className="border-l-[3px] border-l-clinical-amber">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium">Mina Das</div>
          <div className="text-[10px] text-muted-foreground">Dr. Anirban Das · MBBS · 3:30 PM</div>
        </div>
        <Badge tone="amber">Upcoming</Badge>
      </div>
      <Row title="Paracetamol 500mg" meta="1 tab · 3x daily · 5 days" action={<Badge tone="success">In stock (98)</Badge>} />
    </Card>
  </div>
);

const Dispense = () => {
  const [done, setDone] = useState(false);
  const [checked, setChecked] = useState<[boolean, boolean]>([false, false]);
  return (
    <div className="space-y-3">
      <PageHeader title="Dispense — Subhajit Pal" />
      <Alert tone="teal" icon={<ShieldCheck aria-hidden="true" />} title="Doctor verified — Dr. Anirban Das" body="MBBS · MCI #WB12345 · AmarHealth verified · Prescription digitally signed" />
      <Card>
        <Row
          title="Amoxicillin 500mg · 1 cap · 3x · 5 days"
          meta="Qty needed: 15 caps · In stock: 45"
          action={<input type="checkbox" aria-label="Dispensed Amoxicillin" className="h-[18px] w-[18px] accent-clinical-teal" checked={checked[0]} onChange={(e) => setChecked([e.target.checked, checked[1]])} />}
        />
        <Row
          title="Benadryl Cough Syrup 100ml"
          meta="Qty needed: 1 bottle · In stock: 12"
          action={<input type="checkbox" aria-label="Dispensed Benadryl" className="h-[18px] w-[18px] accent-clinical-teal" checked={checked[1]} onChange={(e) => setChecked([checked[0], e.target.checked])} />}
        />
      </Card>
      <Card>
        <StepList
          steps={[
            { label: 'Prescription received and verified', done: true, icon: <Check /> },
            { label: 'Doctor credentials confirmed', done: true, icon: <Check /> },
            { label: 'Dispense medicines', done, icon: <Package /> },
            { label: 'Update inventory', done, icon: <RefreshCw /> },
            { label: 'Update patient timeline', done, icon: <Activity /> },
          ]}
        />
      </Card>
      <ButtonRow>
        <MvpButton onClick={() => { setChecked([true, true]); setDone(true); }}><Check /> Mark all dispensed</MvpButton>
        <MvpButton variant="outline"><Printer /> Print label</MvpButton>
      </ButtonRow>
      {done ? (
        <Card className="py-6 text-center">
          <CircleCheck className="mx-auto h-9 w-9 text-clinical-success" />
          <div className="mt-2 text-sm font-medium">Dispensing complete</div>
          <div className="text-[11px] text-muted-foreground">Inventory updated · Patient timeline updated · Record saved</div>
        </Card>
      ) : null}
    </div>
  );
};

const stock = [
  { name: 'Paracetamol 500mg', meta: 'Exp: Dec 2026 · MRP ₹15', qty: '98 units', state: 'In stock', tone: 'success' as const },
  { name: 'Amoxicillin 500mg', meta: 'Exp: Aug 2027 · MRP ₹45', qty: '45 units', state: 'In stock', tone: 'success' as const },
  { name: 'Metformin 500mg', meta: 'Exp: Jan 2027 · MRP ₹18', qty: '72 units', state: 'In stock', tone: 'success' as const },
  { name: 'Cetirizine 10mg', meta: 'Exp: Jun 2027 · MRP ₹18', qty: '58 units', state: 'In stock', tone: 'success' as const },
  { name: 'Azithromycin 500mg', meta: 'Exp: Aug 2026 · MRP ₹120', qty: '5 units', state: 'Low stock', tone: 'amber' as const },
  { name: 'Eltroxin 50mcg', meta: 'Exp: Sep 2026 · MRP ₹85', qty: '2 units', state: 'Critical', tone: 'danger' as const },
  { name: 'Montelukast 10mg', meta: 'Exp: Oct 2026 · MRP ₹95', qty: '3 units', state: 'Critical', tone: 'danger' as const },
  { name: 'Vitamin D3 60K IU', meta: 'Exp: Dec 2026 · MRP ₹35', qty: '65 units', state: 'In stock', tone: 'success' as const },
];

const Inventory = () => (
  <div className="space-y-3">
    <PageHeader title="Inventory" action={<MvpButton size="sm">Add medicine</MvpButton>} />
    <Card>
      {stock.map((s) => (
        <Row key={s.name} title={s.name} meta={s.meta} action={<div className="text-right"><Badge tone={s.tone}>{s.qty}</Badge><div className="mt-0.5 text-[10px] text-muted-foreground">{s.state}</div></div>} />
      ))}
    </Card>
  </div>
);

const Alerts = () => (
  <div className="space-y-3">
    <PageHeader title="Alerts" />
    <SectionTitle>Critical stock — reorder immediately</SectionTitle>
    <Alert tone="danger" icon={<Package aria-hidden="true" />} title="Eltroxin 50mcg — 2 units left" body="Sita Rani Das has a monthly prescription. Reorder minimum 30 strips." />
    <Alert tone="danger" icon={<Package aria-hidden="true" />} title="Montelukast 10mg — 3 units left" body="3 pending prescriptions require this. Reorder urgently." />
    <SectionTitle>Low stock</SectionTitle>
    <Alert tone="amber" icon={<Package aria-hidden="true" />} title="Azithromycin 500mg — 5 units" body="Below threshold of 10. Reorder soon." />
    <SectionTitle>Expiring within 60 days</SectionTitle>
    <Alert tone="amber" icon={<Clock aria-hidden="true" />} title="Azithromycin 500mg — expires Aug 2026" body="40 days remaining. Dispense first." />
    <Alert tone="amber" icon={<Clock aria-hidden="true" />} title="Eltroxin 50mcg — expires Sep 2026" body="70 days remaining. Monitor." />
  </div>
);

const Sales = () => (
  <div className="space-y-3">
    <PageHeader title="Sales · June 2026" />
    <StatGrid cols={4}>
      <Stat value="₹8,450" label="Today" />
      <Stat value="₹1.8L" label="This month" hint="↑ 14%" />
      <Stat value="246" label="Prescriptions" />
      <Stat value="4.9★" label="Rating" />
    </StatGrid>
    <SectionTitle>Top selling medicines</SectionTitle>
    <Card>
      <Bar label="Paracetamol 500mg" value={88} valueLabel="152 units" />
      <Bar label="Metformin 500mg" value={57} valueLabel="98 units" />
      <Bar label="Cetirizine 10mg" value={44} valueLabel="76 units" />
      <Bar label="Amlodipine 5mg" value={31} valueLabel="54 units" />
    </Card>
    <SectionTitle>Daily sales this week</SectionTitle>
    <WeekChart values={[60, 75, 50, 90, 100, 80, 45]} />
  </div>
);

const PharmacySettings = () => (
  <div className="space-y-3">
    <PageHeader title="Pharmacy settings" />
    <Card>
      <Row avatar={<Avatar tone="teal"><Building2 /></Avatar>} title="Amar Medical Store" meta="DL #WB-PM-00124 · Pingla Block" action={<Badge tone="success">✓ Verified</Badge>} />
      <Row avatar={<Avatar tone="neutral"><Stethoscope /></Avatar>} title="Linked doctors" meta="Dr. Anirban Das, Dr. Soumen Roy" />
      <Row avatar={<Avatar tone="neutral"><Bell /></Avatar>} title="Low stock threshold" meta="Alert when stock below 10 units" />
      <Row avatar={<Avatar tone="neutral"><MessageCircle /></Avatar>} title="WhatsApp notifications" meta="New Rx, alerts, daily summary" action={<Toggle on label="WhatsApp notifications" />} />
    </Card>
  </div>
);

const nav: MvpNavItem[] = [
  { id: 'home', label: 'Dashboard', icon: HomeIcon },
  { id: 'queue', label: 'Rx queue', icon: ClipboardList, badge: 3 },
  { id: 'dispense', label: 'Dispense', icon: Check },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'alerts', label: 'Alerts', icon: AlertCircle, badge: 3 },
  { id: 'sales', label: 'Sales', icon: LineChart },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

const PharmacyApp = () => (
  <MvpShell
    role="Pharmacy"
    userName="Amar Medical Store"
    nav={nav}
    screens={{
      home: <Dashboard />,
      queue: <Queue />,
      dispense: <Dispense />,
      inventory: <Inventory />,
      alerts: <Alerts />,
      sales: <Sales />,
      settings: <PharmacySettings />,
    }}
  />
);

export default PharmacyApp;

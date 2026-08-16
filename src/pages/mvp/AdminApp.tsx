import React, { useState } from 'react';
import {
  Home as HomeIcon, Stethoscope, Building2, Users, FileText, Activity, ScrollText,
  LifeBuoy, MessageSquareWarning, ShieldCheck, Check, X, Clock, AlertTriangle, Search as SearchIcon,
} from 'lucide-react';
import MvpShell, { MvpNavItem } from '@/mvp/components/MvpShell';
import {
  Card, PageHeader, SectionTitle, StatGrid, Stat, Alert, Row, Avatar, Badge, Bar, Search, ButtonRow,
} from '@/mvp/components/primitives';
import DataTable, { Column } from '@/mvp/components/DataTable';
import MvpButton from '@/mvp/components/Button';

/* ---------------------------------- data ---------------------------------- */

type ApprovalKind = 'Doctor' | 'Pharmacy';
interface Approval {
  id: string;
  name: string;
  kind: ApprovalKind;
  detail: string;
  registration: string;
  submitted: string;
}

const pendingSeed: Approval[] = [
  { id: 'AP-1041', name: 'Dr. Sanjoy Ghosh', kind: 'Doctor', detail: 'MBBS, MD (Medicine) · Sabang', registration: 'WBMC 78421', submitted: '25 Jun 2026' },
  { id: 'AP-1042', name: 'Dr. Rupa Chatterjee', kind: 'Doctor', detail: 'MBBS, DGO · Kharagpur', registration: 'WBMC 66190', submitted: '25 Jun 2026' },
  { id: 'AP-1043', name: 'Sathi Medical Hall', kind: 'Pharmacy', detail: 'Retail chemist · Keshiary', registration: 'DL-WB-20B/2231', submitted: '26 Jun 2026' },
  { id: 'AP-1044', name: 'Dr. Imran Sheikh', kind: 'Doctor', detail: 'BHMS · Pingla', registration: 'WBHC 11208', submitted: '26 Jun 2026' },
  { id: 'AP-1045', name: 'Jan Aushadhi Kendra (Debra)', kind: 'Pharmacy', detail: 'Generic store · Debra', registration: 'DL-WB-21B/0918', submitted: '27 Jun 2026' },
];

interface DoctorRow {
  id: string; name: string; specialty: string; clinic: string; patients: number; rx: number; rating: number; status: 'Verified' | 'Suspended' | 'Review';
}
const doctors: DoctorRow[] = [
  { id: 'AH-DR-0012', name: 'Dr. Anirban Das', specialty: 'General Medicine', clinic: 'Pingla Clinic', patients: 486, rx: 1320, rating: 4.8, status: 'Verified' },
  { id: 'AH-DR-0019', name: 'Dr. Mousumi Sen', specialty: 'Paediatrics', clinic: 'Sabang Child Care', patients: 312, rx: 902, rating: 4.7, status: 'Verified' },
  { id: 'AH-DR-0024', name: 'Dr. Prasanta Roy', specialty: 'Cardiology', clinic: 'Midnapore Heart Centre', patients: 168, rx: 421, rating: 4.9, status: 'Verified' },
  { id: 'AH-DR-0031', name: 'Dr. Kabir Hossain', specialty: 'Dermatology', clinic: 'Debra Skin Clinic', patients: 94, rx: 210, rating: 4.2, status: 'Review' },
  { id: 'AH-DR-0037', name: 'Dr. Nabin Pradhan', specialty: 'General Medicine', clinic: 'Keshiary Chamber', patients: 41, rx: 88, rating: 3.6, status: 'Suspended' },
];

interface PharmacyRow {
  id: string; name: string; location: string; dispensed: number; fillRate: string; stockAlerts: number; status: 'Active' | 'Onboarding' | 'Suspended';
}
const pharmacies: PharmacyRow[] = [
  { id: 'AH-PH-0007', name: 'Amar Medical Store', location: 'Pingla', dispensed: 1180, fillRate: '96%', stockAlerts: 3, status: 'Active' },
  { id: 'AH-PH-0011', name: 'Jan Aushadhi Kendra', location: 'Sabang', dispensed: 742, fillRate: '91%', stockAlerts: 5, status: 'Active' },
  { id: 'AH-PH-0016', name: 'Maa Tara Pharmacy', location: 'Keshiary', dispensed: 388, fillRate: '88%', stockAlerts: 1, status: 'Active' },
  { id: 'AH-PH-0021', name: 'Sathi Medical Hall', location: 'Keshiary', dispensed: 0, fillRate: '—', stockAlerts: 0, status: 'Onboarding' },
];

interface PatientRow {
  id: string; name: string; age: string; village: string; abha: 'Linked' | 'Pending'; visits: number; lastVisit: string;
}
const patients: PatientRow[] = [
  { id: 'AH-PM-00247', name: 'Ramesh Mondal', age: '45M', village: 'Pingla', abha: 'Linked', visits: 14, lastVisit: '12 Jun 2026' },
  { id: 'AH-PM-00251', name: 'Sita Rani Das', age: '32F', village: 'Sabang', abha: 'Linked', visits: 9, lastVisit: '18 Jun 2026' },
  { id: 'AH-PM-00263', name: 'Subhajit Pal', age: '28M', village: 'Pingla', abha: 'Pending', visits: 3, lastVisit: '27 Jun 2026' },
  { id: 'AH-PM-00290', name: 'Anita Das', age: '60F', village: 'Keshiary', abha: 'Linked', visits: 21, lastVisit: '24 Jun 2026' },
  { id: 'AH-PM-00304', name: 'Mina Das', age: '35F', village: 'Pingla', abha: 'Pending', visits: 1, lastVisit: '27 Jun 2026' },
];

interface RxRow {
  id: string; patient: string; doctor: string; pharmacy: string; issued: string; status: 'Dispensed' | 'Pending' | 'Expired';
}
const prescriptions: RxRow[] = [
  { id: 'RX-2026-8841', patient: 'Subhajit Pal', doctor: 'Dr. Anirban Das', pharmacy: 'Amar Medical Store', issued: '27 Jun, 12:10', status: 'Pending' },
  { id: 'RX-2026-8836', patient: 'Ramesh Mondal', doctor: 'Dr. Anirban Das', pharmacy: 'Amar Medical Store', issued: '27 Jun, 10:42', status: 'Dispensed' },
  { id: 'RX-2026-8829', patient: 'Sita Rani Das', doctor: 'Dr. Mousumi Sen', pharmacy: 'Jan Aushadhi Kendra', issued: '26 Jun, 17:20', status: 'Dispensed' },
  { id: 'RX-2026-8811', patient: 'Anita Das', doctor: 'Dr. Prasanta Roy', pharmacy: 'Maa Tara Pharmacy', issued: '24 Jun, 13:05', status: 'Dispensed' },
  { id: 'RX-2026-8790', patient: 'Bablu Roy', doctor: 'Dr. Anirban Das', pharmacy: 'Not chosen', issued: '21 Jun, 09:15', status: 'Expired' },
];

interface AuditRow { id: string; actor: string; action: string; target: string; when: string; ip: string }
const auditLog: AuditRow[] = [
  { id: 'LG-99120', actor: 'admin@amarhealth', action: 'Approved doctor verification', target: 'AH-DR-0024', when: '27 Jun, 11:58', ip: '10.4.1.22' },
  { id: 'LG-99119', actor: 'Dr. Anirban Das', action: 'Viewed patient full history', target: 'AH-PM-00247', when: '27 Jun, 10:30', ip: '10.4.7.91' },
  { id: 'LG-99118', actor: 'Amar Medical Store', action: 'Viewed active prescription only', target: 'RX-2026-8836', when: '27 Jun, 10:41', ip: '10.4.9.14' },
  { id: 'LG-99117', actor: 'admin@amarhealth', action: 'Hid review pending moderation', target: 'RV-5521', when: '26 Jun, 18:02', ip: '10.4.1.22' },
  { id: 'LG-99116', actor: 'Ramesh Mondal', action: 'Revoked pharmacy consent', target: 'AH-PH-0011', when: '26 Jun, 08:14', ip: 'mobile' },
];

interface TicketRow { id: string; from: string; subject: string; priority: 'High' | 'Medium' | 'Low'; status: 'Open' | 'In progress' | 'Resolved'; age: string }
const tickets: TicketRow[] = [
  { id: 'TK-3312', from: 'Dr. Kabir Hossain', subject: 'Voice Rx not detecting Bengali dosage', priority: 'High', status: 'In progress', age: '4h' },
  { id: 'TK-3309', from: 'Amar Medical Store', subject: 'Stock sync failed for 3 items', priority: 'Medium', status: 'Open', age: '9h' },
  { id: 'TK-3305', from: 'Anita Das', subject: 'Not receiving WhatsApp reminders', priority: 'High', status: 'Open', age: '1d' },
  { id: 'TK-3298', from: 'Jan Aushadhi Kendra', subject: 'Request additional counter login', priority: 'Low', status: 'Resolved', age: '3d' },
];

interface ReviewRow {
  id: string; patient: string; doctor: string; appointment: string; rating: number; text: string; flag: string;
}
const flaggedSeed: ReviewRow[] = [
  { id: 'RV-5521', patient: 'Verified patient · AH-PM-00304', doctor: 'Dr. Kabir Hossain', appointment: 'APT-77120', rating: 1, text: 'Contains another patient’s name and a diagnosis — possible privacy breach.', flag: 'Possible PHI disclosure' },
  { id: 'RV-5518', patient: 'Verified patient · AH-PM-00263', doctor: 'Dr. Nabin Pradhan', appointment: 'APT-77098', rating: 2, text: 'Abusive language reported by 3 users.', flag: 'Abuse report ×3' },
  { id: 'RV-5502', patient: 'Unverified account', doctor: 'Dr. Anirban Das', appointment: 'No matching appointment', rating: 5, text: 'Review submitted without a completed consultation.', flag: 'Eligibility failed' },
];

/* -------------------------------- screens -------------------------------- */

const statusTone = (s: string) =>
  s === 'Verified' || s === 'Active' || s === 'Dispensed' || s === 'Linked' || s === 'Resolved'
    ? 'success'
    : s === 'Suspended' || s === 'Expired' || s === 'High'
    ? 'danger'
    : s === 'Review' || s === 'Pending' || s === 'Open' || s === 'Onboarding' || s === 'Medium'
    ? 'amber'
    : 'neutral';

const Dashboard = ({ pendingCount }: { pendingCount: number }) => (
  <div className="space-y-3">
    <PageHeader title="Platform overview · 27 Jun 2026" action={<Badge tone="success">All systems normal</Badge>} />
    <Alert
      tone="amber"
      icon={<Clock aria-hidden="true" />}
      title={`${pendingCount} verification requests waiting`}
      body="Doctors and pharmacies cannot go live until registration numbers are verified against the council/drug licence registry."
    />
    <StatGrid cols={4}>
      <Stat value="128" label="Verified doctors" hint="↑ 6 this month" />
      <Stat value="54" label="Active pharmacies" hint="↑ 3 this month" />
      <Stat value="9,412" label="Registered patients" hint="↑ 512 this month" />
      <Stat value="21,806" label="Prescriptions issued" />
    </StatGrid>
    <StatGrid cols={4}>
      <Stat value={pendingCount} label="Pending approvals" tone="amber" />
      <Stat value="3" label="Reviews to moderate" tone="amber" />
      <Stat value="4" label="Open support tickets" />
      <Stat value="99.8%" label="Uptime (30d)" tone="success" />
    </StatGrid>
    <SectionTitle>District adoption</SectionTitle>
    <Card>
      <Bar label="Pingla" value={82} valueLabel="42 doctors" />
      <Bar label="Sabang" value={64} valueLabel="31 doctors" />
      <Bar label="Keshiary" value={48} valueLabel="24 doctors" />
      <Bar label="Debra" value={39} valueLabel="19 doctors" />
      <Bar label="Kharagpur (rural)" value={25} valueLabel="12 doctors" />
    </Card>
  </div>
);

const Approvals = ({
  pending,
  decide,
}: {
  pending: Approval[];
  decide: (id: string, outcome: 'approved' | 'rejected') => void;
}) => {
  const columns: Column<Approval>[] = [
    {
      key: 'name',
      header: 'Applicant',
      render: (r) => (
        <div className="min-w-[150px]">
          <div className="font-medium">{r.name}</div>
          <div className="text-[10px] text-muted-foreground">{r.detail}</div>
        </div>
      ),
    },
    { key: 'kind', header: 'Type', render: (r) => <Badge tone={r.kind === 'Doctor' ? 'blue' : 'amber'}>{r.kind}</Badge> },
    { key: 'reg', header: 'Registration', hideOnMobile: true, render: (r) => <span className="font-mono text-[10px]">{r.registration}</span> },
    { key: 'submitted', header: 'Submitted', hideOnMobile: true, render: (r) => r.submitted },
    {
      key: 'actions',
      header: 'Decision',
      className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1.5">
          <MvpButton size="sm" onClick={() => decide(r.id, 'approved')}><Check /> Verify</MvpButton>
          <MvpButton size="sm" variant="danger" onClick={() => decide(r.id, 'rejected')}><X /> Reject</MvpButton>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <PageHeader title="Verification queue" action={<Badge tone="amber">{pending.length} pending</Badge>} />
      <Alert
        tone="teal"
        icon={<ShieldCheck aria-hidden="true" />}
        title="Only verified professional information is published"
        body="Ranking and visibility can never be purchased. Approval confirms identity, qualification and registration only."
      />
      <DataTable columns={columns} rows={pending} rowKey={(r) => r.id} caption="Pending verifications" empty="Queue clear — no pending verifications." />
    </div>
  );
};

const Doctors = () => {
  const columns: Column<DoctorRow>[] = [
    {
      key: 'name',
      header: 'Doctor',
      render: (r) => (
        <div className="flex min-w-[160px] items-center gap-2">
          <Avatar tone="blue">{r.name.replace('Dr. ', '').split(' ').map((p) => p[0]).join('')}</Avatar>
          <div>
            <div className="font-medium">{r.name}</div>
            <div className="text-[10px] text-muted-foreground">{r.specialty}</div>
          </div>
        </div>
      ),
    },
    { key: 'clinic', header: 'Clinic', hideOnMobile: true, render: (r) => r.clinic },
    { key: 'patients', header: 'Patients', hideOnMobile: true, render: (r) => r.patients },
    { key: 'rx', header: 'Rx', hideOnMobile: true, render: (r) => r.rx },
    { key: 'rating', header: 'Rating', render: (r) => `${r.rating.toFixed(1)}★` },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={statusTone(r.status) as 'success'}>{r.status}</Badge> },
  ];
  return (
    <div className="space-y-3">
      <PageHeader title="Doctors" action={<Badge tone="success">128 verified</Badge>} />
      <Search placeholder="Search doctor, specialty, registration no..." />
      <DataTable columns={columns} rows={doctors} rowKey={(r) => r.id} caption="Registered doctors" />
    </div>
  );
};

const Pharmacies = () => {
  const columns: Column<PharmacyRow>[] = [
    {
      key: 'name',
      header: 'Pharmacy',
      render: (r) => (
        <div className="min-w-[150px]">
          <div className="font-medium">{r.name}</div>
          <div className="text-[10px] text-muted-foreground">{r.location} · {r.id}</div>
        </div>
      ),
    },
    { key: 'dispensed', header: 'Dispensed', hideOnMobile: true, render: (r) => r.dispensed },
    { key: 'fill', header: 'Fill rate', hideOnMobile: true, render: (r) => r.fillRate },
    {
      key: 'alerts',
      header: 'Stock alerts',
      render: (r) => (r.stockAlerts ? <Badge tone="amber">{r.stockAlerts}</Badge> : <span className="text-muted-foreground">—</span>),
    },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={statusTone(r.status) as 'success'}>{r.status}</Badge> },
  ];
  return (
    <div className="space-y-3">
      <PageHeader title="Pharmacies" />
      <Search placeholder="Search pharmacy, drug licence, location..." />
      <DataTable columns={columns} rows={pharmacies} rowKey={(r) => r.id} caption="Registered pharmacies" />
    </div>
  );
};

const Patients = () => {
  const columns: Column<PatientRow>[] = [
    {
      key: 'name',
      header: 'Patient',
      render: (r) => (
        <div className="min-w-[150px]">
          <div className="font-medium">{r.name}</div>
          <div className="font-mono text-[10px] text-muted-foreground">{r.id}</div>
        </div>
      ),
    },
    { key: 'age', header: 'Age/Sex', render: (r) => r.age },
    { key: 'village', header: 'Village', hideOnMobile: true, render: (r) => r.village },
    { key: 'abha', header: 'ABHA', render: (r) => <Badge tone={statusTone(r.abha) as 'success'}>{r.abha}</Badge> },
    { key: 'visits', header: 'Visits', hideOnMobile: true, render: (r) => r.visits },
    { key: 'last', header: 'Last visit', hideOnMobile: true, render: (r) => r.lastVisit },
  ];
  return (
    <div className="space-y-3">
      <PageHeader title="Patients" />
      <Alert tone="neutral" icon={<ShieldCheck aria-hidden="true" />} title="Admins see identity and usage metadata only" body="Clinical records stay with the patient and their consented care team — never listed here." />
      <Search placeholder="Search name, AmarHealth ID, village..." />
      <DataTable columns={columns} rows={patients} rowKey={(r) => r.id} caption="Registered patients" />
    </div>
  );
};

const Prescriptions = () => {
  const columns: Column<RxRow>[] = [
    { key: 'id', header: 'Rx ID', render: (r) => <span className="font-mono text-[10px]">{r.id}</span> },
    { key: 'patient', header: 'Patient', render: (r) => r.patient },
    { key: 'doctor', header: 'Doctor', hideOnMobile: true, render: (r) => r.doctor },
    { key: 'pharmacy', header: 'Pharmacy (patient choice)', hideOnMobile: true, render: (r) => r.pharmacy },
    { key: 'issued', header: 'Issued', hideOnMobile: true, render: (r) => r.issued },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={statusTone(r.status) as 'success'}>{r.status}</Badge> },
  ];
  return (
    <div className="space-y-3">
      <PageHeader title="Prescription monitoring" />
      <Alert tone="neutral" icon={<FileText aria-hidden="true" />} title="Metadata only" body="Medicine details are visible to the patient, the prescribing doctor and the pharmacy chosen by the patient." />
      <DataTable columns={columns} rows={prescriptions} rowKey={(r) => r.id} caption="Prescription activity" />
    </div>
  );
};

const Moderation = () => {
  const [flagged, setFlagged] = useState(flaggedSeed);
  const [log, setLog] = useState<string[]>([]);

  const act = (id: string, outcome: 'published' | 'removed') => {
    const item = flagged.find((f) => f.id === id);
    setFlagged((f) => f.filter((x) => x.id !== id));
    if (item) setLog((l) => [`${item.id} ${outcome} · ${item.doctor}`, ...l]);
  };

  return (
    <div className="space-y-3">
      <PageHeader title="Review moderation" action={<Badge tone="amber">{flagged.length} flagged</Badge>} />
      <Alert
        tone="teal"
        icon={<ShieldCheck aria-hidden="true" />}
        title="Review rules"
        body="One review per completed consultation, tied to appointment ID. Diagnosis, prescriptions, test results and clinical notes are never published."
      />
      {flagged.map((r) => (
        <Card key={r.id} className="border-l-[3px] border-l-clinical-amber">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="danger">{r.flag}</Badge>
            <Badge tone="neutral">{r.rating}★</Badge>
            <span className="font-mono text-[10px] text-muted-foreground">{r.id}</span>
          </div>
          <div className="mt-2 text-xs font-medium">{r.doctor}</div>
          <div className="text-[10px] text-muted-foreground">{r.patient} · Appointment {r.appointment}</div>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{r.text}</p>
          <ButtonRow>
            <MvpButton size="sm" onClick={() => act(r.id, 'published')}><Check /> Approve &amp; publish</MvpButton>
            <MvpButton size="sm" variant="danger" onClick={() => act(r.id, 'removed')}><X /> Remove review</MvpButton>
          </ButtonRow>
        </Card>
      ))}
      {flagged.length === 0 ? (
        <Card className="py-6 text-center text-[11px] text-muted-foreground">No reviews awaiting moderation.</Card>
      ) : null}
      {log.length ? (
        <>
          <SectionTitle>Moderation actions this session</SectionTitle>
          <Card>
            {log.map((l) => (
              <Row key={l} avatar={<Avatar tone="neutral"><MessageSquareWarning /></Avatar>} title={l} meta="Recorded in audit log" />
            ))}
          </Card>
        </>
      ) : null}
    </div>
  );
};

const AbdmHealth = () => (
  <div className="space-y-3">
    <PageHeader title="ABDM integration health" />
    <StatGrid cols={3}>
      <Stat value="7,120" label="ABHA linked" tone="success" />
      <Stat value="2,292" label="ABHA pending" tone="amber" />
      <Stat value="140ms" label="Avg API latency" />
    </StatGrid>
    <Card>
      <Row avatar={<Avatar tone="success"><Check /></Avatar>} title="M1 — ABHA creation &amp; verification" meta="Live · 99.6% success rate" action={<Badge tone="success">Live</Badge>} />
      <Row avatar={<Avatar tone="amber"><Clock /></Avatar>} title="M2 — Health Information Provider" meta="Sandbox certification in progress" action={<Badge tone="amber">In progress</Badge>} />
      <Row avatar={<Avatar tone="neutral"><Clock /></Avatar>} title="M3 — Health Information User" meta="Planned after M2 sign-off" action={<Badge>Planned</Badge>} />
      <Row avatar={<Avatar tone="success"><ShieldCheck /></Avatar>} title="Consent manager callbacks" meta="Last sync 27 Jun, 11:52" action={<Badge tone="success">Healthy</Badge>} />
    </Card>
    <Alert tone="amber" icon={<AlertTriangle aria-hidden="true" />} title="3 ABHA link retries failed" body="Aadhaar OTP timeout at Keshiary camp — retry scheduled tonight." />
  </div>
);

const AuditLog = () => {
  const columns: Column<AuditRow>[] = [
    { key: 'when', header: 'Time', render: (r) => r.when },
    { key: 'actor', header: 'Actor', render: (r) => r.actor },
    { key: 'action', header: 'Action', render: (r) => r.action },
    { key: 'target', header: 'Target', hideOnMobile: true, render: (r) => <span className="font-mono text-[10px]">{r.target}</span> },
    { key: 'ip', header: 'Source', hideOnMobile: true, render: (r) => r.ip },
  ];
  return (
    <div className="space-y-3">
      <PageHeader title="Audit log" action={<MvpButton size="sm" variant="outline">Export CSV</MvpButton>} />
      <Search placeholder="Search actor, action, target ID..." />
      <DataTable columns={columns} rows={auditLog} rowKey={(r) => r.id} caption="Audit trail" />
    </div>
  );
};

const Tickets = () => {
  const columns: Column<TicketRow>[] = [
    { key: 'id', header: 'Ticket', render: (r) => <span className="font-mono text-[10px]">{r.id}</span> },
    { key: 'from', header: 'From', render: (r) => r.from },
    { key: 'subject', header: 'Subject', hideOnMobile: true, render: (r) => r.subject },
    { key: 'priority', header: 'Priority', render: (r) => <Badge tone={statusTone(r.priority) as 'danger'}>{r.priority}</Badge> },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={statusTone(r.status) as 'success'}>{r.status}</Badge> },
    { key: 'age', header: 'Age', hideOnMobile: true, render: (r) => r.age },
  ];
  return (
    <div className="space-y-3">
      <PageHeader title="Support tickets" />
      <DataTable columns={columns} rows={tickets} rowKey={(r) => r.id} caption="Support tickets" />
    </div>
  );
};

/* --------------------------------- shell --------------------------------- */

const nav: MvpNavItem[] = [
  { id: 'home', label: 'Overview', icon: HomeIcon },
  { id: 'approvals', label: 'Approvals', icon: Check, badge: pendingSeed.length },
  { id: 'doctors', label: 'Doctors', icon: Stethoscope },
  { id: 'pharmacies', label: 'Pharmacies', icon: Building2 },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'rx', label: 'Prescriptions', icon: FileText },
  { id: 'moderation', label: 'Reviews', icon: MessageSquareWarning, badge: flaggedSeed.length },
  { id: 'abdm', label: 'ABDM', icon: Activity },
  { id: 'audit', label: 'Audit', icon: ScrollText },
  { id: 'tickets', label: 'Tickets', icon: LifeBuoy },
];

const AdminApp = () => {
  const [pending, setPending] = useState(pendingSeed);
  const [decisions, setDecisions] = useState<{ id: string; name: string; outcome: string }[]>([]);

  const decide = (id: string, outcome: 'approved' | 'rejected') => {
    const item = pending.find((p) => p.id === id);
    setPending((p) => p.filter((x) => x.id !== id));
    if (item) setDecisions((d) => [{ id, name: item.name, outcome }, ...d]);
  };

  return (
    <MvpShell
      role="Admin"
      userName="Platform Admin"
      nav={nav.map((n) => (n.id === 'approvals' ? { ...n, badge: pending.length || undefined } : n))}
      screens={{
        home: <Dashboard pendingCount={pending.length} />,
        approvals: (
          <div className="space-y-3">
            <Approvals pending={pending} decide={decide} />
            {decisions.length ? (
              <>
                <SectionTitle>Decisions this session</SectionTitle>
                <Card>
                  {decisions.map((d) => (
                    <Row
                      key={d.id}
                      avatar={<Avatar tone={d.outcome === 'approved' ? 'success' : 'danger'}>{d.outcome === 'approved' ? <Check /> : <X />}</Avatar>}
                      title={`${d.name} — ${d.outcome}`}
                      meta={`${d.id} · recorded in audit log`}
                    />
                  ))}
                </Card>
              </>
            ) : null}
          </div>
        ),
        doctors: <Doctors />,
        pharmacies: <Pharmacies />,
        patients: <Patients />,
        rx: <Prescriptions />,
        moderation: <Moderation />,
        abdm: <AbdmHealth />,
        audit: <AuditLog />,
        tickets: <Tickets />,
      }}
    />
  );
};

export default AdminApp;

import React, { useEffect, useRef, useState } from 'react';
import {
  Home as HomeIcon, Mic, Users, CalendarDays, AlertCircle, BarChart3, Settings as SettingsIcon,
  Bot, ShieldCheck, Check, Pencil, Square, CircleCheck, MessageCircle, FileText, Activity,
  Building2, Languages, Shield, AlertTriangle, Pill, Clock, ChevronRight, UserRound,
} from 'lucide-react';
import MvpShell, { MvpNavItem } from '@/mvp/components/MvpShell';
import { Card, PageHeader, SectionTitle, StatGrid, Stat, Alert, Row, Avatar, Badge, Bar, Search, ButtonRow } from '@/mvp/components/primitives';
import MvpButton from '@/mvp/components/Button';
import { cn } from '@/lib/utils';

const Dashboard = () => (
  <div className="space-y-3">
    <Alert tone="danger" icon={<AlertCircle aria-hidden="true" />} title="Anita Das — High Risk · Overdue 3 days" body="Type 2 Diabetes (Uncontrolled) · Last HbA1c: 9.2 · Immediate follow-up required" />
    <StatGrid cols={4}>
      <Stat value="28" label="Patients today" hint="↑ 4 more" />
      <Stat value="32" label="Prescriptions" />
      <Stat value="5" label="Pending dispense" tone="amber" />
      <Stat value="12" label="Follow-ups due" />
    </StatGrid>
    <div className="grid gap-3 lg:grid-cols-2">
      <div>
        <SectionTitle>Today's patients</SectionTitle>
        <Card>
          <Row avatar={<Avatar tone="teal">RM</Avatar>} title="Ramesh Mondal" meta="45M · Viral Fever · 10:30" action={<Badge tone="success">Dispensed</Badge>} />
          <Row avatar={<Avatar tone="blue">SR</Avatar>} title="Sita Rani Das" meta="32F · Thyroid follow-up · 11:15" action={<Badge tone="success">Dispensed</Badge>} />
          <Row avatar={<Avatar tone="amber">SP</Avatar>} title="Subhajit Pal" meta="28M · URTI · 12:05" action={<Badge tone="amber">Pending</Badge>} />
          <Row avatar={<Avatar tone="danger">AD</Avatar>} title="Anita Das" meta="60F · Diabetes · 1:20" action={<Badge tone="danger">High Risk</Badge>} />
        </Card>
      </div>
      <div>
        <SectionTitle>Upcoming</SectionTitle>
        <Card>
          <Row avatar={<span className="w-12 text-[11px] font-medium text-clinical-teal-ink">3:30 PM</span>} title="Mina Das" meta="New patient" />
          <Row avatar={<span className="w-12 text-[11px] font-medium text-clinical-teal-ink">5:00 PM</span>} title="Bablu Roy" meta="Report review" />
          <Row avatar={<span className="w-12 text-[11px] font-medium text-muted-foreground">5:30 PM</span>} title="Raju Jana" meta="Follow-up · Cough" />
        </Card>
      </div>
    </div>
  </div>
);

const steps = ['Patient', 'Speak', 'AI draft', 'Review', 'Confirm', 'Sent'];

const Confidence = ({ value }: { value: number }) => (
  <span className={cn('ml-1.5 rounded px-1 py-0.5 text-[9px] font-semibold', value >= 90 ? 'bg-clinical-success-soft text-clinical-success' : 'bg-clinical-amber-soft text-clinical-amber')}>
    {value}%
  </span>
);

const VoiceRx = () => {
  const [phase, setPhase] = useState<'idle' | 'recording' | 'draft' | 'sent'>('idle');
  const [seconds, setSeconds] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (phase === 'recording') {
      timer.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [phase]);

  const stepIndex = phase === 'idle' ? 1 : phase === 'recording' ? 1 : phase === 'draft' ? 3 : 5;
  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className="space-y-3">
      <PageHeader title="Voice prescription" />
      <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <span className={cn('shrink-0 rounded-full border px-2.5 py-1 text-[10px]', i <= stepIndex ? 'border-clinical-teal bg-clinical-teal-soft text-clinical-teal-ink' : 'border-border text-muted-foreground')}>{s}</span>
            {i < steps.length - 1 ? <span className="shrink-0 text-[10px] text-muted-foreground">→</span> : null}
          </React.Fragment>
        ))}
      </div>

      <Card>
        <label className="mb-1.5 block text-[11px] text-muted-foreground" htmlFor="rx-patient">Select patient</label>
        <select id="rx-patient" className="mb-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs">
          <option>Subhajit Pal — AH-PM-00263</option>
          <option>Ramesh Mondal — AH-PM-00247</option>
          <option>Sita Rani Das — AH-PM-00251</option>
          <option>Anita Das — AH-PM-00290</option>
          <option>+ Register new patient</option>
        </select>
        <Alert tone="teal" icon={<Clock aria-hidden="true" />} title="Last visit: 15 May 2026" body="URTI · Amoxicillin · No known allergies" />
      </Card>

      {phase !== 'sent' ? (
        <Card className="flex flex-col items-center py-6 text-center">
          <button
            type="button"
            aria-label={phase === 'recording' ? 'Stop voice recording' : 'Start voice recording'}
            onClick={() => setPhase(phase === 'recording' ? 'draft' : 'recording')}
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-full text-primary-foreground transition-colors',
              phase === 'recording' ? 'animate-pulse bg-clinical-danger' : 'bg-clinical-teal hover:bg-clinical-teal-deep'
            )}
          >
            {phase === 'recording' ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </button>
          {phase === 'recording' ? <div className="mt-2 text-sm font-medium text-clinical-danger">{mmss}</div> : null}
          <div className="mt-2 text-xs text-muted-foreground">
            {phase === 'recording' ? 'Recording… tap to stop' : 'বলুন — Tap to speak in Bengali'}
          </div>
          <p className="mt-2.5 max-w-md text-[11px] text-muted-foreground">
            "সুভজিৎ পাল, ২৮ বছর, দুই দিন কাশি সর্দি, অ্যামক্সিসিলিন পাঁচশো তিনবার পাঁচ দিন..."
          </p>
        </Card>
      ) : null}

      {phase === 'draft' ? (
        <>
          <Card className="border-l-[3px] border-l-clinical-teal">
            <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-medium text-clinical-teal-ink">
              <Bot className="h-3.5 w-3.5" /> AI draft — review every field
            </div>
            <Row title="Patient" meta={<span>Subhajit Pal, 28M, Pingla <Confidence value={97} /></span>} />
            <Row title="Complaint" meta={<span>কাশি, সর্দি ২ দিন <Confidence value={94} /></span>} />
            <Row title="Diagnosis" meta={<span>URTI <Confidence value={71} /></span>} />
            <Row title="Amoxicillin 500mg" meta={<span>1 cap · 3x daily · 5 days <Confidence value={98} /></span>} avatar={<Avatar tone="teal"><Pill /></Avatar>} />
            <Row title="Benadryl Cough Syrup" meta={<span>10ml · 3x daily · 5 days <Confidence value={96} /></span>} avatar={<Avatar tone="teal"><Pill /></Avatar>} />
            <Row title="Follow-up" meta={<span className="text-clinical-amber">05 Jul 2026</span>} />
          </Card>
          <Alert tone="success" icon={<ShieldCheck aria-hidden="true" />} title="Safety check passed" body="No drug interactions · No allergy match · Dose ranges valid" />
          <ButtonRow>
            <MvpButton onClick={() => setPhase('sent')}><Check /> Confirm &amp; send</MvpButton>
            <MvpButton variant="outline"><Pencil /> Edit</MvpButton>
            <MvpButton variant="outline" onClick={() => { setSeconds(0); setPhase('recording'); }}><Mic /> Re-record</MvpButton>
          </ButtonRow>
        </>
      ) : null}

      {phase === 'sent' ? (
        <Card className="py-7 text-center">
          <CircleCheck className="mx-auto h-10 w-10 text-clinical-success" />
          <div className="mt-2 text-sm font-medium">Prescription confirmed</div>
          <div className="mb-4 text-[11px] text-muted-foreground">Doctor signed · AI drafted · Patient notified</div>
          <div className="mx-auto grid max-w-md grid-cols-2 gap-2 text-left">
            {[
              { icon: MessageCircle, label: 'WhatsApp sent' },
              { icon: FileText, label: 'PDF generated' },
              { icon: Activity, label: 'Timeline updated' },
              { icon: Building2, label: 'Pharmacy notified' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-lg border border-clinical-success/30 bg-clinical-success-soft px-2.5 py-2 text-[11px] text-clinical-success">
                <Icon className="h-3.5 w-3.5" /> {label}
              </div>
            ))}
          </div>
          <MvpButton className="mt-4" onClick={() => { setSeconds(0); setPhase('idle'); }}>New prescription</MvpButton>
        </Card>
      ) : null}
    </div>
  );
};

const Patients = () => (
  <div className="space-y-3">
    <PageHeader title="All patients" action={<MvpButton size="sm">Add patient</MvpButton>} />
    <Search placeholder="Search name, village, AmarHealth ID..." />
    <Card>
      <Row avatar={<Avatar tone="teal">RM</Avatar>} title="Ramesh Mondal" meta="45M · Pingla · Hypertension · Last: 12 Jun" action={<Badge tone="amber">Med risk</Badge>} />
      <Row avatar={<Avatar tone="blue">SR</Avatar>} title="Sita Rani Das" meta="32F · Sabang · Hypothyroidism" action={<Badge tone="success">Low risk</Badge>} />
      <Row avatar={<Avatar tone="danger">AD</Avatar>} title="Anita Das" meta="60F · Keshiary · DM Type 2 Uncontrolled" action={<Badge tone="danger">High risk</Badge>} />
      <Row avatar={<Avatar tone="amber">SP</Avatar>} title="Subhajit Pal" meta="28M · Pingla · URTI" action={<Badge tone="success">Low risk</Badge>} />
      <Row avatar={<Avatar tone="neutral">MD</Avatar>} title="Mina Das" meta="New patient · Pingla · Headache, fatigue" action={<Badge tone="blue">New</Badge>} />
    </Card>
  </div>
);

const Schedule = () => (
  <div className="space-y-3">
    <PageHeader title="Schedule · 27 Jun 2026" />
    <Card>
      <Row avatar={<span className="w-14 text-[11px] font-medium text-clinical-teal-ink">9:30 AM</span>} title="Ramesh Mondal" meta="Follow-up · Hypertension check" action={<Badge tone="teal">Confirmed</Badge>} />
      <Row avatar={<span className="w-14 text-[11px] font-medium text-clinical-danger">10:30 AM</span>} title="Anita Das" meta="Urgent · Diabetes · HbA1c review" action={<Badge tone="danger">Urgent</Badge>} />
      <Row avatar={<span className="w-14 text-[11px] font-medium text-clinical-teal-ink">11:00 AM</span>} title="Mina Das" meta="New patient · Headache, fatigue" action={<Badge tone="blue">New</Badge>} />
      <Row avatar={<span className="w-14 text-[11px] font-medium text-muted-foreground">3:30 PM</span>} title="Bablu Roy" meta="Report review · Blood test results" action={<Badge>Report</Badge>} />
      <Row avatar={<span className="w-14 text-[11px] font-medium text-muted-foreground">5:00 PM</span>} title="Raju Jana" meta="Follow-up · Cough resolution" action={<Badge tone="teal">Confirmed</Badge>} />
    </Card>
  </div>
);

const Alerts = () => (
  <div className="space-y-3">
    <PageHeader title="Clinical alerts" />
    <Alert tone="danger" icon={<AlertTriangle aria-hidden="true" />} title="Drug interaction — Anita Das" body="Metformin + Alcohol reported. Ask about alcohol consumption at next visit." />
    <Alert tone="danger" icon={<Pill aria-hidden="true" />} title="Dose concern — Sita Rani Das" body="Eltroxin 50mcg · TSH still elevated (6.2). Consider dose adjustment." />
    <Alert tone="amber" icon={<Clock aria-hidden="true" />} title="Follow-up overdue — Anita Das" body="Was due 24 Jun. HbA1c last checked 4 months ago. Call patient." />
    <SectionTitle>Drug safety checks today</SectionTitle>
    <Card>
      <Row avatar={<Avatar tone="success"><Check /></Avatar>} title="No allergy conflicts — all 32 prescriptions" meta="Allergy database cross-checked automatically" />
      <Row avatar={<Avatar tone="success"><Check /></Avatar>} title="Dose ranges validated — all prescriptions" meta="Against standard drug reference database" />
      <Row avatar={<Avatar tone="amber"><AlertCircle /></Avatar>} title="1 low-confidence AI field reviewed" meta='Diagnosis "URTI" — confidence 71% — doctor confirmed' />
    </Card>
  </div>
);

const weekBars = [40, 65, 55, 80, 100, 85, 50];

export const WeekChart = ({ values }: { values: number[] }) => (
  <Card>
    <div className="flex h-28 items-end gap-1.5">
      {values.map((h, i) => (
        <div key={i} className={cn('flex-1 rounded-t bg-clinical-teal', i === values.length - 1 && 'opacity-40')} style={{ height: `${h}%` }} />
      ))}
    </div>
    <div className="mt-1.5 flex gap-1.5 text-center text-[10px] text-muted-foreground">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <div key={d} className="flex-1">{d}</div>)}
    </div>
  </Card>
);

const Analytics = () => (
  <div className="space-y-3">
    <PageHeader title="Practice analytics" />
    <StatGrid cols={4}>
      <Stat value="135" label="Rx this month" hint="↑ 12%" />
      <Stat value="48" label="Unique patients" />
      <Stat value="₹42K" label="Est. revenue" hint="↑ 8%" />
      <Stat value="4.8★" label="Patient rating" />
    </StatGrid>
    <SectionTitle>Top conditions</SectionTitle>
    <Card>
      <Bar label="Viral Fever" value={85} valueLabel="12 cases" />
      <Bar label="Hypertension" value={57} valueLabel="8 cases" />
      <Bar label="Diabetes" value={43} valueLabel="6 cases" />
      <Bar label="Hypothyroidism" value={36} valueLabel="5 cases" />
      <Bar label="URTI" value={29} valueLabel="4 cases" />
    </Card>
    <SectionTitle>Prescriptions this week</SectionTitle>
    <WeekChart values={weekBars} />
  </div>
);

const DoctorSettings = () => (
  <div className="space-y-3">
    <PageHeader title="Doctor settings" />
    <Card>
      <Row avatar={<Avatar tone="teal"><UserRound /></Avatar>} title="Dr. Anirban Das" meta="MBBS · MCI #WB12345 · Pingla Clinic" action={<Badge tone="success">✓ Verified</Badge>} />
      <Row avatar={<Avatar tone="neutral"><Building2 /></Avatar>} title="Linked pharmacies" meta="Amar Medical Store, Jan Aushadhi Kendra" action={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
      <Row avatar={<Avatar tone="neutral"><Languages /></Avatar>} title="Voice language" meta="Bengali (বাংলা)" action={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
      <Row avatar={<Avatar tone="neutral"><Shield /></Avatar>} title="ABDM status" meta="M1 ABHA capture · M2 in progress" action={<Badge tone="amber">M1 Ready</Badge>} />
    </Card>
  </div>
);

const nav: MvpNavItem[] = [
  { id: 'home', label: 'Dashboard', icon: HomeIcon },
  { id: 'voice', label: 'Voice Rx', icon: Mic },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
  { id: 'alerts', label: 'Alerts', icon: AlertCircle, badge: 3 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

const DoctorApp = () => (
  <MvpShell
    role="Doctor"
    userName="Dr. Anirban Das"
    nav={nav}
    screens={{
      home: <Dashboard />,
      voice: <VoiceRx />,
      patients: <Patients />,
      schedule: <Schedule />,
      alerts: <Alerts />,
      analytics: <Analytics />,
      settings: <DoctorSettings />,
    }}
  />
);

export default DoctorApp;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, UserRound, Stethoscope, Pill, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const roles = [
  { id: 'patient', name: 'Patient', desc: 'Timeline, appointments, Rx', icon: UserRound, tone: 'bg-clinical-teal-soft text-clinical-teal-ink' },
  { id: 'doctor', name: 'Doctor', desc: 'Voice Rx, patients, analytics', icon: Stethoscope, tone: 'bg-clinical-blue-soft text-clinical-blue' },
  { id: 'pharmacy', name: 'Pharmacist', desc: 'Dispense, inventory, sales', icon: Pill, tone: 'bg-clinical-amber-soft text-clinical-amber' },
  { id: 'admin', name: 'Admin', desc: 'Approvals, audit, platform', icon: ShieldCheck, tone: 'bg-clinical-neutral-soft text-clinical-neutral' },
];

const MvpLanding = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="mvp flex min-h-screen flex-col items-center justify-center bg-background px-5 py-10 text-center font-inter text-foreground">
      <div className="mb-1 flex items-center gap-2.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clinical-teal text-primary-foreground">
          <HeartPulse className="h-5 w-5" />
        </span>
        <span className="text-2xl font-medium">AmarHealth</span>
      </div>
      <p className="mb-7 text-xs italic text-muted-foreground">Care. Connect. Remember.</p>

      <h1 className="mb-1.5 max-w-md text-lg font-medium leading-snug">Your health history, always with you</h1>
      <p className="mb-8 max-w-sm text-[13px] text-muted-foreground">
        AI-assisted healthcare for rural India — connecting patients, doctors, pharmacies and administrators through one lifelong health record.
      </p>

      <div className="mb-5 grid w-full max-w-md grid-cols-1 gap-2.5 sm:grid-cols-2">
        {roles.map((r) => {
          const Icon = r.icon;
          const isSel = selected === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelected(r.id)}
              className={cn(
                'rounded-xl border bg-card p-4 text-left transition-colors',
                isSel ? 'border-clinical-teal bg-clinical-teal-soft/60' : 'border-border hover:border-clinical-teal/60'
              )}
            >
              <span className={cn('mb-2 flex h-9 w-9 items-center justify-center rounded-[9px]', r.tone)}>
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <div className="text-[13px] font-medium">{r.name}</div>
              <div className="text-[11px] text-muted-foreground">{r.desc}</div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!selected}
        onClick={() => selected && navigate(`/mvp/${selected}`)}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg px-7 py-3 text-[13px] font-medium transition-all',
          selected ? 'bg-clinical-teal text-primary-foreground hover:bg-clinical-teal-deep' : 'pointer-events-none opacity-0'
        )}
      >
        Enter platform <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default MvpLanding;

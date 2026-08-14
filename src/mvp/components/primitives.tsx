import React from 'react';
import { cn } from '@/lib/utils';

/* Shared building blocks for the AmarHealth clinical MVP.
   All colors come from the `clinical` design tokens (scoped via .mvp). */

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('rounded-xl border border-border bg-card p-3.5 sm:p-4 shadow-sm', className)}>{children}</div>
);

export const SectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn('text-sm font-medium text-foreground mb-2.5', className)}>{children}</h3>
);

export const PageHeader = ({ title, action }: { title: string; action?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-3.5 gap-3">
    <h2 className="text-base font-medium text-foreground">{title}</h2>
    {action}
  </div>
);

type Tone = 'teal' | 'blue' | 'amber' | 'danger' | 'success' | 'neutral';

const toneBg: Record<Tone, string> = {
  teal: 'bg-clinical-teal-soft text-clinical-teal-ink',
  blue: 'bg-clinical-blue-soft text-clinical-blue',
  amber: 'bg-clinical-amber-soft text-clinical-amber',
  danger: 'bg-clinical-danger-soft text-clinical-danger',
  success: 'bg-clinical-success-soft text-clinical-success',
  neutral: 'bg-clinical-neutral-soft text-clinical-neutral',
};

const toneBorder: Record<Tone, string> = {
  teal: 'border-clinical-teal/30',
  blue: 'border-clinical-blue/30',
  amber: 'border-clinical-amber/30',
  danger: 'border-clinical-danger/30',
  success: 'border-clinical-success/30',
  neutral: 'border-border',
};

export const Badge = ({ tone = 'neutral', children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) => (
  <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium leading-4', toneBg[tone], className)}>
    {children}
  </span>
);

export const Alert = ({
  tone = 'teal',
  icon,
  title,
  body,
  className,
}: {
  tone?: Tone;
  icon?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('flex gap-2.5 rounded-xl border p-3', toneBg[tone], toneBorder[tone], className)}>
    {icon ? <span className="mt-0.5 shrink-0 [&_svg]:h-4 [&_svg]:w-4">{icon}</span> : null}
    <div className="min-w-0">
      <div className="text-xs font-semibold">{title}</div>
      {body ? <div className="mt-0.5 text-[11px] leading-relaxed opacity-90">{body}</div> : null}
    </div>
  </div>
);

export const Stat = ({ value, label, hint, tone }: { value: React.ReactNode; label: string; hint?: string; tone?: Tone }) => (
  <div className="rounded-xl border border-border bg-card p-3">
    <div className={cn('text-xl font-medium leading-tight', tone === 'amber' && 'text-clinical-amber', tone === 'danger' && 'text-clinical-danger', tone === 'success' && 'text-clinical-success')}>
      {value}
    </div>
    <div className="mt-0.5 text-[11px] text-muted-foreground">{label}</div>
    {hint ? <div className="mt-0.5 text-[10px] text-clinical-success">{hint}</div> : null}
  </div>
);

export const StatGrid = ({ children, cols = 4 }: { children: React.ReactNode; cols?: 2 | 3 | 4 }) => (
  <div className={cn('grid gap-2', cols === 4 ? 'grid-cols-2 lg:grid-cols-4' : cols === 3 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2')}>{children}</div>
);

export const Row = ({
  avatar,
  title,
  meta,
  action,
  className,
}: {
  avatar?: React.ReactNode;
  title: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('flex items-center gap-3 border-b border-border py-2.5 last:border-b-0', className)}>
    {avatar ? <span className="shrink-0">{avatar}</span> : null}
    <div className="min-w-0 flex-1">
      <div className="truncate text-xs font-medium text-foreground">{title}</div>
      {meta ? <div className="mt-0.5 text-[10px] text-muted-foreground">{meta}</div> : null}
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </div>
);

export const Avatar = ({ children, tone = 'teal', className }: { children: React.ReactNode; tone?: Tone; className?: string }) => (
  <span className={cn('flex h-9 w-9 items-center justify-center rounded-[10px] text-[11px] font-semibold [&_svg]:h-4 [&_svg]:w-4', toneBg[tone], className)}>
    {children}
  </span>
);

export const Tile = ({
  avatar,
  title,
  meta,
  action,
  className,
}: {
  avatar?: React.ReactNode;
  title: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('mb-1.5 flex items-center gap-2.5 rounded-[10px] border border-border bg-card px-3 py-2.5', className)}>
    {avatar ? <span className="shrink-0">{avatar}</span> : null}
    <div className="min-w-0 flex-1">
      <div className="text-xs font-medium text-foreground">{title}</div>
      {meta ? <div className="mt-0.5 text-[10px] text-muted-foreground">{meta}</div> : null}
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </div>
);

export const Toggle = ({ on, onClick, label }: { on: boolean; onClick?: () => void; label: string }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    aria-label={label}
    onClick={onClick}
    className={cn('relative h-5 w-9 shrink-0 rounded-full transition-colors', on ? 'bg-clinical-teal' : 'bg-border')}
  >
    <span className={cn('absolute top-1 h-3 w-3 rounded-full bg-card transition-all', on ? 'left-[22px]' : 'left-1')} />
  </button>
);

export const Bar = ({ label, value, max = 100, valueLabel }: { label: string; value: number; max?: number; valueLabel?: string }) => (
  <div className="mb-2.5">
    <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
      <span className="text-foreground">{label}</span>
      <span>{valueLabel ?? value}</span>
    </div>
    <div className="h-1.5 rounded-full bg-clinical-surface">
      <div className="h-full rounded-full bg-clinical-teal" style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
  </div>
);

export const Search = ({ placeholder }: { placeholder: string }) => (
  <label className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
    <span className="sr-only">{placeholder}</span>
    <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
    <input className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground" placeholder={placeholder} />
  </label>
);

export const ButtonRow = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-2.5 flex flex-wrap gap-2">{children}</div>
);

export const StepList = ({ steps }: { steps: { label: string; done?: boolean; icon?: React.ReactNode }[] }) => (
  <div className="my-2.5 flex flex-col gap-1.5">
    {steps.map((s) => (
      <div
        key={s.label}
        className={cn(
          'flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px]',
          s.done ? 'border-clinical-teal/40 bg-clinical-teal-soft text-clinical-teal-ink' : 'border-border bg-card text-muted-foreground'
        )}
      >
        {s.icon ? <span className="[&_svg]:h-3.5 [&_svg]:w-3.5">{s.icon}</span> : null}
        <span>{s.label}</span>
      </div>
    ))}
  </div>
);

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MvpNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface MvpShellProps {
  role: string;
  userName: string;
  nav: MvpNavItem[];
  screens: Record<string, React.ReactNode>;
  initial?: string;
}

const MvpShell = ({ role, userName, nav, screens, initial }: MvpShellProps) => {
  const [active, setActive] = useState(initial ?? nav[0].id);

  return (
    <div className="mvp min-h-screen bg-background text-foreground font-inter">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 bg-clinical-teal px-3 py-2.5 sm:px-4 safe-top">
        <div className="flex min-w-0 items-center gap-2">
          <HeartPulse className="h-4 w-4 text-primary-foreground" />
          <span className="truncate text-sm font-medium text-primary-foreground">AmarHealth</span>
          <span className="rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[10px] text-primary-foreground/90">{role}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-primary-foreground/85 sm:inline">{userName}</span>
          <Link
            to="/mvp"
            className="inline-flex items-center gap-1 rounded-md bg-primary-foreground/15 px-2.5 py-1.5 text-[11px] text-primary-foreground hover:bg-primary-foreground/25"
          >
            <ArrowLeftRight className="h-3 w-3" /> Switch
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <nav className="hidden w-52 shrink-0 border-r border-border bg-card p-2 md:block">
          <div className="sticky top-16 flex flex-col gap-0.5">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors',
                    active === item.id
                      ? 'bg-clinical-teal-soft font-medium text-clinical-teal-ink'
                      : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge ? (
                    <span className="rounded-full bg-clinical-danger px-1.5 text-[9px] font-medium text-primary-foreground">{item.badge}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <main className="min-w-0 flex-1 px-3 pb-24 pt-3 sm:px-5 sm:pb-8 md:pt-5">
          <div className="mx-auto max-w-3xl space-y-2 animate-fade-in">{screens[active]}</div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur safe-bottom md:hidden">
        <div className="no-scrollbar flex overflow-x-auto">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  'relative flex min-w-[72px] flex-1 flex-col items-center gap-1 px-2 py-2.5 text-[10px]',
                  active === item.id ? 'text-clinical-teal-ink' : 'text-muted-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="truncate">{item.label}</span>
                {item.badge ? (
                  <span className="absolute right-3 top-1.5 h-1.5 w-1.5 rounded-full bg-clinical-danger" />
                ) : null}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MvpShell;

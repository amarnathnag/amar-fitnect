import React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'soft' | 'danger' | 'whatsapp' | 'ghost';

const variants: Record<Variant, string> = {
  primary: 'bg-clinical-teal text-primary-foreground hover:bg-clinical-teal-deep',
  outline: 'border border-clinical-teal text-clinical-teal hover:bg-clinical-teal-soft',
  soft: 'bg-clinical-teal-soft text-clinical-teal-ink hover:bg-clinical-teal-soft/70',
  danger: 'bg-clinical-danger-soft text-clinical-danger hover:bg-clinical-danger-soft/70',
  whatsapp: 'bg-clinical-success text-primary-foreground hover:bg-clinical-success/90',
  ghost: 'text-muted-foreground hover:bg-muted',
};

interface MvpButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md';
}

const MvpButton = ({ variant = 'primary', size = 'md', className, children, ...props }: MvpButtonProps) => (
  <button
    type="button"
    className={cn(
      'inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors disabled:opacity-50 [&_svg]:h-3.5 [&_svg]:w-3.5',
      size === 'sm' ? 'px-2.5 py-1.5 text-[11px]' : 'px-4 py-2 text-xs min-h-[36px]',
      variants[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default MvpButton;

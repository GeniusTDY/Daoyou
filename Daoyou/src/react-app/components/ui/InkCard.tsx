import { cn } from '@shared/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

/**
 * InkCard
 */
const inkCardVariants = cva(
  
  'mb-3',
  {
    variants: {
      variant: {
        default: 'ink-surface',
        highlighted:
          'border-crimson/35 border-l-2 border-l-crimson',
        elevated: 'border-ink/25 bg-bgpaper',
        plain: '',
      },
      padding: {
        none: '',
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4 md:p-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  },
);

export interface InkCardProps extends VariantProps<typeof inkCardVariants> {
  children: ReactNode;
  className?: string;
  /** @deprecated  variant="highlighted"  */
  highlighted?: boolean;
}

/**
 *  -
 *
 */
export function InkCard({
  children,
  className = '',
  highlighted = false,
  variant,
  padding,
}: InkCardProps) {
  //  highlighted prop
  const effectiveVariant = highlighted ? 'highlighted' : variant;

  return (
    <div
      className={cn(
        inkCardVariants({ variant: effectiveVariant, padding }),
        className,
      )}
    >
      {children}
    </div>
  );
}

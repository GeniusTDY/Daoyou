import { cn } from '@shared/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

const inkActionGroupVariants = cva('flex gap-3 mt-4 flex-wrap', {
  variants: {
    align: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    align: 'between',
  },
});

export interface InkActionGroupProps extends VariantProps<
  typeof inkActionGroupVariants
> {
  children: ReactNode;
  className?: string;
}


export function InkActionGroup({
  children,
  align = 'between',
  className = '',
}: InkActionGroupProps) {
  return (
    <div className={cn(inkActionGroupVariants({ align }), className)}>
      {children}
    </div>
  );
}

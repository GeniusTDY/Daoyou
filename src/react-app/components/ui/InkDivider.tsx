import { cn } from '@shared/lib/cn';

export interface InkDividerProps {
  variant?: 'line' | 'symbol';
  symbol?: string;
  className?: string;
}

/**
 *
 * line:
 * symbol:  ☯
 */
export function InkDivider({
  variant = 'line',
  symbol = '☯',
  className = '',
}: InkDividerProps) {
  if (variant === 'symbol') {
    return (
      <div
        className={cn(
          'text-ink/60 my-4 text-center text-[1.2rem] tracking-widest',
          className,
        )}
      >
        {symbol.repeat(10)}
      </div>
    );
  }

  return (
    <div className={cn('text-ink/60 my-4 text-center font-mono', className)}>
      ┈┈┈┈┈┈┈┈┈┈┈┈┈┈
    </div>
  );
}

import { TypewriterOptions, useTypewriter } from '@app/lib/hooks/useTypewriter';
import { cn } from '@shared/lib/utils';

interface TypewriterTextProps extends Omit<TypewriterOptions, 'onComplete'> {
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean; 
  cursorChar?: string; 
  vertical?: boolean; 
}


export function TypewriterText({
  text,
  speed = 80,
  startDelay = 0,
  enabled = true,
  className,
  onComplete,
  showCursor = false,
  cursorChar = '▌',
  vertical = false,
}: TypewriterTextProps) {
  const { displayedText, isComplete, isRunning } = useTypewriter({
    text,
    speed,
    startDelay,
    enabled,
    onComplete,
  });

  return (
    <span
      className={cn(
        'inline-block whitespace-pre-wrap',
        vertical && '[writing-mode:vertical-rl] [text-orientation:upright]',
        className,
      )}
    >
      {displayedText}
      {showCursor && isRunning && !isComplete && (
        <span className="animate-pulse opacity-70">{cursorChar}</span>
      )}
    </span>
  );
}

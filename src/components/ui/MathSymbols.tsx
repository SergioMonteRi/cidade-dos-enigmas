const SYMBOLS = ['+', '−', '×', '÷', '△', '□', '∞', '%'];
const COLORS = ['#2EC4B6', '#F5A623', '#7B5EA7'];

interface MathSymbolsProps {
  count?: number;
}

export default function MathSymbols({ count = 12 }: MathSymbolsProps) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * 9.1 + 3) % 94}%`,
            top: `${(i * 13.7 + 5) % 88}%`,
            color: COLORS[i % COLORS.length],
            fontSize: `${1.2 + (i % 3) * 0.5}rem`,
            opacity: 0.15 + (i % 4) * 0.07,
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            userSelect: 'none',
            animation: `float ${4 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
            ['--rot' as string]: `${i * 22}deg`,
          }}
        >
          {SYMBOLS[i % SYMBOLS.length]}
        </span>
      ))}
    </div>
  );
}

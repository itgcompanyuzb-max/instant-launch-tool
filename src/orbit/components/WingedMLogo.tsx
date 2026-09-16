interface WingedMLogoProps {
  className?: string;
}

export default function WingedMLogo({ className = "w-8 h-8" }: WingedMLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Wing & Left Stem of M */}
      <path
        d="M 50 82 L 32 38 C 28 26 18 16 10 22 C 16 34 16 46 12 56 C 18 48 20 38 18 28 C 24 42 22 56 16 68 C 24 58 26 48 24 38 C 30 56 28 72 26 82 L 40 82 L 50 82 Z"
        fill="currentColor"
      />
      {/* Right Wing & Right Stem of M */}
      <path
        d="M 50 82 L 68 38 C 72 26 82 16 90 22 C 84 34 84 46 88 56 C 82 48 80 38 82 28 C 76 42 78 56 84 68 C 76 58 74 48 76 38 C 70 56 72 72 74 82 L 60 82 L 50 82 Z"
        fill="currentColor"
      />
      {/* Central Sharp M V-Shape */}
      <path
        d="M 50 82 L 35 45 L 26 82 L 36 82 L 42 58 L 50 74 L 58 58 L 64 82 L 74 82 L 65 45 L 50 82 Z"
        fill="currentColor"
      />
    </svg>
  );
}

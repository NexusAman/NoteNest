interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <a
      href="/"
      aria-label="NoteNest home"
      className={`inline-flex items-center ${className}`}
    >
      <img
        src="/images/notenest-logo.png"
        alt="NoteNest"
        className="h-13 w-auto object-contain"
      />
    </a>
  );
}
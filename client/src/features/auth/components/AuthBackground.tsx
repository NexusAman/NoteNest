import type { ReactNode } from "react";

interface AuthBackgroundProps {
  children: ReactNode;
}

const AuthBackground = ({ children }: AuthBackgroundProps) => {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-x-hidden bg-linear-to-br from-slate-50 via-blue-50 to-blue-100 px-4 py-3 sm:py-6">
      {/* Decorative background shapes */}
      <div className="pointer-events-none fixed -right-32 -top-32 h-112.5 w-112.5 rounded-full bg-blue-300/40 blur-[1px]" />

      <div className="pointer-events-none fixed -bottom-40 -left-40 h-125 w-125 rounded-full bg-blue-400/30 blur-[1px]" />

      {/* Decorative dots */}
      <div className="pointer-events-none fixed left-12 top-12 grid grid-cols-5 gap-4 opacity-60">
        {Array.from({ length: 25 }).map((_, index) => (
          <span
            key={index}
            className="h-1 w-1 rounded-full bg-blue-500"
          />
        ))}
      </div>

      <div className="pointer-events-none fixed bottom-12 right-12 grid grid-cols-5 gap-4 opacity-60">
        {Array.from({ length: 25 }).map((_, index) => (
          <span
            key={index}
            className="h-1 w-1 rounded-full bg-blue-500"
          />
        ))}
      </div>

      {/* Page content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </main>
  );
};

export default AuthBackground;
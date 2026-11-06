import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="mx-auto flex w-full max-w-115 max-h-[calc(100dvh-3rem)] flex-col rounded-2xl border border-white/80 bg-white/95 px-6 py-6 shadow-[0_12px_40px_rgba(37,99,235,0.10)] sm:px-8 sm:py-7">
      {children}
    </div>
  );
};

export default AuthCard;
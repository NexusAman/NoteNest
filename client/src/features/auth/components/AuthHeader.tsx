interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="mb-5 text-center">
      <img
        src="/images/notenest-logo.png"
        alt="NoteNest"
        className="mx-auto w-37 mb-2 h-auto object-contain"
      />

      <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h1>

      <p className="mt-2 text-sm text-slate-500 sm:text-base">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;

import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="w-full bg-white/80">
      <nav className="mx-auto flex h-15 max-w-300 items-center justify-between px-6 md:px-8">

        {/* Logo */}
        <a
          href="/"
          className="flex shrink-0 items-center"
        >
          <img
            src="/images/notenest-logo.png"
            alt="NoteNest"
            className="h-13 object-contain"
          />
        </a>

        {/* Navigation Links */}
        <div className="hidden items-center gap-9 md:flex">
          <a
            href="#features"
            className="text-[12px] font-medium text-slate-700 hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-[12px] font-medium text-slate-700 hover:text-blue-600"
          >
            How It Works
          </a>

          <a
            href="#pricing"
            className="text-[12px] font-medium text-slate-700 hover:text-blue-600"
          >
            Pricing
          </a>

          <a
            href="#faq"
            className="text-[12px] font-medium text-slate-700 hover:text-blue-600"
          >
            FAQ
          </a>
        </div>

        {/* Authentication */}
        <div className="flex items-center gap-5">
          <a
            href="/login"
            className="text-[12px] font-semibold text-blue-600 hover:text-blue-700"
          >
            Login
          </a>

          <Button
            render={<a href="/signup" />}
            className="h-8 rounded-md bg-blue-600 px-5 text-[12px] text-white shadow-none hover:bg-blue-700 py-4"
          >
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-white px-6 py-12 md:px-8">
      <div className="relative mx-auto max-w-300 overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 px-6 py-12 text-center shadow-[0_12px_35px_rgba(37,99,235,0.18)] sm:px-12">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-12 h-64 w-64 rounded-full border border-white/10" />

        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-medium text-white">
            <Sparkles className="h-3.5 w-3.5" />
            Start your journey today
          </div>

          <h2 className="mx-auto max-w-xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
            Ready to organize your thoughts?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-blue-100">
            Join NoteNest and experience a simpler way to capture and manage
            your ideas.
          </p>

          <Button
            render={<a href="/signup" />}
            className="mt-6 h-11 gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

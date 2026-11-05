import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50">
      <h1 className="text-3xl font-bold text-slate-900">
        Welcome to NoteNest
      </h1>

      <p className="text-slate-600">
        Your thoughts, one place.
      </p>

      <Button>
        Get Started Free
      </Button>
    </div>
  );
}

export default App;
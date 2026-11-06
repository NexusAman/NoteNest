import { Link } from "react-router";
import { Button } from "@/components/ui/button";

interface AuthFooterProps {
  mode: "signup" | "login";
}

const AuthFooter = ({ mode }: AuthFooterProps) => {
  const isSignup = mode === "signup";

  return (
    <div className="mt-4 space-y-4">
      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-sm text-slate-500">OR</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Google signup */}
      <Button
        type="button"
        variant="outline"
        className="h-12 w-full gap-3 border-slate-200 text-sm font-medium text-slate-900 hover:bg-slate-50"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt=""
          className="h-5 w-5"
        />

        Continue with Google
      </Button>

      {/* Navigation */}
      <p className="text-center text-sm text-slate-500">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Sign up
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthFooter;
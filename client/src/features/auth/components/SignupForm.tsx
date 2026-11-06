import { useState } from "react";
import { Mail, UserRound, Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import PasswordInput from "./PasswordInput";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordRequirements = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One letter",
      valid: /[a-zA-Z]/.test(password),
    },
    {
      label: "One number",
      valid: /\d/.test(password),
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Connect your signup API here.
    console.log({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-semibold text-slate-900">
          Name
        </label>

        <div className="relative">
          <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className="h-10 rounded-lg border-slate-200 pl-10 text-sm focus-visible:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-slate-900">
          Email
        </label>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="h-10 rounded-lg border-slate-200 pl-10 text-sm focus-visible:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-slate-900"
        >
          Password
        </label>

        <PasswordInput value={password} onChange={setPassword} />
      </div>

      {/* Password requirements */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
        {passwordRequirements.map((requirement) => (
          <div key={requirement.label} className="flex items-start gap-2">
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                requirement.valid ? "text-green-600" : "text-slate-300"
              }`}
            />

            <span
              className={
                requirement.valid ? "text-green-700" : "text-slate-500"
              }
            >
              {requirement.label}
            </span>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!passwordRequirements.every((item) => item.valid)}
        className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;

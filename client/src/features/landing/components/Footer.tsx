// import { Feather } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-white to-slate-50 px-6 pb-8 pt-5 md:px-8">
      <div className="mx-auto grid max-w-300 grid-cols-2 gap-8 sm:grid-cols-4">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-1">
          <a
            href="#home"
            className="relative mb-3 block h-7 w-28 overflow-hidden"
          >
            <img
              src="/images/notenest-logo.png"
              alt="NoteNest"
              className="absolute -left-6 -top-3 max-w-none h-13 w-auto"
            />
          </a>

          <p className="max-w-55 text-[11px] leading-[1.6] text-slate-600">
            A simple and secure notes app to capture, organize, and manage your
            ideas.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="mb-2 text-[11px] font-bold text-slate-900">Product</h3>

          <ul className="space-y-2 text-[11px] text-slate-600">
            <li>
              <a href="#features" className="hover:text-blue-600">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-blue-600">
                Pricing
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-blue-600">
                How It Works
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-2 text-[11px] font-bold text-slate-900">Company</h3>

          <ul className="space-y-2 text-[11px] text-slate-600">
            <li>
              <a href="#about" className="hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-600">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-600">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="mb-2 text-[11px] font-bold text-slate-900">Connect</h3>

          <ul className="space-y-2 text-[11px] text-slate-600">
            <li>
              <a
                href="https://github.com/NexusAman"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-blue-600"
              >
                <SiGithub className="h-3.5 w-3.5" />
                GitHub
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/nexusaman"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks, site } from "@/config/site";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { expo } from "@/lib/motion";

export function SiteNav() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (value) => setCondensed(value > 40));

  // Close the menu when the route changes, without an extra render pass.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Registration is a focused, full-screen flow with its own header.
  if (pathname.startsWith("/register")) return null;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[120] px-3 pt-3 sm:px-5 sm:pt-5">
        <motion.nav
          animate={{
            backgroundColor: condensed ? "rgba(11,11,12,0.72)" : "rgba(11,11,12,0)",
            borderColor: condensed ? "rgba(242,238,229,0.14)" : "rgba(242,238,229,0)",
            paddingTop: condensed ? 10 : 16,
            paddingBottom: condensed ? 10 : 16,
          }}
          transition={expo}
          className={cn(
            "pointer-events-auto mx-auto flex max-w-[88rem] items-center justify-between rounded-full border px-4 sm:px-6",
            condensed && "shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label={`${site.name} ${site.year} — home`}
            data-cursor="Home"
          >
            <Logo className="size-5 shrink-0" />
            <span className="label hidden sm:inline">
              {site.name} <span className="opacity-45">/ 26</span>
            </span>
            <span className="label sm:hidden">YC / 26</span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/register"
              data-cursor="Register"
              className="label inline-flex rounded-full bg-paper px-4 py-2.5 text-ink transition-colors duration-300 hover:bg-accent hover:text-white sm:px-5"
            >
              Register
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center rounded-full border border-paper/20 md:hidden"
            >
              <span className="relative block h-2.5 w-4">
                <motion.span
                  animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  transition={expo}
                  className="absolute inset-x-0 top-0 h-px bg-paper"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={expo}
                  className="absolute inset-x-0 bottom-0 h-px bg-paper"
                />
              </span>
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>{open ? <MobileMenu onClose={() => setOpen(false)} /> : null}</AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} data-cursor={String(children)} className="label group relative py-1">
      <span className="opacity-70 transition-opacity duration-300 group-hover:opacity-100">
        {children}
      </span>
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
    </Link>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 md:hidden"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="flex flex-col gap-2">
        {[...navLinks, { label: "Register", href: "/register" }].map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...expo, delay: 0.06 + index * 0.05 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="display type-md block border-b border-paper/10 py-4"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>
      <div className="label flex justify-between opacity-45">
        <span>
          {site.city} • {site.state}
        </span>
        <span>{site.dates}</span>
      </div>
    </motion.div>
  );
}

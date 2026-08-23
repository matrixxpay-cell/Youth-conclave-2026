"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/config/site";
import { QrCode, useQrMatrix } from "@/components/register/qr";
import { ActionLink } from "@/components/ui/magnetic";
import { Arrow } from "@/components/hero";
import { renderTicket } from "@/lib/ticket";
import type { Registration } from "@/lib/registration";
import { expo } from "@/lib/motion";
import { formatINR } from "@/lib/utils";

export function StepDone({ registration }: { registration: Registration }) {
  const confirmed = registration.status === "confirmed";
  const matrix = useQrMatrix(registration.id);
  const [ticketUrl, setTicketUrl] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);

  // The blob outlives the render it was made in, so revoke it on unmount.
  useEffect(() => {
    return () => {
      if (ticketUrl) URL.revokeObjectURL(ticketUrl);
    };
  }, [ticketUrl]);

  const download = async () => {
    setBuilding(true);
    try {
      const url = ticketUrl ?? (await renderTicket(registration, matrix));
      if (!url) return;
      setTicketUrl(url);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${registration.id}.png`;
      link.click();
    } finally {
      setBuilding(false);
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...expo, delay: 0.05 }}
        className="flex size-14 items-center justify-center rounded-full"
        style={{ background: confirmed ? "#12a594" : "#e4a11b" }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-6 text-ink"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        >
          <motion.path
            d="M5 12.5 10 17.5 19 7"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.svg>
      </motion.div>

      <h1 className="display type-xl mt-8">
        <span className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ ...expo, delay: 0.15 }}
          >
            {confirmed ? "You're in." : "Held for you."}
          </motion.span>
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...expo, delay: 0.35 }}
        className="mt-6 max-w-md text-lg leading-relaxed opacity-70"
      >
        {confirmed
          ? `Your pass is below. Show the QR at the gate along with the student ID you registered with.`
          : `Pay ${formatINR(registration.amount)} at the ${site.payment.cashCounter} to convert this into a confirmed pass. The reference below is all they need.`}
      </motion.p>

      {/* The pass */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...expo, delay: 0.45 }}
        className="relative mt-12 overflow-hidden rounded-3xl border border-current/12 bg-ink-soft/60 p-6 sm:p-9"
      >
        {/* Soft light sweep, once, instead of confetti */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(242,238,229,0.14), transparent)",
          }}
          initial={{ x: 0 }}
          animate={{ x: "420%" }}
          transition={{ duration: 1.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="grid gap-9 sm:grid-cols-[1fr_auto] sm:items-start">
          <div className="space-y-7">
            <div>
              <p className="label opacity-40">{site.name} {site.year}</p>
              <p className="display type-md mt-3">{registration.eventTitle}</p>
              <p className="label mt-3 opacity-45">{registration.eventCategory}</p>
            </div>

            <dl className="grid grid-cols-2 gap-6 border-t border-current/12 pt-6">
              <Detail label="Registration ID" value={registration.id} mono />
              <Detail label="Name" value={registration.name} />
              <Detail label="Amount" value={formatINR(registration.amount)} mono />
              <div>
                <dt className="label opacity-40">Status</dt>
                <dd className="mt-2.5 inline-flex items-center gap-2.5">
                  <span
                    className="pulse-dot size-1.5 rounded-full"
                    style={{ background: confirmed ? "#12a594" : "#e4a11b" }}
                  />
                  <span className="label">
                    {confirmed ? "Confirmed" : "Awaiting payment"}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="w-40 shrink-0 justify-self-start sm:w-44 sm:justify-self-end">
            <div className="rounded-2xl bg-paper p-3.5">
              <QrCode text={registration.id} />
            </div>
            <p className="label mt-3 text-center opacity-35">Gate pass</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...expo, delay: 0.6 }}
        className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
      >
        <button
          type="button"
          onClick={download}
          disabled={building}
          data-cursor="Download"
          className="label inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-paper px-7 text-ink transition-colors duration-300 hover:bg-accent hover:text-white disabled:opacity-50"
        >
          {building ? "Preparing…" : "Download confirmation"}
        </button>
        <ActionLink href="/events" variant="outline" cursorLabel="Events →" className="px-7">
          Add another event
          <Arrow />
        </ActionLink>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        className="label mt-10 opacity-35"
      >
        Keep this ID. Questions?{" "}
        <Link href={`mailto:${site.contactEmail}`} className="underline underline-offset-4">
          {site.contactEmail}
        </Link>
      </motion.p>
    </div>
  );
}

function Detail({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="label opacity-40">{label}</dt>
      <dd
        className={`mt-2.5 font-display text-lg tracking-tight sm:text-xl ${mono ? "tabular" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}

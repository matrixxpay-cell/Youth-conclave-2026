"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ConclaveEvent } from "@/data/events";
import { site } from "@/config/site";
import { QrCode } from "@/components/register/qr";
import { ActionButton } from "@/components/ui/magnetic";
import { Arrow } from "@/components/hero";
import { buildUpiUri, type PaymentMethod } from "@/lib/registration";
import { cn, formatINR } from "@/lib/utils";
import { expo } from "@/lib/motion";

export function StepPayment({
  event,
  provisionalId,
  method,
  onMethodChange,
  onBack,
  onConfirm,
}: {
  event: ConclaveEvent;
  provisionalId: string;
  method: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  onBack: () => void;
  onConfirm: (method: PaymentMethod) => void;
}) {
  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between gap-6 border-b border-current/12 pb-8">
        <div>
          <p className="label opacity-45">{event.category}</p>
          <p className="display type-md mt-3">{event.title.join(" ")}</p>
        </div>
        <p className="display text-5xl tracking-tight sm:text-6xl">
          {formatINR(event.fee)}
        </p>
      </div>

      <fieldset>
        <legend className="label opacity-50">How are you paying?</legend>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {(["upi", "cash"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={method === option}
              onClick={() => onMethodChange(option)}
              data-cursor={option === "upi" ? "Pay by UPI" : "Pay cash"}
              className={cn(
                "flex items-center gap-4 rounded-xl border px-5 py-5 text-left transition-colors duration-300",
                method === option
                  ? "border-transparent bg-paper text-ink"
                  : "border-current/15 hover:border-current/40",
              )}
            >
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border",
                  method === option ? "border-ink" : "border-current/40",
                )}
              >
                <AnimatePresence>
                  {method === option ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={expo}
                      className="size-2.5 rounded-full bg-accent"
                    />
                  ) : null}
                </AnimatePresence>
              </span>
              <span>
                <span className="label block">{option === "upi" ? "UPI" : "Cash"}</span>
                <span className="label mt-1 block opacity-45">
                  {option === "upi" ? "Scan and pay now" : "Pay at the union office"}
                </span>
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      <AnimatePresence mode="wait">
        {method === "upi" ? (
          <Panel key="upi">
            <UpiPanel event={event} provisionalId={provisionalId} onConfirm={() => onConfirm("upi")} />
          </Panel>
        ) : (
          <Panel key="cash">
            <CashPanel provisionalId={provisionalId} onConfirm={() => onConfirm("cash")} />
          </Panel>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onBack}
        data-cursor="Back"
        className="label inline-flex items-center gap-2.5 opacity-45 transition-opacity hover:opacity-100"
      >
        <Arrow className="size-3.5 rotate-180" />
        Back to details
      </button>
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function UpiPanel({
  event,
  provisionalId,
  onConfirm,
}: {
  event: ConclaveEvent;
  provisionalId: string;
  onConfirm: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [proof, setProof] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upiUri = buildUpiUri({
    upiId: site.payment.upiId,
    payeeName: site.payment.payeeName,
    amount: event.fee,
    note: provisionalId,
  });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.payment.upiId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the ID is on screen to type manually */
    }
  };

  return (
    <div className="rounded-2xl border border-current/12 p-6 sm:p-8">
      <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-10">
        <div className="mx-auto w-full max-w-[15rem] sm:mx-0 sm:w-56">
          <div className="rounded-2xl bg-paper p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
            <QrCode text={upiUri} />
          </div>
          <p className="label mt-4 text-center opacity-40 sm:text-left">Scan to pay</p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="label opacity-45">UPI ID</p>
            <p className="mt-2 font-display text-2xl tracking-tight">{site.payment.upiId}</p>
            <button
              type="button"
              onClick={copy}
              data-cursor="Copy"
              className="label mt-4 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-current/20 px-5 transition-colors duration-300 hover:border-current/50"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "copied" : "copy"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {copied ? "Copied" : "Copy UPI ID"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          <div className="space-y-4 border-t border-current/12 pt-6">
            <label className="flex cursor-pointer items-start gap-3.5">
              <input
                type="checkbox"
                checked={paid}
                onChange={(e) => setPaid(e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-[#ff4d2e]"
              />
              <span className="text-sm leading-relaxed opacity-75">
                I&rsquo;ve completed the payment of {formatINR(event.fee)} to this UPI ID.
              </span>
            </label>

            <div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,application/pdf"
                className="sr-only"
                onChange={(e) => setProof(e.target.files?.[0]?.name ?? null)}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                data-cursor="Upload"
                className="label inline-flex min-h-11 items-center gap-2.5 rounded-full border border-dashed border-current/25 px-5 transition-colors duration-300 hover:border-current/50"
              >
                {proof ? "Replace proof" : "Upload proof"}
              </button>
              {proof ? (
                <p className="label mt-3 truncate opacity-45">Attached · {proof}</p>
              ) : (
                <p className="label mt-3 opacity-35">Screenshot or PDF receipt</p>
              )}
            </div>
          </div>

          <ActionButton
            type="button"
            variant="paper"
            disabled={!paid}
            onClick={onConfirm}
            cursorLabel={paid ? "Finish →" : undefined}
            className="w-full px-8 sm:w-auto"
          >
            Confirm payment
            <Arrow />
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

function CashPanel({
  provisionalId,
  onConfirm,
}: {
  provisionalId: string;
  onConfirm: () => void;
}) {
  return (
    <div className="rounded-2xl border border-current/12 p-6 sm:p-8">
      <p className="label opacity-45">Cash payment</p>
      <p className="mt-4 max-w-md text-lg leading-relaxed opacity-80">
        Pay at the {site.payment.cashCounter}. Quote the reference below and the
        union will mark you paid.
      </p>

      <div className="mt-8 grid gap-6 border-t border-current/12 pt-6 sm:grid-cols-2">
        <div>
          <p className="label opacity-45">Provisional registration</p>
          <p className="tabular mt-2.5 font-display text-2xl tracking-tight sm:text-3xl">
            {provisionalId}
          </p>
        </div>
        <div>
          <p className="label opacity-45">Status</p>
          <p className="mt-3 inline-flex items-center gap-2.5">
            <span className="pulse-dot size-1.5 rounded-full bg-gold" />
            <span className="label">Awaiting payment</span>
          </p>
        </div>
      </div>

      <ActionButton
        type="button"
        variant="paper"
        onClick={onConfirm}
        cursorLabel="Finish →"
        className="mt-8 w-full px-8 sm:w-auto"
      >
        Hold my place
        <Arrow />
      </ActionButton>
    </div>
  );
}

"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { eventBySlug } from "@/data/events";
import { site } from "@/config/site";
import { ConclaveMark } from "@/components/logo";
import { StepProgress } from "@/components/register/progress";
import { StepDetails, type DetailErrors, type Details } from "@/components/register/step-details";
import { StepPayment } from "@/components/register/step-payment";
import { StepDone } from "@/components/register/step-done";
import {
  buildRegistrationId,
  getRegistration,
  nextSequence,
  phonePattern,
  saveRegistration,
  subscribeRegistrations,
  type PaymentMethod,
  type Registration,
} from "@/lib/registration";

const emptyDetails: Details = { name: "", phone: "", studentId: "", college: "" };

export function RegisterFlow({
  initialEventSlug,
  lookupId,
}: {
  initialEventSlug?: string;
  lookupId?: string;
}) {
  const preselected = initialEventSlug ? eventBySlug(initialEventSlug) : undefined;

  const [formStep, setFormStep] = useState(0);
  const [slug, setSlug] = useState(preselected?.slug ?? "");
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<DetailErrors>({});
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [created, setCreated] = useState<Registration | null>(null);

  const event = slug ? (eventBySlug(slug) ?? null) : null;

  // Both reads below come from the registration store rather than an effect,
  // so the server renders the empty case and the client fills it in on hydration.
  const sequence = useSyncExternalStore(
    subscribeRegistrations,
    nextSequence,
    () => null,
  );

  // `/register?ref=YC26-…` reopens a pass saved on this device.
  const storedSnapshot = useCallback(
    () => (lookupId ? getRegistration(lookupId) : null),
    [lookupId],
  );
  const stored = useSyncExternalStore(subscribeRegistrations, storedSnapshot, () => null);

  const registration = created ?? stored;
  // Having a registration *is* being on the final step — no extra state for it.
  const step = registration ? 2 : formStep;

  const provisionalId = useMemo(
    () => (event && sequence !== null ? buildRegistrationId(event, sequence) : "YC26-••••-•••••"),
    [event, sequence],
  );

  const validate = () => {
    const next: DetailErrors = {};
    if (!event) next.event = "Pick an event to continue.";
    if (details.name.trim().length < 2) next.name = "Tell us your name.";
    if (!phonePattern.test(details.phone)) next.phone = "Enter a 10-digit mobile number.";
    if (details.studentId.trim().length < 3) next.studentId = "Your college ID number.";
    if (details.college.trim().length < 2) next.college = "Where do you study?";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const confirm = (chosen: PaymentMethod) => {
    if (!event || sequence === null) return;
    const record: Registration = {
      id: buildRegistrationId(event, sequence),
      eventSlug: event.slug,
      eventTitle: event.title.join(" "),
      eventCategory: event.category,
      name: details.name.trim(),
      phone: details.phone,
      studentId: details.studentId.trim(),
      college: details.college.trim(),
      amount: event.fee,
      method: chosen,
      // UPI clears immediately; cash stays provisional until the union marks it
      // paid. Swap this for the API's response once registrations are served.
      status: chosen === "upi" ? "confirmed" : "awaiting_payment",
      createdAt: new Date().toISOString(),
    };
    saveRegistration(record);
    setCreated(record);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-[100svh] px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between gap-6 border-b border-current/12 pb-7">
          <Link href="/" data-cursor="Home" className="flex items-center gap-2.5">
            <ConclaveMark className="size-5" />
            <span className="label hidden sm:inline">
              {site.name} <span className="opacity-45">/ 26</span>
            </span>
            <span className="label sm:hidden">YC / 26</span>
          </Link>
          <StepProgress current={step} />
        </header>

        <div className="pt-12 sm:pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 ? (
                <>
                  <StepHeading index="01" title="Your details" />
                  <StepDetails
                    details={details}
                    errors={errors}
                    selected={event}
                    locked={Boolean(preselected)}
                    onChange={(patch) => {
                      setDetails((current) => ({ ...current, ...patch }));
                      setErrors((current) => {
                        const next = { ...current };
                        for (const key of Object.keys(patch) as (keyof Details)[]) {
                          delete next[key];
                        }
                        return next;
                      });
                    }}
                    onSelectEvent={(value) => {
                      setSlug(value);
                      setErrors((current) => ({ ...current, event: undefined }));
                    }}
                    onSubmit={() => {
                      if (validate()) setFormStep(1);
                    }}
                  />
                  {preselected ? (
                    <p className="label mt-10 opacity-35">
                      Registering for {preselected.title.join(" ")} ·{" "}
                      <Link href="/register" className="underline underline-offset-4">
                        change event
                      </Link>
                    </p>
                  ) : null}
                </>
              ) : null}

              {step === 1 && event ? (
                <>
                  <StepHeading index="02" title="Payment" />
                  <StepPayment
                    event={event}
                    provisionalId={provisionalId}
                    method={method}
                    onMethodChange={setMethod}
                    onBack={() => setFormStep(0)}
                    onConfirm={confirm}
                  />
                </>
              ) : null}

              {step === 2 && registration ? (
                <StepDone registration={registration} />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StepHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 sm:mb-14">
      <p className="label tabular text-accent">{index}</p>
      <h1 className="display type-md mt-3">{title}</h1>
    </div>
  );
}

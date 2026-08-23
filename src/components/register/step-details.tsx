"use client";

import { motion } from "framer-motion";
import type { ConclaveEvent } from "@/data/events";
import { events } from "@/data/events";
import { Field } from "@/components/register/field";
import { ActionButton } from "@/components/ui/magnetic";
import { Arrow } from "@/components/hero";
import { cn } from "@/lib/utils";
import { expo } from "@/lib/motion";

export type Details = {
  name: string;
  phone: string;
  studentId: string;
  college: string;
};

export type DetailErrors = Partial<Record<keyof Details | "event", string>>;

export function StepDetails({
  details,
  errors,
  selected,
  locked,
  onChange,
  onSelectEvent,
  onSubmit,
}: {
  details: Details;
  errors: DetailErrors;
  selected: ConclaveEvent | null;
  locked: boolean;
  onChange: (patch: Partial<Details>) => void;
  onSelectEvent: (slug: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="space-y-12"
    >
      {!locked ? (
        <fieldset>
          <legend className="label opacity-50">Which event?</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {events.map((event) => {
              const isSelected = selected?.slug === event.slug;
              return (
                <button
                  key={event.slug}
                  type="button"
                  onClick={() => onSelectEvent(event.slug)}
                  aria-pressed={isSelected}
                  data-cursor={event.title.join(" ")}
                  className={cn(
                    "group relative flex items-center gap-4 rounded-xl border px-4 py-4 text-left transition-colors duration-300",
                    isSelected
                      ? "border-transparent bg-paper text-ink"
                      : "border-current/15 hover:border-current/40",
                  )}
                >
                  <span className="label tabular opacity-40">{event.index}</span>
                  <span className="flex-1">
                    <span className="block font-display text-lg tracking-tight">
                      {event.title.join(" ")}
                    </span>
                    <span className="label mt-1 block opacity-45">{event.category}</span>
                  </span>
                  <motion.span
                    className="size-2.5 rounded-full"
                    initial={false}
                    animate={{
                      backgroundColor: isSelected ? event.accent : "rgba(242,238,229,0.18)",
                      scale: isSelected ? 1 : 0.7,
                    }}
                    transition={expo}
                  />
                </button>
              );
            })}
          </div>
          {errors.event ? <p className="label mt-3 text-accent">{errors.event}</p> : null}
        </fieldset>
      ) : null}

      <div className="grid gap-9 sm:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Ananya Baruah"
          value={details.name}
          error={errors.name}
          onChange={(event) => onChange({ name: event.target.value })}
          className="sm:col-span-2"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          placeholder="98XXXXXXXX"
          hint="10 digits"
          value={details.phone}
          error={errors.phone}
          onChange={(event) =>
            onChange({ phone: event.target.value.replace(/\D/g, "").slice(0, 10) })
          }
        />
        <Field
          label="Student ID"
          name="studentId"
          autoComplete="off"
          placeholder="BBC/2024/1183"
          value={details.studentId}
          error={errors.studentId}
          onChange={(event) => onChange({ studentId: event.target.value })}
        />
        <Field
          label="College"
          name="college"
          autoComplete="organization"
          placeholder="B. Borooah College"
          value={details.college}
          error={errors.college}
          onChange={(event) => onChange({ college: event.target.value })}
          className="sm:col-span-2"
        />
      </div>

      <div className="flex items-center justify-between gap-6">
        <p className="label max-w-[16rem] leading-relaxed opacity-35">
          Bring the same student ID to the gate.
        </p>
        <ActionButton type="submit" variant="paper" cursorLabel="Continue →" className="px-8">
          Continue
          <Arrow />
        </ActionButton>
      </div>
    </form>
  );
}

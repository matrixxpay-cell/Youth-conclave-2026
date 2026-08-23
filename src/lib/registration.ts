import type { ConclaveEvent } from "@/data/events";

export type PaymentMethod = "upi" | "cash";
export type RegistrationStatus = "awaiting_payment" | "verifying" | "confirmed";

export type Registration = {
  id: string;
  eventSlug: string;
  eventTitle: string;
  eventCategory: string;
  name: string;
  phone: string;
  studentId: string;
  college: string;
  amount: number;
  method: PaymentMethod;
  status: RegistrationStatus;
  createdAt: string;
};

const STORAGE_KEY = "yc26.registrations";

/**
 * Tiny external store over localStorage. Snapshots are cached so repeated reads
 * hand back the same object references — which is what `useSyncExternalStore`
 * needs to avoid re-rendering forever. Swap the read/write pair for the
 * registrations API and every caller keeps working.
 */
let cache: Registration[] | null = null;
const listeners = new Set<() => void>();

function all(): Registration[] {
  if (cache) return cache;
  if (typeof window === "undefined") return (cache = []);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as Registration[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function commit(records: Registration[]) {
  cache = records;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    /* private mode / storage disabled — the flow still completes in memory */
  }
  listeners.forEach((listener) => listener());
}

export function subscribeRegistrations(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Registration IDs look like YC26-FAR-00421.
 * The counter is local to this browser — point `nextSequence` at a server
 * sequence when the registrations API lands, and nothing else has to change.
 */
export function buildRegistrationId(event: ConclaveEvent, sequence: number) {
  return `YC26-${event.code}-${String(sequence).padStart(5, "0")}`;
}

export function nextSequence() {
  return 420 + all().length + 1;
}

export function saveRegistration(record: Registration) {
  commit([...all().filter((item) => item.id !== record.id), record]);
  return record;
}

export function getRegistration(id: string) {
  return all().find((item) => item.id === id) ?? null;
}

/** `upi://` intent string — what the payment QR encodes. */
export function buildUpiUri(input: {
  upiId: string;
  payeeName: string;
  amount: number;
  note: string;
}) {
  const params = new URLSearchParams({
    pa: input.upiId,
    pn: input.payeeName,
    am: input.amount.toFixed(2),
    cu: "INR",
    tn: input.note,
  });
  return `upi://pay?${params.toString()}`;
}

export const phonePattern = /^[6-9]\d{9}$/;

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type QrMatrix = { size: number; get: (x: number, y: number) => boolean };

/**
 * Builds the QR module matrix with `qrcode`, loaded lazily so the encoder
 * never lands in the initial bundle — it is only needed on the payment step.
 */
export function useQrMatrix(text: string | null) {
  const [encoded, setEncoded] = useState<{ text: string; matrix: QrMatrix } | null>(null);

  useEffect(() => {
    if (!text) return;
    let cancelled = false;
    import("qrcode")
      .then(({ create }) => {
        if (cancelled) return;
        const qr = create(text, { errorCorrectionLevel: "M" });
        const { size, data } = qr.modules;
        setEncoded({
          text,
          matrix: { size, get: (x, y) => data[y * size + x] === 1 },
        });
      })
      .catch(() => {
        /* leave the placeholder in place rather than a broken code */
      });
    return () => {
      cancelled = true;
    };
  }, [text]);

  // Guard against showing a code for text we have already moved on from.
  return encoded && encoded.text === text ? encoded.matrix : null;
}

export function QrCode({
  text,
  className,
  foreground = "#0b0b0c",
}: {
  text: string;
  className?: string;
  foreground?: string;
}) {
  const matrix = useQrMatrix(text);

  if (!matrix) {
    return (
      <div
        className={cn("aspect-square w-full animate-pulse rounded-lg bg-ink/10", className)}
        aria-hidden
      />
    );
  }

  const cells: React.JSX.Element[] = [];
  for (let y = 0; y < matrix.size; y += 1) {
    for (let x = 0; x < matrix.size; x += 1) {
      if (!matrix.get(x, y)) continue;
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x + 0.07}
          y={y + 0.07}
          width={0.86}
          height={0.86}
          rx={0.3}
          fill={foreground}
        />,
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${matrix.size} ${matrix.size}`}
      shapeRendering="geometricPrecision"
      className={cn("size-full", className)}
      role="img"
      aria-label="QR code"
    >
      {cells}
    </svg>
  );
}

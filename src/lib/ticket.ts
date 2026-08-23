import type { QrMatrix } from "@/components/register/qr";
import type { Registration } from "@/lib/registration";
import { site } from "@/config/site";

const W = 1080;
const H = 1500;

/**
 * Renders the confirmation pass straight onto a canvas and hands back a PNG
 * blob URL. Drawing it here (rather than shipping an image) keeps the pass in
 * sync with the record and needs no server round trip.
 */
export async function renderTicket(
  registration: Registration,
  matrix: QrMatrix | null,
): Promise<string | null> {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Webfonts must be resolved before fillText, or the pass falls back to system type.
  try {
    await document.fonts.ready;
  } catch {
    /* older browsers: fall back to whatever is available */
  }

  const ink = "#0b0b0c";
  const paper = "#f2eee5";
  const accent = "#ff4d2e";
  const display = (size: number, weight = 700) =>
    `${weight} ${size}px "Space Grotesk", "Inter Tight", system-ui, sans-serif`;
  const mono = (size: number) =>
    `500 ${size}px "Inter Tight", ui-monospace, system-ui, sans-serif`;

  ctx.fillStyle = ink;
  ctx.fillRect(0, 0, W, H);

  // Corner glow
  const glow = ctx.createRadialGradient(W, 0, 0, W, 0, W * 0.9);
  glow.addColorStop(0, "rgba(255,77,46,0.28)");
  glow.addColorStop(1, "rgba(255,77,46,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  const pad = 88;
  let y = 150;

  ctx.fillStyle = paper;
  ctx.font = mono(26);
  ctx.letterSpacing = "5px";
  ctx.globalAlpha = 0.5;
  ctx.fillText(`${site.college.toUpperCase()} ${site.collegeSuffix.toUpperCase()}`, pad, y);
  ctx.globalAlpha = 1;

  y += 96;
  ctx.font = display(96);
  ctx.letterSpacing = "-3px";
  ctx.fillText(site.name.toUpperCase(), pad, y);
  y += 96;
  ctx.fillStyle = accent;
  ctx.fillText(site.year, pad, y);

  y += 78;
  ctx.strokeStyle = "rgba(242,238,229,0.18)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, y);
  ctx.lineTo(W - pad, y);
  ctx.stroke();

  const field = (label: string, value: string, top: number, size = 46) => {
    ctx.letterSpacing = "5px";
    ctx.font = mono(24);
    ctx.fillStyle = paper;
    ctx.globalAlpha = 0.4;
    ctx.fillText(label.toUpperCase(), pad, top);
    ctx.globalAlpha = 1;
    ctx.letterSpacing = "-1px";
    ctx.font = display(size, 600);
    ctx.fillText(value, pad, top + size + 16);
  };

  y += 76;
  field("Event", registration.eventTitle, y, 52);
  y += 150;
  field("Name", registration.name, y);
  y += 138;
  field("Registration ID", registration.id, y);
  y += 138;
  field(
    "Status",
    registration.status === "confirmed" ? "Confirmed" : "Awaiting payment",
    y,
  );

  // QR block, bottom-right on a paper plate
  if (matrix) {
    const plate = 340;
    const px = W - pad - plate;
    const py = H - pad - plate - 40;
    ctx.fillStyle = paper;
    ctx.beginPath();
    ctx.roundRect(px, py, plate, plate, 26);
    ctx.fill();

    const inset = 30;
    const cell = (plate - inset * 2) / matrix.size;
    ctx.fillStyle = ink;
    for (let my = 0; my < matrix.size; my += 1) {
      for (let mx = 0; mx < matrix.size; mx += 1) {
        if (!matrix.get(mx, my)) continue;
        ctx.fillRect(
          px + inset + mx * cell,
          py + inset + my * cell,
          cell * 0.92,
          cell * 0.92,
        );
      }
    }
  }

  ctx.fillStyle = paper;
  ctx.globalAlpha = 0.4;
  ctx.letterSpacing = "5px";
  ctx.font = mono(24);
  ctx.fillText(site.dates.toUpperCase(), pad, H - pad - 40);
  ctx.fillText(`${site.city.toUpperCase()} · ${site.state.toUpperCase()}`, pad, H - pad);
  ctx.globalAlpha = 1;
  ctx.letterSpacing = "0px";

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob ? URL.createObjectURL(blob) : null), "image/png");
  });
}

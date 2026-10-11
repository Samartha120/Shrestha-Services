/*
  Minimal magic-byte sniffing for the upload allowlist. Confirms a file's real
  type from its leading bytes instead of trusting the client Content-Type or
  extension. Returns a coarse category we can cross-check against the declared
  MIME, or null when unrecognised.
*/
export type SniffCategory = "image" | "pdf" | "zip" | "text" | null;

export function sniff(buffer: Buffer): SniffCategory {
  if (buffer.length < 4) return null;
  const b = buffer;

  // Images
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image"; // JPEG
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image"; // PNG
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return "image"; // GIF
  if (
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
    b.length >= 12 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
  ) return "image"; // WEBP (RIFF....WEBP)

  // PDF: %PDF
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) return "pdf";

  // ZIP (also DOCX): PK\x03\x04 / PK\x05\x06 / PK\x07\x08
  if (b[0] === 0x50 && b[1] === 0x4b && (b[2] === 0x03 || b[2] === 0x05 || b[2] === 0x07)) return "zip";

  return null;
}

// Map a declared MIME to the category we expect its bytes to sniff as.
export function expectedCategory(mime: string): SniffCategory {
  if (mime.startsWith("image/")) return "image";
  if (mime === "application/pdf") return "pdf";
  if (mime === "application/zip" || mime === "application/x-zip-compressed") return "zip";
  if (
    mime === "application/msword" ||
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) return "zip"; // .docx is a zip container; .doc is OLE (allowed through)
  if (mime === "text/plain") return "text";
  return null;
}

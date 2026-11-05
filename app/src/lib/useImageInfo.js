import { useEffect, useState } from "react";

// Byte size and MIME type of a base64 data URI, without decoding it
const dataUriInfo = (src) => {
  const match = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(src);
  if (!match) return null;
  const [, type = "", isBase64, data] = match;
  if (!isBase64) return { type, bytes: data.length };
  const padding = data.endsWith("==") ? 2 : data.endsWith("=") ? 1 : 0;
  return { type, bytes: Math.floor((data.length * 3) / 4) - padding };
};

/**
 * Loads an image and reports what the audit needs to know about it:
 * { status: "none" | "loading" | "ok" | "error", width, height, bytes, type }
 * bytes and type are only known for data URIs and same-origin images.
 */
export function useImageInfo(src) {
  const [info, setInfo] = useState({ status: "none" });

  useEffect(() => {
    if (!src) {
      setInfo({ status: "none" });
      return;
    }

    let cancelled = false;
    setInfo({ status: "loading" });

    const img = new Image();
    img.onload = async () => {
      let file = dataUriInfo(src);
      if (!file) {
        try {
          const res = await fetch(src);
          const blob = await res.blob();
          file = { type: blob.type, bytes: blob.size };
        } catch {
          file = {}; // cross-origin: size and type unknown
        }
      }
      if (!cancelled) {
        setInfo({
          status: "ok",
          width: img.naturalWidth,
          height: img.naturalHeight,
          ...file,
        });
      }
    };
    img.onerror = () => {
      if (!cancelled) setInfo({ status: "error" });
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  return info;
}

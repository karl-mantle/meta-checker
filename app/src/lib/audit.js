import { decodeHtmlEntities } from "./normaliseMeta.js";

/*
 * Meta tag audit. Returns a list of findings, errors first:
 *   { level: "error" | "warning" | "good", title, tag, detail }
 *
 * Length limits are the common guidance for search results and social
 * previews; platforms change them without notice, so treat them as rules
 * of thumb.
 */

const LIMITS = {
  pageTitle: { min: 30, max: 60 },
  ogTitle: 60,
  ogDescription: 125,
  metaDescription: 160,
  xTitle: 70,
  xDescription: 200,
  imageMinWidth: 600,
};

const IDEAL_RATIO = 1.91; // 1200x630
const RATIO_TOLERANCE = 0.03; // within 3%

const LEVEL_ORDER = { error: 0, warning: 1, good: 2 };

const text = (value) => decodeHtmlEntities(value || "").trim();
const chars = (n) => `${n} character${n === 1 ? "" : "s"}`;
const kb = (bytes) =>
  bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const finding = (level, title, tag, detail) => ({ level, title, tag, detail });

function checkPageTitle(meta) {
  const title = text(meta.title);
  if (!title) {
    return [
      finding(
        "error",
        "Page title is missing",
        "title",
        "No <title> was found. Search results and some previews rely on it.",
      ),
    ];
  }
  const n = title.length;
  if (n < LIMITS.pageTitle.min) {
    return [
      finding(
        "warning",
        "Page title is short",
        "title",
        `${chars(n)} — aim for 50–60 characters to use the search result space well.`,
      ),
    ];
  }
  if (n > LIMITS.pageTitle.max) {
    return [
      finding(
        "warning",
        "Page title is too long",
        "title",
        `${chars(n)} — Google typically truncates titles around 60 characters.`,
      ),
    ];
  }
  return [
    finding(
      "good",
      "Page title length",
      "title",
      `${chars(n)} — within the 50–60 character target.`,
    ),
  ];
}

function checkOgTitle(meta) {
  const title = text(meta.ogTitle);
  if (!title) {
    return [
      text(meta.title)
        ? finding(
            "warning",
            "og:title is missing",
            "og:title",
            "Previews will fall back to the page title, which may not suit sharing.",
          )
        : finding(
            "error",
            "Title is missing",
            "og:title",
            "Neither og:title nor <title> was found, so previews have no headline.",
          ),
    ];
  }
  const n = title.length;
  return [
    finding("good", "Title is present", "og:title", `"${title}" — ${chars(n)}.`),
    n > LIMITS.ogTitle
      ? finding(
          "warning",
          "Title is too long",
          "og:title",
          `${chars(n)} — most previews cut titles off around 60 characters.`,
        )
      : finding(
          "good",
          "Title length",
          "og:title",
          `${chars(n)} — within the 60-character target.`,
        ),
  ];
}

function checkOgDescription(meta) {
  const description = text(meta.ogDescription);
  if (!description) {
    return [
      finding(
        "warning",
        "Description is missing",
        "og:description",
        text(meta.description)
          ? "Previews will fall back to the meta description."
          : "No description was found, so previews show only the title.",
      ),
    ];
  }
  const n = description.length;
  return [
    n > LIMITS.ogDescription
      ? finding(
          "warning",
          "Description is too long",
          "og:description",
          `${chars(n)} — social previews often show ~125 characters and may truncate on mobile.`,
        )
      : finding(
          "good",
          "Description length",
          "og:description",
          `${chars(n)} — fits most social previews.`,
        ),
  ];
}

function checkMetaDescription(meta) {
  const description = text(meta.description);
  if (!description) {
    return [
      finding(
        "warning",
        "Meta description is missing",
        "description",
        "Search engines will pick a snippet from the page instead.",
      ),
    ];
  }
  const n = description.length;
  return [
    n > LIMITS.metaDescription
      ? finding(
          "warning",
          "Meta description is too long",
          "description",
          `${chars(n)} — Google typically truncates around 150–160 characters in search results.`,
        )
      : finding(
          "good",
          "Meta description length",
          "description",
          `${chars(n)} — within the 160-character target.`,
        ),
  ];
}

function checkImage(meta, image) {
  if (!meta.ogImage) {
    return [
      finding(
        "error",
        "Image is missing",
        "og:image",
        "No og:image was found. Most platforms will show a text-only card.",
      ),
    ];
  }

  const results = [];
  const isDataOrLocal =
    meta.ogImage.startsWith("data:") || meta.ogImage.startsWith("/");
  if (!meta.ogImageBase64 && !isDataOrLocal) {
    results.push(
      finding(
        "warning",
        "Image could not be fetched",
        "og:image",
        "The checker couldn't download the image (or it's over 2 MB). Platforms may fail to fetch it too.",
      ),
    );
  }

  if (image.status === "error") {
    results.push(
      finding(
        "error",
        "Image failed to load",
        "og:image",
        `${meta.ogImage} didn't load as an image.`,
      ),
    );
    return results;
  }
  if (image.status !== "ok") return results;

  const { width, height, bytes, type } = image;
  const ratio = width / height;
  const size = `${width}×${height}`;

  results.push(
    finding(
      "good",
      "Image loads cleanly",
      "og:image",
      bytes ? `${kb(bytes)} ${type || "image"}, ${size}` : size,
    ),
  );

  results.push(
    Math.abs(ratio - IDEAL_RATIO) / IDEAL_RATIO <= RATIO_TOLERANCE
      ? finding(
          "good",
          "Image aspect ratio",
          "og:image",
          `${size} — matches the 1.91:1 most platforms expect.`,
        )
      : finding(
          "error",
          "Image aspect ratio is wrong",
          "og:image",
          `Detected ${size} — most platforms expect 1.91:1 (1200×630). The card may be cropped or letterboxed.`,
        ),
  );

  if (width < LIMITS.imageMinWidth) {
    results.push(
      finding(
        "warning",
        "Image is small",
        "og:image",
        `${width}px wide — use at least 1200×630 so it stays sharp on large cards.`,
      ),
    );
  }

  return results;
}

function checkX(meta) {
  const results = [];

  // twitter:card is only checked once the API returns it
  if (meta.twitterCard !== undefined) {
    const card = (meta.twitterCard || "").trim();
    results.push(
      card === "summary_large_image"
        ? finding(
            "good",
            "X card uses a large image",
            "twitter:card",
            "summary_large_image is set, so X can render the image at full card width.",
          )
        : finding(
            "warning",
            card ? "X card uses a small image" : "X card type is missing",
            "twitter:card",
            card
              ? `"${card}" shows a small thumbnail. Use summary_large_image for a full-width image.`
              : "Without twitter:card, X shows a small summary card.",
          ),
    );
  }

  const title = text(meta.twitterTitle);
  if (title) {
    results.push(
      title.length > LIMITS.xTitle
        ? finding(
            "warning",
            "X title is too long",
            "twitter:title",
            `${chars(title.length)} — X may truncate titles over ~70 characters.`,
          )
        : finding(
            "good",
            "X title is present",
            "twitter:title",
            `${chars(title.length)} — within the recommended range.`,
          ),
    );
  } else if (text(meta.ogTitle)) {
    results.push(
      finding(
        "good",
        "X title falls back to og:title",
        "twitter:title",
        "twitter:title isn't set, so X uses og:title.",
      ),
    );
  }

  const description = text(meta.twitterDescription);
  if (description) {
    results.push(
      description.length > LIMITS.xDescription
        ? finding(
            "warning",
            "X description is too long",
            "twitter:description",
            `${chars(description.length)} — X may truncate descriptions over ~200 characters.`,
          )
        : finding(
            "good",
            "X description length",
            "twitter:description",
            `${chars(description.length)} — within the 200-character target.`,
          ),
    );
  } else if (text(meta.ogDescription)) {
    results.push(
      finding(
        "good",
        "X description falls back to og:description",
        "twitter:description",
        "twitter:description isn't set, so X uses og:description.",
      ),
    );
  }

  if (meta.twitterImage) {
    results.push(
      finding(
        "good",
        "X image is present",
        "twitter:image",
        "twitter:image is set and can be used for the X preview.",
      ),
    );
  } else if (meta.ogImage) {
    results.push(
      finding(
        "good",
        "X image falls back to og:image",
        "twitter:image",
        "twitter:image isn't set, so X uses og:image.",
      ),
    );
  }

  return results;
}

function checkSiteName(meta) {
  // only checked once the API returns og:site_name
  if (meta.ogSiteName === undefined) return [];
  const name = text(meta.ogSiteName);
  return [
    name
      ? finding(
          "good",
          "Site name is set",
          "og:site_name",
          `"${name}" — Facebook, Discord and others show it with the preview.`,
        )
      : finding(
          "warning",
          "Site name is missing",
          "og:site_name",
          "Some platforms show the site name above the title; they'll use the domain instead.",
        ),
  ];
}

export function auditMeta(meta, image) {
  return [
    ...checkImage(meta, image),
    ...checkOgTitle(meta),
    ...checkOgDescription(meta),
    ...checkPageTitle(meta),
    ...checkMetaDescription(meta),
    ...checkX(meta),
    ...checkSiteName(meta),
  ].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
}

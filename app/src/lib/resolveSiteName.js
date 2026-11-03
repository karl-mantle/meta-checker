export const resolveSiteName = (url) => {
  if (!url) return "";

  try {
    const target = url.startsWith("http")
      ? new URL(url)
      : new URL(`https://${url}`);

    return target.host;
  } catch {
    return "";
  }
};

// Domain as chat and social apps show it: no "www." prefix, with a
// placeholder when the URL can't be parsed.
export const resolveDisplayDomain = (url) =>
  resolveSiteName(url).replace(/^www\./i, "") || "example.com";

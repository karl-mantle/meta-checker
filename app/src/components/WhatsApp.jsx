import { useState } from "react";
import { normaliseMeta } from "../lib/normaliseMeta";
import { resolveDisplayDomain } from "../lib/resolveSiteName";
import PreviewFrame from "./PreviewFrame.jsx";
import styles from "./WhatsApp.module.css";

export default function WhatsApp({ meta, url }) {
  const { title, description, image, favicon } = normaliseMeta(meta);
  const domain = resolveDisplayDomain(url);
  // Remember which favicon URL failed so a new URL gets a fresh try
  const [failedFavicon, setFailedFavicon] = useState(null);

  return (
    <PreviewFrame label="WhatsApp chat link preview" maxWidth={340}>
      <div className={styles.root}>
        {image && <img src={image} alt="" className={styles.image} />}
        <div className={styles.body}>
          <div className={styles.title}>{title || domain}</div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
          <div className={styles.footer}>
            <div className={styles.domain}>{domain}</div>
            {favicon && favicon !== failedFavicon && (
              <img
                src={favicon}
                alt=""
                className={styles.favicon}
                onError={() => setFailedFavicon(favicon)}
              />
            )}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

import { normaliseMeta } from "../lib/normaliseMeta";
import { resolveSiteName } from "../lib/resolveSiteName";
import PreviewFrame from "./PreviewFrame.jsx";
import styles from "./WhatsApp.module.css";

const timeNow = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function WhatsApp({ meta, url }) {
  const { title, description, image } = normaliseMeta(meta);
  // WhatsApp keeps the full host, e.g. "www.bbc.co.uk"
  const domain = resolveSiteName(url) || "example.com";

  return (
    <PreviewFrame label="WhatsApp chat link preview" maxWidth={344}>
      <div className={styles.root}>
        <div className={styles.preview}>
          {image && <img src={image} alt="" className={styles.image} />}
          <div className={styles.body}>
            <div className={styles.title}>{title || domain}</div>
            {description && (
              <div className={styles.description}>{description}</div>
            )}
            <div className={styles.domain}>{domain}</div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.link}>{url}</div>
          <div className={styles.meta}>
            {timeNow()}
            <svg
              className={styles.ticks}
              viewBox="0 0 16 11"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 6l3 3 6-7M7 8.5l.5.5 6-7" />
            </svg>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

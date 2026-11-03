import { normaliseMeta } from "../lib/normaliseMeta";
import { resolveDisplayDomain } from "../lib/resolveSiteName";
import PreviewFrame from "./PreviewFrame.jsx";
import styles from "./Teams.module.css";

export default function Teams({ meta, url }) {
  const { title, description, image } = normaliseMeta(meta);
  const domain = resolveDisplayDomain(url);

  return (
    <PreviewFrame label="Teams chat link preview" maxWidth={628}>
      <div className={styles.root}>
        {image && <img src={image} alt="" className={styles.image} />}
        <div className={styles.box}>
          <div className={styles.title} title={title}>
            {title || domain}
          </div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
          <div className={styles.domain}>{domain}</div>
          <svg
            className={styles.close}
            viewBox="0 0 14 14"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </div>
      </div>
    </PreviewFrame>
  );
}

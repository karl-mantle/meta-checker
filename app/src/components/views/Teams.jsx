import { normaliseMeta } from "../../lib/normaliseMeta.js";
import { resolveDisplayDomain } from "../../lib/resolveSiteName.js";
import PreviewFrame from "../PreviewFrame.jsx";
import styles from "./Teams.module.css";

export default function Teams({ meta, url }) {
  const { title, description, image } = normaliseMeta(meta);
  const domain = resolveDisplayDomain(url);

  return (
    <PreviewFrame label="Teams chat link preview">
      <div className={styles.root}>
        <div className={styles.link}>{url}</div>
        <div className={styles.card}>
          {image && <img src={image} alt="" className={styles.image} />}
          <div className={styles.body}>
            <div className={styles.title} title={title}>
              {title || domain}
            </div>
            {description && (
              <div className={styles.description}>{description}</div>
            )}
            <div className={styles.domain}>{domain}</div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

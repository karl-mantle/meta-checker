import { normaliseMeta } from "../../lib/normaliseMeta.js";
import { resolveDisplayDomain } from "../../lib/resolveSiteName.js";
import PreviewFrame from "../PreviewFrame.jsx";
import styles from "./LinkedIn.module.css";

export default function LinkedIn({ meta, url }) {
  const { title, image } = normaliseMeta(meta);
  const domain = resolveDisplayDomain(url);

  return (
    <PreviewFrame label="LinkedIn feed post" maxWidth={526}>
      <div className={styles.root}>
        {image && <img src={image} alt="" className={styles.image} />}
        <div className={styles.body}>
          <div className={styles.title}>{title || domain}</div>
          <div className={styles.domain}>{domain}</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

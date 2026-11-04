import { normaliseMeta } from "../../lib/normaliseMeta.js";
import { resolveDisplayDomain } from "../../lib/resolveSiteName.js";
import PreviewFrame from "../PreviewFrame.jsx";
import styles from "./Facebook.module.css";

export default function Facebook({ meta, url }) {
  const { title, image } = normaliseMeta(meta);
  const domain = resolveDisplayDomain(url);

  return (
    <PreviewFrame label="Facebook feed post" maxWidth={524}>
      <div className={styles.root}>
        {image && <img src={image} alt="" className={styles.image} />}
        <div className={styles.body}>
          <div className={styles.domain}>{domain}</div>
          <div className={styles.title} title={title}>
            {title || domain}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

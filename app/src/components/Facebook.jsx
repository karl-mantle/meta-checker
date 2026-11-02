import { normaliseMeta } from "../lib/normaliseMeta";
import { resolveSiteName } from "../lib/resolveSiteName";
import PreviewFrame from "./PreviewFrame.jsx";
import styles from "./Facebook.module.css";

export default function Facebook({ meta, url }) {
  const { title, description, image } = normaliseMeta(meta);

  return (
    <PreviewFrame label="Facebook feed post" maxWidth={500}>
      <div className={styles.root}>
        {image && <img src={image} alt="Facebook OG" className={styles.image} />}
        <div className={styles.body}>
          <div className={styles.domain}>
            {resolveSiteName(url) || "example.com"}
          </div>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

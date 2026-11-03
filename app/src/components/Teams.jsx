import { normaliseMeta } from "../lib/normaliseMeta";
import { resolveSiteName } from "../lib/resolveSiteName";
import PreviewFrame from "./PreviewFrame.jsx";
import styles from "./Teams.module.css";

export default function Teams({ meta, url }) {
  const { title, description, image } = normaliseMeta(meta);

  return (
    <PreviewFrame label="Teams chat link preview" maxWidth={420}>
      <div className={styles.root}>
        {image && <img src={image} alt="Teams preview" className={styles.image} />}
        <div className={styles.body}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.domain}>{resolveSiteName(url)}</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

import { normaliseMeta } from "../lib/normaliseMeta";
import { resolveSiteName } from "../lib/resolveSiteName";
import PreviewFrame from "./PreviewFrame.jsx";
import styles from "./WhatsApp.module.css";

export default function WhatsApp({ meta, url }) {
  const { title, description, image } = normaliseMeta(meta);

  return (
    <PreviewFrame label="WhatsApp chat link preview" maxWidth={360}>
      <div className={styles.root}>
        {image && <img src={image} alt="WhatsApp OG" className={styles.image} />}
        <div className={styles.body}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.domain}>{resolveSiteName(url)}</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

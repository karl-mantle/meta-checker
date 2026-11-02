import { normaliseMeta } from "../lib/normaliseMeta";
import { resolveSiteName } from "../lib/resolveSiteName";
import PreviewFrame from "./PreviewFrame.jsx";
import styles from "./Outlook.module.css";

export default function Outlook({ meta, url }) {
  const { title, description, image } = normaliseMeta(meta);

  return (
    <PreviewFrame label="Outlook email link preview" maxWidth={480}>
      <div className={styles.root}>
        {image && <img src={image} alt="Outlook preview" className={styles.image} />}
        <div className={styles.body}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.domain}>{resolveSiteName(url)}</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

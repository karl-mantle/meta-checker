import { normaliseMeta } from "../lib/normaliseMeta";
import { resolveSiteName } from "../lib/resolveSiteName";
import PreviewFrame from "./PreviewFrame.jsx";
import styles from "./Facebook.module.css";

// Facebook shows the bare domain, e.g. "BBC.CO.UK" for www.bbc.co.uk
const displayDomain = (url) =>
  resolveSiteName(url).replace(/^www\./i, "") || "example.com";

export default function Facebook({ meta, url }) {
  const { title, image } = normaliseMeta(meta);
  const domain = displayDomain(url);

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

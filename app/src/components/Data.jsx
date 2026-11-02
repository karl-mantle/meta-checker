import { useState } from "react";
import { normaliseMeta } from "../lib/normaliseMeta";
import { resolveSiteName } from "../lib/resolveSiteName";
import styles from "./Data.module.css";

function TruncatedValue({ text, limit = 160 }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return <span className={styles.missing}>missing</span>;

  const isLong = text.length > limit;
  const displayText = expanded
    ? text
    : text.slice(0, limit) + (isLong ? "…" : "");

  return (
    <span>
      {displayText}
      {isLong && (
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </span>
  );
}

export default function Data({ meta, url }) {
  const {
    title,
    description,
    image,
    twitterTitle,
    twitterDescription,
    twitterImage,
  } = normaliseMeta(meta);

  const Row = ({ label, value }) => (
    <tr>
      <td className={styles.label}>{label}</td>
      <td className={styles.value}>
        {" "}
        <TruncatedValue text={value} />{" "}
      </td>
    </tr>
  );

  return (
    <div className={styles.root}>
      {/* Open Graph */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Open Graph</h3>

        {image && (
          <div className={styles.imageBlock}>
            <div className={styles.imageLabel}>Resolved og:image</div>
            <img src={image} alt="og:image" className={styles.image} />
          </div>
        )}

        <table className={styles.table}>
          <tbody>
            <Row label="og:title" value={title} />
            <Row label="og:description" value={description} />
            <Row label="og:image" value={image} />
            <Row label="og:url" value={url} />
            <Row label="domain" value={resolveSiteName(url)} />
          </tbody>
        </table>
      </section>

      {/* Twitter */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Twitter Card</h3>

        {twitterImage && (
          <div className={styles.imageBlock}>
            <div className={styles.imageLabel}>Resolved twitter:image</div>
            <img src={twitterImage} alt="twitter:image" className={styles.image} />
          </div>
        )}

        <table className={styles.table}>
          <tbody>
            <Row label="twitter:title" value={twitterTitle} />
            <Row label="twitter:description" value={twitterDescription} />
            <Row label="twitter:image" value={twitterImage} />
          </tbody>
        </table>
      </section>
    </div>
  );
}

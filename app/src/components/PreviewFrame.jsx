import styles from "./PreviewFrame.module.css";

export default function PreviewFrame({ label, maxWidth, children }) {
  return (
    <figure className={styles.frame}>
      <figcaption className={styles.caption}>{label}</figcaption>
      <div
        className={styles.stage}
        style={
          maxWidth ? { "--preview-max-width": `${maxWidth}px` } : undefined
        }
      >
        {children}
      </div>
    </figure>
  );
}

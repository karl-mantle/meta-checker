import styles from "./PreviewFrame.module.css";

/**
 * Shared wrapper for the platform preview tabs.
 *
 * - `label` names what the preview imitates, e.g. "Facebook feed post".
 * - `maxWidth` is the width the real app renders the card at (px). The
 *   preview shrinks below that on narrow screens instead of overflowing.
 */
export default function PreviewFrame({ label, maxWidth, children }) {
  return (
    <figure className={styles.frame}>
      <figcaption className={styles.caption}>{label}</figcaption>
      <div
        className={styles.stage}
        style={maxWidth ? { "--preview-max-width": `${maxWidth}px` } : undefined}
      >
        {children}
      </div>
    </figure>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { auditMeta } from "../lib/audit.js";
import { normaliseMeta } from "../lib/normaliseMeta.js";
import { useImageInfo } from "../lib/useImageInfo.js";
import styles from "./Audit.module.css";

const LEVELS = [
  { level: "error", label: "Error" },
  { level: "warning", label: "Warning" },
  { level: "good", label: "Good" },
];

// Lucide icons: circle-x, triangle-alert, check
const ICON_PATHS = {
  error: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </>
  ),
  warning: (
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  good: <path d="M20 6 9 17l-5-5" />,
};

function LevelIcon({ level }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[level]}
    </svg>
  );
}

export default function Audit({ meta }) {
  const { image } = normaliseMeta(meta);
  const imageInfo = useImageInfo(image);
  const findings = useMemo(() => auditMeta(meta, imageInfo), [meta, imageInfo]);
  const [filter, setFilter] = useState(null);
  const listRef = useRef(null);
  const [moreBelow, setMoreBelow] = useState(false);

  const counts = Object.fromEntries(
    LEVELS.map(({ level }) => [
      level,
      findings.filter((f) => f.level === level).length,
    ]),
  );
  const visible = filter
    ? findings.filter((f) => f.level === filter)
    : findings;

  // Clear a filter that no longer matches anything (e.g. after a new fetch)
  useEffect(() => {
    if (filter && counts[filter] === 0) setFilter(null);
  }, [filter, counts]);

  // Fade the bottom edge while the list has more to scroll to
  const updateFade = () => {
    const el = listRef.current;
    if (el) setMoreBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 1);
  };
  useEffect(() => {
    updateFade();
    window.addEventListener("resize", updateFade);
    return () => window.removeEventListener("resize", updateFade);
  }, [visible.length]);

  return (
    <aside className={styles.root} aria-labelledby="audit-heading">
      <div className={styles.header}>
        <h2 id="audit-heading" className={styles.heading}>
          Meta tag audit
        </h2>
        <div className={styles.counts}>
          {LEVELS.map(({ level, label }) => (
            <button
              key={level}
              type="button"
              className={`${styles.pill} ${styles[level]}`}
              aria-label={`${label}: ${counts[level]}`}
              aria-pressed={filter === level}
              disabled={counts[level] === 0}
              title={
                filter === level ? "Show all" : `Show only ${label.toLowerCase()}s`
              }
              onClick={() => setFilter(filter === level ? null : level)}
            >
              <LevelIcon level={level} />
              <span>{counts[level]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.listWrap}>
        <ul ref={listRef} className={styles.list} onScroll={updateFade}>
          {imageInfo.status === "loading" && (
            <li className={styles.pending}>Checking the image…</li>
          )}
          {visible.map((f) => (
            <li key={`${f.tag}-${f.title}`} className={styles.item}>
              <div className={`${styles.badge} ${styles[f.level]}`}>
                <LevelIcon level={f.level} />
                <span className={styles.srOnly}>
                  {LEVELS.find((l) => l.level === f.level).label}:
                </span>
              </div>
              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <span className={styles.title}>{f.title}</span>
                  <code className={styles.tag}>{f.tag}</code>
                </div>
                <p className={styles.detail}>{f.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        {moreBelow && <div className={styles.fade} aria-hidden="true" />}
      </div>
    </aside>
  );
}

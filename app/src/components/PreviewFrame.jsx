export default function PreviewFrame({ label, maxWidth, children }) {
  return (
    <figure className="preview-frame">
      <figcaption className="preview-caption">{label}</figcaption>
      <div
        className="preview-content"
        style={
          maxWidth ? { "--preview-max-width": `${maxWidth}px` } : undefined
        }
      >
        {children}
      </div>
    </figure>
  );
}

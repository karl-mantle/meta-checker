import styles from "./UrlForm.module.css";

export default function UrlForm({
  url,
  username,
  password,
  loading,
  setUrl,
  setUsername,
  setPassword,
  setMeta,
  setError,
  setLoading,
  setPreview,
}) {
  const fetchMetadata = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://meta-checker-api.karlmantle.workers.dev/api/meta",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, username, password }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setMeta(data);
      } else {
        setError(data.error || "Failed to fetch meta data");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
      setPreview(true);
    }
  };

  return (
    <form
      className={styles.urlForm}
      onSubmit={(e) => {
        e.preventDefault();
        fetchMetadata();
      }}
    >
      <input
        id="url"
        type="text"
        placeholder="https://www.something.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        id="username"
        type="text"
        placeholder="Basic Auth Username (optional)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        id="password"
        type="password"
        placeholder="Basic Auth Password (optional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Fetch Meta Tags"}
      </button>
    </form>
  );
}

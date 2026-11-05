import { useState } from "react";
import Form from "./components/Form.jsx";
import Audit from "./components/Audit.jsx";
import PreviewTabs from "./components/PreviewTabs.jsx";

const defaultPreview = {
  title: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  favicon: "",
};

export default function App() {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [meta, setMeta] = useState(defaultPreview);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  return (
    <>
      <div className="form-area">
        <Form
          url={url}
          username={username}
          password={password}
          loading={loading}
          setUrl={setUrl}
          setUsername={setUsername}
          setPassword={setPassword}
          setMeta={setMeta}
          setError={setError}
          setLoading={setLoading}
          setPreview={setPreview}
        />

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
      </div>

      {preview === true && (
        <>
          <div className="preview-area">
            <PreviewTabs meta={meta} url={url} />
          </div>
          <div className="audit-area">
            <Audit meta={meta} />
          </div>
        </>
      )}
    </>
  );
}

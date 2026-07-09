import { useState } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false); // NEW — add this line here

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const response = await fetch("http://localhost:3000/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      console.error("FETCH FAILED:", err);
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }

  // NEW — add this whole function here, right after handleSubmit
  function handleCopy() {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste a long URL..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl} target="_blank">{shortUrl}</a>
          <button onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
        </p>
      )}
    </div>
  );
}

export default App;
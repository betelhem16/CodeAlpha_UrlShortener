import { useState, useEffect } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("urlHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

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

      const updatedHistory = [data.shortUrl, ...history];
      setHistory(updatedHistory);
      localStorage.setItem("urlHistory", JSON.stringify(updatedHistory));
    } catch (err) {
      console.error("FETCH FAILED:", err);
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }

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

      {history.length > 0 && (
        <div>
          <h2>History</h2>
          <ul>
            {history.map((url) => (
              <li key={url}>
                <a href={url} target="_blank">{url}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
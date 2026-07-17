import { useState, useEffect } from "react";

interface Stats {
  shortUrl: string;
  longUrl: string;
  visitCount: number;
  createdAt: string;
}

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedStats, setSelectedStats] = useState<Stats | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);

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

  async function handleViewStats(url: string) {
    const shortCode = url.split("/").pop();
    if (!shortCode) return;

    try {
      const response = await fetch(`http://localhost:3000/api/stats/${shortCode}`);
      const data = await response.json();

      if (!response.ok) {
        setStatsError(data.error || "Could not load stats");
        setSelectedStats(null);
        return;
      }

      setSelectedStats({ shortUrl: url, ...data });
      setStatsError(null);
    } catch (err) {
      setStatsError("Could not reach the server");
    }
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
                <button onClick={() => handleViewStats(url)}>View Stats</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {statsError && <p style={{ color: "red" }}>{statsError}</p>}

      {selectedStats && (
        <div>
          <h3>Stats for {selectedStats.shortUrl}</h3>
          <p>Original URL: {selectedStats.longUrl}</p>
          <p>Visits: {selectedStats.visitCount}</p>
          <p>Created: {new Date(selectedStats.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
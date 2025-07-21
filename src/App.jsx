import { useEffect,useState } from "react";
import "./App.css";

const App = () => {
  const [quote,setQuote] = useState("");
  const [author,setAuthor] = useState("");
  const [loading,setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://zenquotes.io/api/random");
      const data = await res.json();

      setQuote(data[0].q);
      setAuthor(data[0].a);
    } catch (error) {
      setQuote("Failed to fetch quote");
      setAuthor("Unknown");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Random Quote Generator</h1>

        {loading ? (<p className="loading">Loading</p>) : (
          <>
            <p className="quote">"{quote}"</p>
            <p className="author">- {author}</p>
          </>
        )}

        <button onClick={fetchQuote} className="btn" disabled={loading}>
          {loading ? "Please Wait..." : "New Quote"}
        </button>
      </div>
    </div>
  );
}

export default App;
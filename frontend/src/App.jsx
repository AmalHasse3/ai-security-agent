import { useState } from "react";

function App() {
  const [log, setLog] = useState("");
  const [result, setResult] = useState(null);

  const analyzeLog = async () => {
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ log }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "40px" }}>AI Security Agent</h1>

      <textarea
        placeholder="Paste security log here..."
        value={log}
        onChange={(e) => setLog(e.target.value)}
        style={{
          width: "100%",
          height: "150px",
          marginTop: "20px",
          padding: "15px",
          borderRadius: "10px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={analyzeLog}
        style={{
          marginTop: "20px",
          padding: "15px 25px",
          backgroundColor: "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Analyze Threat
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>Threat Analysis</h2>
          <p>
            <strong>Severity:</strong> {result.severity}
          </p>
          <p>
            <strong>Threat:</strong> {result.threat}
          </p>
          <p>
            <strong>Recommendation:</strong> {result.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;


import { useState, useEffect, useRef } from "react";

export default function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const abortRef              = useRef(null);

  useEffect(() => {
    if (!url) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    fetch(url, { signal: abortRef.current.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong");
        setLoading(false);
      });

    return () => abortRef.current?.abort();
  }, [url]);

  return { data, loading, error };
}

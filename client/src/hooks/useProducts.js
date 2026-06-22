import { useState, useMemo } from "react";
import useFetch from "./useFetch";

const API = "https://sahara-project-1.onrender.com/api/products"; 

function buildQuery(params) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== "" && v !== null && v !== undefined) q.set(k, v);
  });
  return q.toString();
}

export function useProducts(filters = {}) {
  const query = useMemo(() => buildQuery(filters), [JSON.stringify(filters)]);
  const url   = `${API}?${query}`;
  return useFetch(url);
}

export function useProduct(id) {
  const url = id ? `${API}/${id}` : null;
  return useFetch(url);
}

export function useProductMeta() {
  return useFetch(`${API}/meta`);
}

export function useProductFilters(initial = {}) {
  const [filters, setFilters] = useState({
    category:   "",
    search:     "",
    sort:       "",
    page:       1,
    limit:      12,
    ...initial,
  });

  const setFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value, page: key === "page" ? value : 1 }));

  const resetFilters = () =>
    setFilters({ category: "", search: "", sort: "", page: 1, limit: 12 });

  return { filters, setFilter, resetFilters };
}

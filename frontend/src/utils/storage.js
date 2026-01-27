export const load = (k) => JSON.parse(localStorage.getItem(k) || "[]");
export const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

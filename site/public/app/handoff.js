// Pass a result file to the next tool via IndexedDB (stays on this device).
const DB = "p2w-handoff", STORE = "f";
function db() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
}
export async function handoffPut(item) {
  try { const d = await db(); await new Promise((res, rej) => { const t = d.transaction(STORE, "readwrite"); t.objectStore(STORE).put({ ...item, at: Date.now() }, "last"); t.oncomplete = res; t.onerror = () => rej(t.error); }); } catch {}
}
export async function handoffTake() {
  try {
    const d = await db();
    const item = await new Promise((res, rej) => { const t = d.transaction(STORE, "readwrite"); const s = t.objectStore(STORE); const g = s.get("last"); g.onsuccess = () => { s.delete("last"); res(g.result); }; g.onerror = () => rej(g.error); });
    if (item && Date.now() - item.at < 30 * 60 * 1000) return item;
  } catch {}
  return null;
}

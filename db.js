const DB_NAME = 'CoreHudDB';
const DB_VERSION = 1;

let db;
const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onupgradeneeded = (e) => {
  const database = e.target.result;
  if (!database.objectStoreNames.contains('logs')) {
    database.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
  }
};

request.onsuccess = (e) => {
  db = e.target.result;
};

function saveLog(text) {
  if (!db) return;
  const transaction = db.transaction(['logs'], 'readwrite');
  const store = transaction.objectStore('logs');
  store.add({ text: text, timestamp: new Date().toLocaleString() });
}

function getLogs(callback) {
  if (!db) return;
  const transaction = db.transaction(['logs'], 'readonly');
  const store = transaction.objectStore('logs');
  store.getAll().onsuccess = (e) => callback(e.target.result);
}

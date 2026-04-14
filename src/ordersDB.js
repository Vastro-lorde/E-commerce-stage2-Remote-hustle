const DB_NAME = "shopease_orders";
const DB_VERSION = 1;
const STORE_NAME = "orders";

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
                store.createIndex("userId", "userId", { unique: false });
                store.createIndex("guestEmail", "guestEmail", { unique: false });
                store.createIndex("createdAt", "createdAt", { unique: false });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function addOrder(orderData) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.add({ ...orderData, createdAt: Date.now() });
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
        tx.oncomplete = () => db.close();
    });
}

export async function getOrdersByUserId(userId) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const index = store.index("userId");
        const req = index.getAll(userId);
        req.onsuccess = () => {
            const results = req.result.sort((a, b) => b.createdAt - a.createdAt);
            resolve(results);
        };
        req.onerror = () => reject(req.error);
        tx.oncomplete = () => db.close();
    });
}

export async function getOrdersByEmail(email) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const index = store.index("guestEmail");
        const req = index.getAll(email.trim().toLowerCase());
        req.onsuccess = () => {
            const results = req.result.sort((a, b) => b.createdAt - a.createdAt);
            resolve(results);
        };
        req.onerror = () => reject(req.error);
        tx.oncomplete = () => db.close();
    });
}

export async function getAllOrders() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => {
            const results = req.result.sort((a, b) => b.createdAt - a.createdAt);
            resolve(results);
        };
        req.onerror = () => reject(req.error);
        tx.oncomplete = () => db.close();
    });
}

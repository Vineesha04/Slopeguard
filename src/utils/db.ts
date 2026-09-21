// Real browser IndexedDB offline store and background sync engine for NER-LEWS Sentinel
import { FieldReport } from '../types';
import { BACKEND_BASE_URL } from './realApi';

const DB_NAME = 'ner_lews_offline_db';
const DB_VERSION = 1;
const STORE_PENDING = 'pending_reports';
const STORE_SYNCED = 'synced_reports';

export function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported in this environment.'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_PENDING)) {
        db.createObjectStore(STORE_PENDING, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_SYNCED)) {
        db.createObjectStore(STORE_SYNCED, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveReportToIndexedDB(report: FieldReport): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_PENDING], 'readwrite');
    const store = tx.objectStore(STORE_PENDING);
    const req = store.put({
      ...report,
      cachedAt: Date.now(),
      syncStatus: 'PENDING_SYNC'
    });
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getPendingReportsFromIndexedDB(): Promise<FieldReport[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_PENDING], 'readonly');
      const store = tx.objectStore(STORE_PENDING);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB read error:', err);
    return [];
  }
}

export async function markReportAsSyncedInIndexedDB(report: FieldReport): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_PENDING, STORE_SYNCED], 'readwrite');
    const pendingStore = tx.objectStore(STORE_PENDING);
    const syncedStore = tx.objectStore(STORE_SYNCED);

    pendingStore.delete(report.id);
    syncedStore.put({
      ...report,
      syncStatus: 'SYNCED',
      syncedAt: Date.now()
    });

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function flushPendingReportsToServer(
  onSyncSuccess?: (syncedReports: FieldReport[]) => void
): Promise<number> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return 0;
  }

  const pending = await getPendingReportsFromIndexedDB();
  if (pending.length === 0) return 0;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/reports/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reports: pending })
    });

    if (response.ok) {
      for (const report of pending) {
        await markReportAsSyncedInIndexedDB(report);
      }
      if (onSyncSuccess) {
        onSyncSuccess(pending.map(r => ({ ...r, syncStatus: 'SYNCED' })));
      }
      return pending.length;
    }
  } catch (err) {
    console.warn('Server offline or sync unreachable, will retry when reconnected:', err);
  }

  return 0;
}

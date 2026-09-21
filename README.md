# NER-LEWS // Sentinel Command
**North Eastern Region Landslide Early Warning & Resilience System**

A landslide risk monitoring dashboard built for the SIH problem statement on
AI-powered early warning for the North Eastern Region. It has two parts:

- **Frontend** (`/src`) — a React + TypeScript + Vite dashboard: regional command view,
  district drill-down, predictive analytics, field report queue, broadcast gateway,
  audit ledger, and a simplified citizen mode.
- **Backend** (`/backend`) — a FastAPI service that trains and serves a real
  scikit-learn `GradientBoostingClassifier` for landslide risk, and proxies live
  weather data from the public Open-Meteo API.

## What's real vs. simulated (read this before presenting)

Being upfront about this is more convincing to reviewers than overclaiming:

| Feature | Status |
|---|---|
| ML risk model (GradientBoostingClassifier, live inference) | **Real** — trained in `backend/ml_engine.py`, served via `/api/predict` |
| Live rainfall feed (Open-Meteo) | **Real** — public API, no key needed |
| Offline field report queue (IndexedDB) | **Real** — genuine browser storage + auto-sync |
| GIS map | **Real** — now renders on actual OpenStreetMap tiles via Leaflet (`RealGISMap.tsx`) |
| Borehole/piezometer/InSAR sensor telemetry | **Simulated** — clearly labeled "SIMULATED — DEMO RIGS" in the UI |
| Role-based access (Regional/District/Citizen) | **Demo-level** — no password verification; roles are chosen from a list. The backend does check role on sensitive endpoints, but via a client-sent header, so treat this as UI-level gating, not production security |
| Evacuation/broadcast dispatch | **Simulated** — no real SMS/telecom integration |

## Running it locally

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn server:app --reload --port 8000
```

**Frontend:**
```bash
npm install
npm run dev
```
Visit the URL Vite prints (usually `http://localhost:5173`).

## Deploying it as a live website

The frontend now reads its backend URL from an environment variable instead of a
hardcoded `localhost` address, so it will work once deployed. See `.env.example`.

1. **Deploy the backend** (Render, Railway, or Fly.io — all have free tiers):
   push the repo, point the service at `backend/`, and set the start command to:
   ```bash
   uvicorn server:app --host 0.0.0.0 --port $PORT
   ```
   copy the public URL you get, e.g. `https://ner-lews-api.onrender.com`.

2. **Deploy the frontend** (Vercel or Netlify): connect the repo, and set the
   environment variable `VITE_API_BASE_URL` to the backend URL from step 1.

3. **Update CORS**: in `backend/server.py`, replace `allow_origins=["*"]` with your
   deployed frontend's exact domain before treating this as production-ready.

Note: free tiers on Render/Railway spin down after ~15 minutes idle, so the first
request after inactivity can take 30-50 seconds. Fine for a resume link; for a live
judged demo, run the backend locally instead so there's no cold-start delay.

## Known limitations (also listed above)

- Role-based access is UI/demo-level, not cryptographically enforced end-to-end.
  A production version needs real authentication (e.g. JWT issued after a real
  password/OTP login) instead of trusting a client-sent role header.
- The ML model is trained on a synthetic, physically-derived calibration dataset
  (n=1,200), not real historical GSI landslide records — this is disclosed in the
  UI itself under "Engineering Note & Production Roadmap."

## What changed in this update

- Fixed the hardcoded `127.0.0.1:8000` backend URL (was breaking anything except
  local dev) — now reads `VITE_API_BASE_URL`, see `.env.example`.
- Added `RealGISMap.tsx` — a genuine Leaflet + OpenStreetMap map with real lat/lng
  markers, alongside the original stylized tactical map.
- Reconciled the offline fallback ML metrics in `realApi.ts` to match what the real
  trained model actually outputs (previously showed different numbers than the live
  backend).
- Added `backend/requirements.txt` for reproducibility.
- Replaced the in-memory field report list with real SQLite persistence
  (`backend/storage.py`) — synced reports now survive a backend restart, and a new
  `GET /api/reports` endpoint returns everything stored so far.

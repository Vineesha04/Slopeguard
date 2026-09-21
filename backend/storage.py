"""
NER-LEWS Sentinel Command: Persistent storage layer.

Replaces the previous in-memory Python list (which lost all data on every
server restart) with a real SQLite database. SQLite needs zero extra
infrastructure -- it's a single file on disk -- which makes it the right
choice for a hackathon-scale deployment while still being "real" persistence
rather than a demo trick.

If you outgrow SQLite (multiple server instances, high write concurrency),
swap this module for Postgres via SQLAlchemy without touching server.py's
route logic -- the two functions below are the only integration points.
"""

import sqlite3
import json
import os
from typing import List, Dict, Any

DB_PATH = os.path.join(os.path.dirname(__file__), "ner_lews.db")


def _get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Create the field_reports table if it doesn't already exist. Safe to call on every startup."""
    conn = _get_connection()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS field_reports (
            id TEXT PRIMARY KEY,
            timestamp TEXT NOT NULL,
            reporter_name TEXT,
            reporter_phone TEXT,
            location_name TEXT,
            lat REAL,
            lon REAL,
            elevation REAL,
            hazard_type TEXT,
            severity_estimate TEXT,
            description TEXT,
            image_url TEXT,
            sync_status TEXT,
            verification_status TEXT,
            synced_at_server TEXT
        )
        """
    )
    conn.commit()
    conn.close()


def save_reports(reports: List[Dict[str, Any]]) -> None:
    """Insert or update a batch of field reports. Called from /api/reports/sync."""
    conn = _get_connection()
    for r in reports:
        coords = r.get("coords", {}) or {}
        conn.execute(
            """
            INSERT INTO field_reports (
                id, timestamp, reporter_name, reporter_phone, location_name,
                lat, lon, elevation, hazard_type, severity_estimate,
                description, image_url, sync_status, verification_status, synced_at_server
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                sync_status=excluded.sync_status,
                verification_status=excluded.verification_status,
                synced_at_server=excluded.synced_at_server
            """,
            (
                r.get("id"),
                r.get("timestamp"),
                r.get("reporterName"),
                r.get("reporterPhone"),
                r.get("locationName"),
                coords.get("lat"),
                coords.get("lon") or coords.get("lng"),
                r.get("elevation"),
                r.get("hazardType"),
                r.get("severityEstimate"),
                r.get("description"),
                r.get("imageUrl"),
                r.get("syncStatus", "SYNCED"),
                r.get("verificationStatus", "RECEIVED"),
                r.get("synced_at_server"),
            ),
        )
    conn.commit()
    conn.close()


def get_all_reports() -> List[Dict[str, Any]]:
    conn = _get_connection()
    rows = conn.execute("SELECT * FROM field_reports ORDER BY timestamp DESC").fetchall()
    conn.close()
    return [dict(row) for row in rows]


def count_reports() -> int:
    conn = _get_connection()
    n = conn.execute("SELECT COUNT(*) AS n FROM field_reports").fetchone()["n"]
    conn.close()
    return n

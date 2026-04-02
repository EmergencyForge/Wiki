# EmergencyForge Wiki

Das offizielle Wiki für [EmergencyForge](https://github.com/EmergencyForge) — gehostet über GitHub Pages mit [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

**Live:** [https://wiki.emergencyforge.de/](https://wiki.emergencyforge.de/)

## Lokal starten

```bash
# Repository klonen
git clone https://github.com/EmergencyForge/Wiki.git
cd Wiki

# Abhängigkeiten installieren
pip install -r requirements.txt

# Dev-Server starten (erreichbar unter http://localhost:8000)
mkdocs serve
```

## Beitragen

Es gibt zwei Wege, Inhalte beizutragen:

1. **Direkt auf GitHub** — Jede Wiki-Seite hat einen Bearbeiten-Button, der direkt zur Datei auf GitHub führt. Änderungen werden als Pull Request eingereicht.
2. **Lokal** — Repository klonen, Änderungen vornehmen, Pull Request erstellen.

Alle Inhalte liegen als Markdown-Dateien im `docs/`-Ordner. Die Navigation wird über `mkdocs.yml` unter `nav:` gesteuert.

Mehr dazu im Wiki unter [Mitmachen](https://wiki.emergencyforge.de/mitmachen/beitragen/).

## Deployment

Das Wiki wird automatisch über GitHub Actions deployed. Bei jedem Push auf `main` wird die Seite neu gebaut und auf GitHub Pages veröffentlicht.

## Lizenz

Copyright 2024-2026 EmergencyForge

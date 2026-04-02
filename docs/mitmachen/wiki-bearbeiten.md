---
title: Wiki bearbeiten
---

# Wiki bearbeiten

Dieses Wiki basiert auf [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) und wird über GitHub Pages bereitgestellt. Alle Inhalte sind einfache Markdown-Dateien im `docs/`-Ordner.

## Direkt auf GitHub bearbeiten

1. Klicke auf den :material-pencil: **Bearbeiten-Button** oben rechts auf einer Wiki-Seite
2. Du wirst zur entsprechenden Datei auf GitHub weitergeleitet
3. Nimm deine Änderungen vor
4. Klicke auf **"Propose changes"** — das erstellt automatisch einen Pull Request
5. Nach dem Review wird die Änderung übernommen und das Wiki aktualisiert sich automatisch

## Lokal bearbeiten

Falls du größere Änderungen machen möchtest:

```bash
# Repository klonen
git clone https://github.com/EmergencyForge/Wiki.git
cd Wiki

# Python-Abhängigkeiten installieren
pip install -r requirements.txt

# Lokalen Dev-Server starten
mkdocs serve
```

Das Wiki ist dann unter `http://localhost:8000` erreichbar und aktualisiert sich bei Änderungen automatisch.

## Neue Seite anlegen

1. Erstelle eine neue `.md`-Datei im passenden Unterordner von `docs/`
2. Füge am Anfang der Datei einen Titel und Tags hinzu:

    ```markdown
    ---
    title: Mein neuer Artikel
    tags:
      - Neu
    ---

    # Mein neuer Artikel

    Hier kommt der Inhalt...
    ```

3. Trage die Seite in der `mkdocs.yml` unter `nav:` ein

## Nützliche Formatierung

MkDocs Material unterstützt viele nützliche Extras:

### Hinweisboxen

```markdown
!!! info "Titel"
    Hier steht eine Information.

!!! warning "Achtung"
    Hier steht eine Warnung.

!!! tip "Tipp"
    Hier steht ein nützlicher Tipp.
```

### Code-Blöcke

````markdown
```python
print("Hello EmergencyForge!")
```
````

### Tabellen

```markdown
| Spalte 1 | Spalte 2 |
|----------|----------|
| Wert A   | Wert B   |
```

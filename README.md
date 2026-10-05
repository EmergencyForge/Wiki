# EmergencyForge Docs

Anleitungen für ignis und ignisTab, online unter [docs.emergencyforge.de](https://docs.emergencyforge.de). Gebaut mit [Starlight](https://starlight.astro.build/).

## Lokal starten

Du brauchst Node.js 22.12 oder neuer.

```sh
npm install
npm run dev
```

Die Doku läuft dann unter `http://localhost:4321`.

## Seiten bearbeiten

Alle Seiten liegen als Markdown unter `src/content/docs/`. Jeder Ordner ist ein Bereich in der Seitenleiste. Mehr dazu steht in der Doku unter [Mitmachen](https://docs.emergencyforge.de/mitmachen/doku-bearbeiten/).

## Veröffentlichen

Cloudflare Pages baut jeden Push auf `main` und veröffentlicht ihn. Jeder Pull Request bekommt eine eigene Vorschau-Adresse.

| Einstellung | Wert |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js | aus `.node-version` |

## Lizenz

Copyright 2024-2026 EmergencyForge

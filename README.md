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

Die Doku läuft als Cloudflare Worker mit statischen Dateien, Einstellungen in `wrangler.toml`. Von Hand veröffentlichen:

```sh
npm run build
npx wrangler deploy
```

## Lizenz

Copyright 2024-2026 EmergencyForge

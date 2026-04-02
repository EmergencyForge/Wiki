---
title: Styleguide
tags:
  - Fertig
---

# Styleguide & Formatierung

Diese Seite zeigt alle Formatierungsmoeglichkeiten, die im EmergencyForge Wiki zur Verfuegung stehen. Nutze sie als Referenz beim Schreiben neuer Inhalte.

---

## Text-Formatierung

| Syntax | Ergebnis |
|--------|----------|
| `**Fett**` | **Fett** |
| `*Kursiv*` | *Kursiv* |
| `***Fett & Kursiv***` | ***Fett & Kursiv*** |
| `~~Durchgestrichen~~` | ~~Durchgestrichen~~ |
| `==Hervorgehoben==` | ==Hervorgehoben== |
| `` `Code` `` | `Code` |
| `[Link](https://example.com)` | [Link](https://example.com) |

---

## Ueberschriften

```markdown
# Ueberschrift 1
## Ueberschrift 2
### Ueberschrift 3
#### Ueberschrift 4
```

!!! tip "Tipp"
    Verwende pro Seite nur eine `#`-Ueberschrift (H1). Unterabschnitte beginnen mit `##`.

---

## Listen

### Aufzaehlungen

```markdown
- Erster Punkt
- Zweiter Punkt
    - Unterpunkt
    - Noch ein Unterpunkt
- Dritter Punkt
```

- Erster Punkt
- Zweiter Punkt
    - Unterpunkt
    - Noch ein Unterpunkt
- Dritter Punkt

### Nummerierte Listen

```markdown
1. Schritt eins
2. Schritt zwei
3. Schritt drei
```

1. Schritt eins
2. Schritt zwei
3. Schritt drei

### Checklisten

```markdown
- [x] Erledigt
- [x] Auch erledigt
- [ ] Noch offen
```

- [x] Erledigt
- [x] Auch erledigt
- [ ] Noch offen

---

## Hinweisboxen (Admonitions)

### Alle Typen

!!! note "Hinweis"
    Ein allgemeiner Hinweis fuer zusaetzliche Informationen.

!!! tip "Tipp"
    Ein nuetzlicher Tipp oder Best Practice.

!!! info "Information"
    Hintergrundinformationen zum Thema.

!!! success "Erfolg"
    Etwas hat geklappt oder ist abgeschlossen.

!!! warning "Warnung"
    Hier ist Vorsicht geboten.

!!! danger "Gefahr"
    Kritische Warnung — kann zu Datenverlust oder Fehlern fuehren.

!!! bug "Bug"
    Ein bekannter Fehler oder bekanntes Problem.

!!! example "Beispiel"
    Ein konkretes Anwendungsbeispiel.

!!! quote "Zitat"
    Ein Zitat oder eine externe Referenz.

!!! abstract "Zusammenfassung"
    Kurzfassung eines laengeren Abschnitts.

!!! question "Frage"
    Eine haeufig gestellte Frage.

!!! failure "Fehlgeschlagen"
    Etwas ist schiefgelaufen.

### Syntax

```markdown
!!! tip "Titel der Box"
    Inhalt der Box. Einrueckung mit 4 Leerzeichen.
```

### Aufklappbare Boxen

??? example "Klick mich auf (zugeklappt)"
    Dieser Inhalt ist zunaechst versteckt und wird erst beim Klick sichtbar.

???+ info "Standardmaessig offen (zuklappbar)"
    Dieser Inhalt ist initial sichtbar, kann aber zugeklappt werden.

```markdown
??? tip "Zugeklappt"
    Versteckter Inhalt.

???+ tip "Offen, aber zuklappbar"
    Sichtbarer Inhalt.
```

---

## Code

### Inline-Code

Verwende Backticks fuer `inline code` oder Dateinamen wie `mkdocs.yml`.

### Code-Bloecke

````markdown
```python
def hello():
    print("Hello EmergencyForge!")
```
````

```python
def hello():
    print("Hello EmergencyForge!")
```

```javascript
function greet(name) {
  console.log(`Willkommen, ${name}!`);
}
```

```bash
git clone https://github.com/EmergencyForge/Wiki.git
cd Wiki
mkdocs serve
```

!!! tip "Tipp"
    Gib immer die Sprache nach den drei Backticks an (`python`, `javascript`, `bash`, `yaml`, etc.) fuer korrekte Syntax-Hervorhebung.

---

## Tabellen

```markdown
| Spalte 1 | Spalte 2 | Spalte 3 |
|----------|----------|----------|
| Zeile 1  | Wert A   | Wert B   |
| Zeile 2  | Wert C   | Wert D   |
```

| Spalte 1 | Spalte 2 | Spalte 3 |
|----------|----------|----------|
| Zeile 1  | Wert A   | Wert B   |
| Zeile 2  | Wert C   | Wert D   |

---

## Tabs

=== "Python"

    ```python
    print("Hello!")
    ```

=== "JavaScript"

    ```javascript
    console.log("Hello!");
    ```

=== "Bash"

    ```bash
    echo "Hello!"
    ```

```markdown
=== "Tab 1"

    Inhalt von Tab 1.

=== "Tab 2"

    Inhalt von Tab 2.
```

---

## Cards

<div class="grid cards" markdown>

- :material-format-paint: **Beispiel-Card**

    ---

    Cards eignen sich gut fuer Uebersichtsseiten mit mehreren Bereichen.

- :material-cog: **Noch eine Card**

    ---

    Jede Card kann ein Icon, einen Titel und eine Beschreibung haben.

</div>

```markdown
<div class="grid cards" markdown>

- :material-format-paint: **Titel**

    ---

    Beschreibung der Card.

</div>
```

---

## Status-Tags

Jede Seite kann im Frontmatter mit Tags versehen werden:

```markdown
---
title: Seitentitel
tags:
  - Neu
---
```

### Verfuegbare Tags

| Tag | Bedeutung | Verwendung |
|-----|-----------|------------|
| <span class="status status-neu">Neu</span> | Seite wurde neu angelegt | Neue, noch nicht vollstaendige Seiten |
| <span class="status status-wip">In Arbeit</span> | Inhalte werden erstellt | Seiten die aktiv bearbeitet werden |
| <span class="status status-fertig">Fertig</span> | Seite ist vollstaendig | Abgeschlossene, reviewte Seiten |
| <span class="status status-veraltet">Veraltet</span> | Muss aktualisiert werden | Seiten mit nicht mehr aktuellen Inhalten |

---

## Tastenkuerzel

Mit der `pymdownx.keys`-Erweiterung:

```markdown
++ctrl+c++ zum Kopieren, ++ctrl+v++ zum Einfuegen.
```

++ctrl+c++ zum Kopieren, ++ctrl+v++ zum Einfuegen.

---

## Definitionen

```markdown
EmergencyForge
:   Ein Projekt im Bereich Notfall- und Einsatzmanagement.

Wiki
:   Eine Sammlung von Wissen, die von der Community gepflegt wird.
```

EmergencyForge
:   Ein Projekt im Bereich Notfall- und Einsatzmanagement.

Wiki
:   Eine Sammlung von Wissen, die von der Community gepflegt wird.

---

## Fussnoten

```markdown
Das ist ein Satz mit einer Fussnote.[^1]

[^1]: Hier steht die Erlaeuterung zur Fussnote.
```

Das ist ein Satz mit einer Fussnote.[^1]

[^1]: Hier steht die Erlaeuterung zur Fussnote.

---

## Bilder

```markdown
![Beschreibung](../assets/logo.png){ width="200" }
```

Bilder werden im Ordner `docs/assets/` abgelegt.

---

## Horizontale Linie

```markdown
---
```

---

## Seitenstruktur — Vorlage

Verwende diese Vorlage als Ausgangspunkt fuer neue Seiten:

```markdown
---
title: Seitentitel
tags:
  - Neu
---

# Seitentitel

Kurze Einleitung — worum geht es auf dieser Seite?

## Erster Abschnitt

Inhalt...

!!! info "Wichtig"
    Zusaetzliche Hinweise.

## Zweiter Abschnitt

Weitere Inhalte...

## Siehe auch

- [Verwandte Seite](link.md)
```

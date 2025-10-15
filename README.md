# Schulwebsite

Eine moderne Schulwebsite mit integriertem Content Management System (CMS).

## Features

- 📝 Vollständiges CMS zur Verwaltung von Inhalten im Browser
- 📰 Artikel-Verwaltung (Erstellen, Bearbeiten, Löschen)
- 🖼️ Bild-Upload mit multer
- 💾 JSON-basierte Datenspeicherung
- 🎨 Responsive Design mit modernem Look
- 🟢 Grüne Hauptfarbe (#228B22)
- 🔴 Rote Akzente (#C0392B)
- 💛 Gelber Hintergrund (#FFF8DC)

## Technologie-Stack

- **Backend:** Node.js + Express
- **Template Engine:** EJS
- **File Upload:** Multer
- **Datenspeicherung:** JSON

## Installation

1. Repository klonen:
```bash
git clone <repository-url>
cd Schulwebsite
```

2. Dependencies installieren:
```bash
npm install
```

3. Server starten:
```bash
npm start
```

4. Browser öffnen und zu `http://localhost:3000` navigieren

## Verwendung

### Startseite
- Zeigt alle veröffentlichten Artikel an
- Responsive Grid-Layout
- Klick auf "Weiterlesen" für Artikel-Details

### Admin-Bereich
Zugriff über `/admin`:

#### Website-Informationen bearbeiten
- Website Name
- Willkommenstext
- Beschreibung

#### Artikel-Verwaltung
- **Neuen Artikel hinzufügen:** Titel, Inhalt und optionales Bild
- **Artikel bearbeiten:** Bestehende Artikel anpassen
- **Artikel löschen:** Mit Bestätigungsdialog

#### Bild-Upload
- Unterstützt alle gängigen Bildformate
- Automatische Speicherung im `/uploads` Ordner
- Alte Bilder werden beim Ersetzen automatisch gelöscht

## Projektstruktur

```
Schulwebsite/
├── server.js              # Express Server
├── package.json           # Dependencies
├── data/
│   └── content.json      # Content-Speicher
├── views/
│   ├── index.ejs         # Startseite
│   ├── article.ejs       # Artikel-Detail
│   └── admin.ejs         # Admin-Panel
├── public/
│   ├── css/
│   │   └── style.css     # Styling
│   └── images/           # Statische Bilder
└── uploads/              # Hochgeladene Bilder
```

## API Endpunkte

- `GET /` - Startseite
- `GET /article/:id` - Artikel-Detail
- `GET /admin` - Admin-Panel
- `POST /admin/update-site` - Website-Info aktualisieren
- `POST /admin/add-article` - Neuen Artikel hinzufügen
- `POST /admin/edit-article/:id` - Artikel bearbeiten
- `POST /admin/delete-article/:id` - Artikel löschen

## Anpassungen

### Farben ändern
Farben können in `/public/css/style.css` angepasst werden:
- Hauptfarbe: `#228B22` (Grün)
- Akzentfarbe: `#C0392B` (Rot)
- Hintergrund: `#FFF8DC` (Gelb)

### Inhalte
Inhalte werden in `data/content.json` gespeichert und können über das Admin-Panel bearbeitet werden.

## Lizenz

ISC
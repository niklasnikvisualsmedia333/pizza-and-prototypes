# Release-Checkliste

Diese Prototype-Branch wird nicht automatisch veröffentlicht. Ein späterer Release erfolgt erst nach Review.

## 1. Lokale Prüfung

```bash
npm ci
npm run build
npm run preview
```

Prüfen:

- `/` und `/?lang=en`
- `/companies/` und `/companies/?lang=en`
- Mobile, Tablet und Desktop
- Navigation, Sprachwechsel, Sprunglinks und direkte Reloads
- Bilder, Social- und Unterstützerlinks
- Datenschutz und Consent
- Communityformular nur bis zur Validierung, niemals absenden
- Company-Fallback nur öffnen und Inhalt prüfen, keine Mail versenden
- Browser-Konsole und Netzwerk auf 404/Fehler

Zusätzlich:

```bash
git diff --check
git status --short
```

## 2. Geschützte Integrationen vergleichen

Vor Review bestätigen:

- Communityformularfelder, Reihenfolge, Optionen und Pflichtlogik unverändert
- Community-Payload unverändert
- Formspree- und n8n-Endpunkte unverändert
- Retry, Timeout und Local-Storage-Key unverändert
- UTM-Parsing unverändert
- Analytics-Consent und Cloudflare-Script unverändert
- keine produktiven Testdaten versendet

## 3. Review

1. Branch pushen.
2. Pull Request gegen `master` öffnen.
3. Änderungen und Screenshots prüfen.
4. Build/Checks im PR abwarten.
5. Product Owner bestätigt Community- und B2B-Copy.
6. Company-Formular bleibt im Mail-Fallback, bis ein eigener Endpoint und Datenschutztext freigegeben sind.

## 4. Production

Erst nach Freigabe den PR mergen. Vorher aktuellen Live-Stand als Backup-Branch oder Tag sichern. Ein Push auf `master` löst GitHub Pages aus.

Nach Deployment prüfen:

- `https://techmeetsproblems.com/`
- `https://techmeetsproblems.com/companies/`
- DE/EN und mobile Navigation
- statische Dateien, Canonicals und Sitemap
- Analytics nur gemäß bestehender Einwilligung

Bei Problemen auf den dokumentierten Live-Backup-Stand zurückrollen. Keine DNS-, CNAME- oder Workflow-Änderung ist für dieses MPA-Release vorgesehen.

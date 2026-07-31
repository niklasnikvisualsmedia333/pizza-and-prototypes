# Separater n8n-Workflow für Unternehmensanfragen

Diese Anleitung beschreibt einen neuen, vollständig getrennten Workflow für das Unternehmensformular. Der bestehende Community-Workflow bleibt unverändert und darf nicht als Ziel für Unternehmensanfragen verwendet werden.

## Einrichtung

1. In n8n einen neuen Workflow anlegen, zum Beispiel `TMP Company Contact`.
2. Einen Webhook-Node mit der Methode `POST` hinzufügen.
3. Einen eigenen Pfad verwenden, zum Beispiel `tech-meets-problems-company-contact`.
4. Den bestehenden Community-Workflow weder kopieren noch verändern.
5. Den eingehenden JSON-Body gegen `docs/company-contact-payload.schema.json` prüfen.
6. Mindestens `company`, `name`, `email`, `format`, `challenge`, `privacyAccepted` und `submittedAt` validieren.
7. Eingaben mit einem unerwarteten Honeypot-Wert verwerfen. Der Browser sendet das Honeypot-Feld bei normalen Anfragen nicht mit.
8. `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm` und `trackingSummary` unverändert übernehmen.
9. `privacyAcceptedAt`, `privacyVersion` und `privacyText` zusammen mit der Anfrage speichern.
10. Ein separates Google Sheet oder einen klar getrennten Sheet-Tab für Unternehmensanfragen anlegen.
11. Eine interne Gmail-Benachrichtigung an `info@techmeetsproblems.com` konfigurieren.
12. Optional eine kurze Bestätigungsmail an die Adresse aus `email` senden. Keine Zusagen zu Format, Termin oder Verfügbarkeit machen.
13. Einen `Respond to Webhook`-Node ergänzen und ausschließlich ein kompaktes JSON-Ergebnis zurückgeben.
14. CORS-Header setzen: `Access-Control-Allow-Origin` nur für freigegebene Origins, `Access-Control-Allow-Headers: Content-Type, Accept` und `Access-Control-Allow-Methods: POST, OPTIONS`.
15. Als Origins die Produktionsdomain und die separat veröffentlichte Preview-Domain freigeben. Keine pauschale Wildcard verwenden, wenn Credentials später eine Rolle spielen.
16. Fehler über einen separaten Fehlerpfad behandeln und intern protokollieren.
17. Zuerst die n8n-Test-URL verwenden. Das optionale Script `scripts/test-company-webhook.mjs` sendet nur, wenn `COMPANY_CONTACT_TEST_URL` ausdrücklich gesetzt ist.
18. Nach erfolgreichem Test den Workflow aktivieren.
19. Die Production-Webhook-URL kopieren. Nicht die Test-URL verwenden.
20. Die URL im Produktionsrepository als GitHub-Secret `VITE_COMPANY_CONTACT_ENDPOINT` hinterlegen. Sie gehört nicht in `.env.example` oder den Quellcode.
21. Erst nach Review und Merge einen neuen Produktionsbuild über den vorhandenen Workflow auslösen.
22. Eine Testanfrage mit fiktiven Daten prüfen: Webhook-Ausführung, Sheet-Zeile, interne Mail, optionale Absenderbestätigung und Browser-Erfolgsmeldung.

## Empfohlene Node-Reihenfolge

1. `Webhook` - POST, eigener Company-Pfad, Response über separaten Node.
2. `Code` oder `IF` - Body normalisieren, Pflichtfelder, Consent und Honeypot prüfen.
3. `Google Sheets` - neue Zeile in einem separaten Company-Tab.
4. `Gmail` - interne Nachricht an das Team.
5. Optional `Gmail` - neutrale Eingangsbestätigung an den Absender.
6. `Respond to Webhook` - kontrollierte Erfolgs- oder Validierungsantwort.

## Antworten

Erfolg, HTTP 200:

```json
{
  "ok": true
}
```

Ungültige Anfrage, HTTP 400 oder 422:

```json
{
  "ok": false,
  "error": "validation_failed"
}
```

Keine internen n8n-Details, Node-Namen, Credential-Informationen oder Stacktraces an den Browser zurückgeben.

## Betriebshinweise

- Das Frontend bleibt ohne Endpoint im sicheren Mailto-Modus.
- Ein fehlendes GitHub-Secret darf den Build nicht verhindern.
- Die Community-Anmeldung und ihr produktiver Webhook sind vollständig getrennt.
- Produktions- und Preview-Origin nach jeder URL-Änderung erneut in n8n prüfen.

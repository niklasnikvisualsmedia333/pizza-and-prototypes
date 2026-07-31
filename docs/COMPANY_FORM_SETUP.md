# Unternehmensformular sicher produktiv schalten

Das Prototype-Formular auf `/companies/` ist bewusst vom Communityformular getrennt.

## Aktueller Zustand

- Payload-Typ: `submissionType: company_interest`
- Formularversion: `2026-07-company-prototype-v2`
- Optionaler Endpoint: `VITE_COMPANY_CONTACT_ENDPOINT`
- Ohne Endpoint findet kein Formular-Netzwerkrequest statt.
- Stattdessen wird eine vorausgefüllte E-Mail an `info@techmeetsproblems.com` geöffnet. Die Person prüft und versendet sie selbst.

Das Company-Formular darf niemals den bestehenden Community-Formspree-Endpunkt, n8n-Webhook oder Google-Sheet-Tab verwenden.

Der v2-Payload enthält `company`, `name`, `email`, `role`, `format`, `challenge`, `phone`,
`timeframe`, Sprache, Zeitstempel, Landingpage, Referrer, UTM-Felder, Tracking-Zusammenfassung
und die Datenschutzbestätigung.

## Empfohlene Produktionslösung

Für die nächste Version einen eigenen Formspree-Endpunkt oder einen eigenen n8n-Webhook anlegen. Danach:

1. Endpoint ausschließlich über `VITE_COMPANY_CONTACT_ENDPOINT` konfigurieren.
2. Eingänge in einem eigenen Sheet oder klar getrennten Workflowzweig speichern.
3. Bestätigungsmail für Unternehmen separat erstellen.
4. Interne Benachrichtigung als Company-Anfrage kennzeichnen.
5. Fehler- und Spam-Schutz testen.
6. Datenschutztext vor Veröffentlichung um Endpoint, Empfänger, Zweck und Aufbewahrung ergänzen.

Empfohlen ist ein eigener n8n-Webhook mit eigenem Sheet-Tab. Dadurch bleiben Community-Anmeldungen und Unternehmensanfragen nachvollziehbar getrennt.

## Checkliste für direkten Versand an info@techmeetsproblems.com

- separate Formspree- oder n8n-Route ausschließlich für Company-Anfragen anlegen
- `info@techmeetsproblems.com` als Zieladresse konfigurieren und verifizieren
- optionale Bestätigungsmail mit eigenständigem Company-Wording erstellen
- optional eine eigene Google-Sheet-Struktur für Company-Anfragen verwenden
- Spam-Schutz und Rate-Limits des gewählten Dienstes aktivieren
- Consent-Text und Datenschutzhinweise an den tatsächlichen Dienst anpassen
- UTM-Felder aus dem bestehenden Company-Payload unverändert übernehmen
- neuen Endpoint zuerst im Testmodus mit Testdaten prüfen
- erst danach `VITE_COMPANY_CONTACT_ENDPOINT` setzen und vom Mailto-Fallback wechseln

Bis diese Punkte abgeschlossen sind, bleibt der Mailto-Fallback die bewusst gewählte und
transparente Standardlösung.

## Datenschutz

Im Mail-Fallback verarbeitet die Website die Eingaben nicht serverseitig. Sie übernimmt sie lediglich in eine lokale E-Mail-Vorlage. Sobald ein Endpoint aktiviert wird, müssen die Datenschutzhinweise den tatsächlichen Dienst, Empfänger, Zweck und die Löschmöglichkeit nennen.

Keine Endpoint-Tests gegen die produktive Community-Infrastruktur durchführen.

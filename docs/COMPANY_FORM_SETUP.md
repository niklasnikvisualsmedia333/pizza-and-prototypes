# Unternehmensformular sicher produktiv schalten

Das Prototype-Formular auf `/companies/` ist bewusst vom Communityformular getrennt.

## Aktueller Zustand

- Payload-Typ: `submissionType: company_interest`
- Formularversion: `2026-07-company-prototype-v1`
- Optionaler Endpoint: `VITE_COMPANY_CONTACT_ENDPOINT`
- Ohne Endpoint findet kein Formular-Netzwerkrequest statt.
- Stattdessen wird eine vorausgefüllte E-Mail an `info@techmeetsproblems.com` geöffnet. Die Person prüft und versendet sie selbst.

Das Company-Formular darf niemals den bestehenden Community-Formspree-Endpunkt, n8n-Webhook oder Google-Sheet-Tab verwenden.

## Empfohlene Produktionslösung

Für die nächste Version einen eigenen Formspree-Endpunkt oder einen eigenen n8n-Webhook anlegen. Danach:

1. Endpoint ausschließlich über `VITE_COMPANY_CONTACT_ENDPOINT` konfigurieren.
2. Eingänge in einem eigenen Sheet oder klar getrennten Workflowzweig speichern.
3. Bestätigungsmail für Unternehmen separat erstellen.
4. Interne Benachrichtigung als Company-Anfrage kennzeichnen.
5. Fehler- und Spam-Schutz testen.
6. Datenschutztext vor Veröffentlichung um Endpoint, Empfänger, Zweck und Aufbewahrung ergänzen.

Empfohlen ist ein eigener n8n-Webhook mit eigenem Sheet-Tab. Dadurch bleiben Community-Anmeldungen und Unternehmensanfragen nachvollziehbar getrennt.

## Datenschutz

Im Mail-Fallback verarbeitet die Website die Eingaben nicht serverseitig. Sie übernimmt sie lediglich in eine lokale E-Mail-Vorlage. Sobald ein Endpoint aktiviert wird, müssen die Datenschutzhinweise den tatsächlichen Dienst, Empfänger, Zweck und die Löschmöglichkeit nennen.

Keine Endpoint-Tests gegen die produktive Community-Infrastruktur durchführen.

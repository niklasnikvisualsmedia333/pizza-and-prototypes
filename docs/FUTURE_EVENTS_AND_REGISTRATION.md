# Zukünftige Events und Anmeldungen

## Eventpflege

Ein neues Event wird als einzelnes, typisiertes Objekt in `src/config/events.ts` ergänzt. Unterstützte Zustände:

- `draft`: intern vorbereitet, nicht öffentlich
- `upcoming`: bestätigt und öffentlich
- `past`: abgeschlossen

Die Website darf eine Upcoming-Sektion nur rendern, wenn mindestens ein Eintrag ausdrücklich `upcoming` ist. Aktuell ist Pizza & Prototypes als vergangener Pilot hinterlegt; es gibt kein bestätigtes kommendes Event.

## Eventanmeldung bleibt getrennt

Das Communityformular darf für Eventanmeldungen nicht verändert oder wiederverwendet werden. Ein Eventformular verwendet mindestens:

- `submissionType: event_registration`
- eine eindeutige `eventId`
- eine eigene `formVersion`
- eventbezogene Kapazität und Registrierungsstatus
- Zustände für offen, geschlossen, Warteliste und ausgebucht
- bei Bedarf eventbezogene Catering- und Verfügbarkeitsfelder

Jedes Event benötigt eine getrennte Bestätigungsmail und interne Benachrichtigung sowie einen eindeutig zugeordneten Google-Sheet-Tab oder ein eigenes Sheet.

## Zwei mögliche Wege

### 1. Einfach: separates Formular pro Event

Für jedes Event wird ein eigener Formspree-Endpunkt oder n8n-Webhook mit eigenem Formular bereitgestellt.

Vorteile: schnell, sehr klar getrennt, wenig dynamische Logik.  
Nachteile: mehr manuelle Pflege bei mehreren Events.

### 2. Skalierbar: generisches Eventformular

Ein gemeinsames Eventformular liest die `eventId` und erlaubte Felder aus der Eventkonfiguration. n8n verzweigt anhand der `eventId` und des Registrierungsstatus.

Vorteile: weniger Duplikation und konsistente Abläufe.  
Nachteile: mehr Testaufwand, strengere Validierung und komplexere Kapazitätslogik.

## Empfehlung

Für die nächsten ein bis drei Events ist der einfache Weg mit einem getrennten Formular und klar getrenntem n8n-Workflow pro Event sinnvoll. Erst bei wiederkehrenden Formaten sollte ein generisches Eventformular entstehen.

Wenn Communityprofile später sicher verknüpft werden können, sollten bereits bekannte Angaben nicht unnötig erneut abgefragt werden. Das ist jedoch kein Anlass, das bestehende Communityformular jetzt zu verändern.

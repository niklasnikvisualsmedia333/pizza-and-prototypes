# Schutzprüfung Communityformular

Vergleichsbasis: `master` auf Commit `bbf008d741f463a543ee21a31ee3ea7eeedaf0ed`.

## Technische Integrationen

- Formspree-Endpunkt: im Quellcode unverändert gegenüber `master`
- n8n-Endpunkt: im Quellcode unverändert gegenüber `master`
- n8n-Timeout: `2000` ms, unverändert
- Retry: `keepalive`, kurzer Timeout und lokaler Retry bleiben unverändert
- Local-Storage-Key für ausstehende n8n-Anfragen: `tmp_pending_n8n_registration`, unverändert

Aus Sicherheitsgründen dokumentiert dieser Bericht keine vollständigen produktiven Endpoint-URLs.

## Formularfelder

`firstName`, `lastName`, `email`, `phone`, `role`, `status`, `university`,
`universityOther`, `studyField`, `studyFieldOther`, `codingLevel`, `eventLanguage`,
`startupInterest`, `interests`, `followUp`, `link`, `githubLink`, `linkedinLink`,
`portfolioLink`, `pizza`, `source`, `sourceOther`, `foodNotes`, `notes`.

Reihenfolge, Optionen, Pflichtlogik und sichtbare Feldkomponenten wurden in diesem Refresh nicht
verändert.

## Payload-Keys

Zusätzlich zu allen Formularfeldern bleiben erhalten:

`language`, `submittedAt`, `trackingSummary`, `utmSource`, `utmMedium`, `utmCampaign`,
`utmContent`, `utmTerm`, `referrer`, `landingPage`, `signupType`, `eventId`, `formVersion`,
`_subject`, `_replyto`, `fullName`, `event`.

## Legal-Felder

`privacyAndUpdatesAccepted`, `privacyAndUpdatesAcceptedAt`, `privacyAndUpdatesVersion`,
`privacyAndUpdatesText`, `photoVideoNoticeShown`, `photoVideoNoticeVersion`,
`photoVideoNoticeText`.

## Festgestellte Differenzen

Die neue Seitenstruktur verschiebt das bestehende Formular in den Community-Seitenablauf.
State, Felder, Validierung, Payload, Submit-Handler, Success Modal, Social-Aktionen,
Formspree-/n8n-Logik, Retry, Timeout, Local Storage und Legal-Felder zeigen im Diff zu
`master` keine technisch relevante Änderung.

## Ergebnis

Das Communityformular ist funktional geschützt. Es wurde keine echte Übermittlung ausgelöst.

## Bytevergleich der geschützten Bereiche

Die folgenden Bereiche wurden nach Abschluss der Implementierung erneut direkt mit
`master` auf Commit `bbf008d741f463a543ee21a31ee3ea7eeedaf0ed` verglichen:

- `InterestForm` und `initialForm`: SHA-256
  `7adf2ae4b5654cbd83f44d3250686bcd73e5dc3fdcfc84d1cd1dcd5930fa5394`
- Submit-Handler einschließlich Payload, Formspree, n8n, Timeout, Retry und Local Storage:
  SHA-256 `1b7d737a66ca269d53186960ef14a2b6878fc2852e6c275c6a3aeae52c23df38`
- Registrierungsformular einschließlich Feldreihenfolge, Optionen und Required-Logik:
  SHA-256 `7d7cb1c8ea9ef7a3ccbfd28d46200099f045bef41c6f97ec0ba2ee137e37086c`
- Success Modal und Social-Aktionen: SHA-256
  `38c0b18521a34a73367b28ed9132528e74abd73bd37991834d67441a1e486cdc`

Alle genannten Hashes stimmen zwischen `master` und diesem Prototyp-Branch überein.

## Preview-Hinweis

Die getrennte Preview verwendet bewusst weiterhin dieselben produktiven Community-Endpunkte.
Eine Anmeldung über die Preview ist daher eine echte Übermittlung und kann einen Eintrag im
produktiven Communityworkflow erzeugen. Der Hinweis fordert ausdrücklich dazu auf, nur bewusst
Testdaten abzusenden.
Analytics sind im Preview-Build deaktiviert; die Formularanbindung ist es nicht.

## Prüfung im Website-Refresh vom Juli 2026

Auch bei der responsiven und inhaltlichen Überarbeitung des Prototyps wurden `InterestForm`,
`initialForm`, Feldreihenfolge, Optionen, Required-Logik, Submit-Handler, Payload-Aufbau,
Success Modal und Social-Aktionen nicht verändert. Die Änderungen betreffen ausschließlich
Seiteninhalte, gemeinsam genutzte Präsentationskomponenten und Layout-Styles. Es wurde kein
Communityformular an Formspree oder n8n gesendet.

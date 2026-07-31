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

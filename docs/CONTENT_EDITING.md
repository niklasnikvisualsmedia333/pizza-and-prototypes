# Inhalte pflegen

Diese Hinweise richten sich auch an Teammitglieder ohne tiefere React-Kenntnisse. Änderungen sollten immer auf einem separaten Branch erfolgen und vor einem Release lokal geprüft werden.

## Texte

- Community-Seite: `src/content/community.ts`
- Unternehmensseite: `src/content/companies.ts`
- Gemeinsame Navigation, Footer und Consent-Texte: `src/content/shared.ts`
- Bestehendes Communityformular, Datenschutz und dessen Erfolgsmeldung: weiterhin in `src/App.tsx`

Deutsch und Englisch liegen jeweils im selben Inhaltsobjekt unter `de` und `en`. Sichtbare Änderungen müssen immer in beiden Sprachen vorgenommen werden.

## Links, Kontakt und Unterstützer

- E-Mail, Social-Links, WhatsApp, Impressum und Unterstützer: `src/config/site.ts`
- Bildpfade: `src/config/assets.ts`
- Eventdaten: `src/config/events.ts`

Unterstützer werden über die Einträge in `SITE.supporters` gepflegt. Name, Link und Logo sollten gemeinsam geprüft werden.

## Bilder austauschen

1. Neue Datei unter `public/assets/` ablegen.
2. Pfad in `src/config/assets.ts` aktualisieren.
3. Vorhandene `alt`-Texte in der Komponente prüfen.
4. Bildabmessungen beziehungsweise `aspect-ratio` beibehalten, um Layout Shifts zu vermeiden.
5. `npm run build` ausführen und Desktop sowie Mobile visuell prüfen.

Die Event-1-Fotos unter `public/assets/event-1/` wurden unverändert aus dem gelieferten Archiv übernommen. Sie sollten nicht neu gespeichert, zugeschnitten oder komprimiert werden.

## Ein neues Event hinterlegen

Ein neues Event wird als weiteres Objekt in `src/config/events.ts` angelegt. Nur Einträge mit `status: 'upcoming'` dürfen öffentlich als kommende Events erscheinen. Entwürfe bleiben `draft`; vergangene Events erhalten `past`.

Ein Eventobjekt ersetzt kein Anmeldeformular. Eventanmeldungen müssen technisch vom Communityformular getrennt bleiben. Details stehen in `docs/FUTURE_EVENTS_AND_REGISTRATION.md`.

## Geschützter Bereich: Communityformular

Der Bereich `Registration`, dessen State, Validierung, Payload und Submit-Handler in `src/App.tsx` ist produktiv mit Formspree, n8n, Google Sheets und Gmail verbunden.

Ohne vollständige Prüfung nicht verändern:

- Felder, Reihenfolge, Optionen und Pflichtlogik
- Payload-Schlüssel und Metadaten
- Formspree- und n8n-Endpunkte
- Timeout, Retry und Local-Storage-Keys
- UTM-Erfassung
- Datenschutz- und Foto-/Video-Einwilligungswerte
- Erfolgsmeldung und Community-Aktionen

Nie durch das Unternehmensformular oder ein späteres Eventformular wiederverwenden. Keine Tests an produktive Endpunkte senden.

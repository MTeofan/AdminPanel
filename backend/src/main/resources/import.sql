-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

-- import.sql — Seed-Daten für Woche Mo–So (24.–30.11.2025)
-- Hinweis: Tabelle heißt unquoted "Ticket" -> in H2 case-insensitive.

-- Montag (4 Tickets) — 24.11.2025
INSERT INTO Ticket (ticketNumber, visitType, ticketType, customerType, priceGroup, createdAt, updatedAt)
VALUES (50001, 'Eintritt Dauerausstellung', '1 Erwachsener', 'Standardbesucher', 'Regulär',
        TIMESTAMP '2025-11-24 10:05:00', TIMESTAMP '2025-11-24 10:05:00'),
       (50002, 'Führung Museum', 'Schulklasse', 'Schüler', 'Bildung', TIMESTAMP '2025-11-24 11:20:00',
        TIMESTAMP '2025-11-24 11:20:00'),
       (50003, 'Eintritt Deepspace', '1 Student', 'Studierende', 'Ermäßigt', TIMESTAMP '2025-11-24 14:10:00',
        TIMESTAMP '2025-11-24 14:10:00'),
       (50004, 'Workshop Kunst', '1 Erwachsener', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-24 16:45:00',
        TIMESTAMP '2025-11-24 16:45:00');

-- Dienstag (5 Tickets) — 25.11.2025
INSERT INTO Ticket (ticketNumber, visitType, ticketType, customerType, priceGroup, createdAt, updatedAt)
VALUES (50005, 'Eintritt Sonderausstellung', '1 Erwachsener', 'Standardbesucher', 'Regulär',
        TIMESTAMP '2025-11-25 09:30:00', TIMESTAMP '2025-11-25 09:30:00'),
       (50006, 'Eintritt Dauerausstellung', 'Kind', 'Schüler', 'Ermäßigt', TIMESTAMP '2025-11-25 10:15:00',
        TIMESTAMP '2025-11-25 10:15:00'),
       (50007, 'Führung Museum', '1 Student', 'Studierende', 'Bildung', TIMESTAMP '2025-11-25 12:40:00',
        TIMESTAMP '2025-11-25 12:40:00'),
       (50008, 'Eintritt Deepspace', '1 Senior', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-25 15:05:00',
        TIMESTAMP '2025-11-25 15:05:00'),
       (50009, 'Familienführung', '1 Erwachsener', 'Familie', 'Regulär', TIMESTAMP '2025-11-25 16:25:00',
        TIMESTAMP '2025-11-25 16:25:00');

-- Mittwoch (6 Tickets) — 26.11.2025
INSERT INTO Ticket (ticketNumber, visitType, ticketType, customerType, priceGroup, createdAt, updatedAt)
VALUES (50010, 'Eintritt Dauerausstellung', '2 Erwachsene + 2 Kinder', 'Familie', 'Familienrabatt',
        TIMESTAMP '2025-11-26 10:00:00', TIMESTAMP '2025-11-26 10:00:00'),
       (50011, 'Familienführung', '1 Erwachsener', 'Familie', 'Regulär', TIMESTAMP '2025-11-26 11:35:00',
        TIMESTAMP '2025-11-26 11:35:00'),
       (50012, 'Workshop Kunst', '1 Erwachsener', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-26 13:15:00',
        TIMESTAMP '2025-11-26 13:15:00'),
       (50013, 'Eintritt Deepspace', '3 Erwachsene', 'Gruppe', 'Gruppe', TIMESTAMP '2025-11-26 15:50:00',
        TIMESTAMP '2025-11-26 15:50:00'),
       (50014, 'Eintritt Sonderausstellung', '1 Student', 'Studierende', 'Ermäßigt', TIMESTAMP '2025-11-26 16:30:00',
        TIMESTAMP '2025-11-26 16:30:00'),
       (50015, 'Führung Museum', '10 Personen', 'Gruppe', 'Gruppe', TIMESTAMP '2025-11-26 17:20:00',
        TIMESTAMP '2025-11-26 17:20:00');

-- Donnerstag (7 Tickets) — 27.11.2025
INSERT INTO Ticket (ticketNumber, visitType, ticketType, customerType, priceGroup, createdAt, updatedAt)
VALUES (50016, 'Eintritt Dauerausstellung', '1 Erwachsener', 'Standardbesucher', 'Regulär',
        TIMESTAMP '2025-11-27 09:20:00', TIMESTAMP '2025-11-27 09:20:00'),
       (50017, 'Eintritt Sonderausstellung', '1 Erwachsener', 'Standardbesucher', 'Regulär',
        TIMESTAMP '2025-11-27 10:10:00', TIMESTAMP '2025-11-27 10:10:00'),
       (50018, 'Eintritt Deepspace', '1 Student', 'Studierende', 'Ermäßigt', TIMESTAMP '2025-11-27 11:55:00',
        TIMESTAMP '2025-11-27 11:55:00'),
       (50019, 'Führung Museum', 'Schulklasse', 'Schüler', 'Bildung', TIMESTAMP '2025-11-27 13:40:00',
        TIMESTAMP '2025-11-27 13:40:00'),
       (50020, 'Workshop Kunst', '1 Erwachsener', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-27 15:25:00',
        TIMESTAMP '2025-11-27 15:25:00'),
       (50021, 'Familienführung', '1 Erwachsener + 3 Kinder', 'Familie', 'Familienrabatt',
        TIMESTAMP '2025-11-27 16:05:00', TIMESTAMP '2025-11-27 16:05:00'),
       (50022, 'Abendveranstaltung', '1 Erwachsener', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-27 19:30:00',
        TIMESTAMP '2025-11-27 19:30:00');

-- Freitag (8 Tickets) — 28.11.2025
INSERT INTO Ticket (ticketNumber, visitType, ticketType, customerType, priceGroup, createdAt, updatedAt)
VALUES (50023, 'Eintritt Dauerausstellung', '1 Senior', 'Standardbesucher', 'Sonderaktion',
        TIMESTAMP '2025-11-28 10:05:00', TIMESTAMP '2025-11-28 10:05:00'),
       (50024, 'Eintritt Sonderausstellung', '1 Erwachsener', 'Standardbesucher', 'Regulär',
        TIMESTAMP '2025-11-28 10:45:00', TIMESTAMP '2025-11-28 10:45:00'),
       (50025, 'Eintritt Deepspace', '1 Erwachsener', 'Standardbesucher', 'Premium', TIMESTAMP '2025-11-28 11:20:00',
        TIMESTAMP '2025-11-28 11:20:00'),
       (50026, 'Führung Museum', '1 Student', 'Studierende', 'Bildung', TIMESTAMP '2025-11-28 12:35:00',
        TIMESTAMP '2025-11-28 12:35:00'),
       (50027, 'Workshop Kunst', '1 Erwachsener', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-28 14:00:00',
        TIMESTAMP '2025-11-28 14:00:00'),
       (50028, 'Abendveranstaltung', '1 Student', 'Studierende', 'Ermäßigt', TIMESTAMP '2025-11-28 19:15:00',
        TIMESTAMP '2025-11-28 19:15:00'),
       (50029, 'Abendveranstaltung', '1 Erwachsener', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-28 20:10:00',
        TIMESTAMP '2025-11-28 20:10:00'),
       (50030, 'Eintritt Deepspace', '3 Erwachsene', 'Gruppe', 'Gruppe', TIMESTAMP '2025-11-28 21:05:00',
        TIMESTAMP '2025-11-28 21:05:00');

-- Samstag (9 Tickets) — 29.11.2025
INSERT INTO Ticket (ticketNumber, visitType, ticketType, customerType, priceGroup, createdAt, updatedAt)
VALUES (50031, 'Eintritt Sonderausstellung', '2 Erwachsene + 2 Kinder', 'Familie', 'Familienrabatt',
        TIMESTAMP '2025-11-29 10:30:00', TIMESTAMP '2025-11-29 10:30:00'),
       (50032, 'Eintritt Deepspace', '1 Erwachsener', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-29 11:05:00',
        TIMESTAMP '2025-11-29 11:05:00'),
       (50033, 'Führung Museum', '10 Personen', 'Gruppe', 'Gruppe', TIMESTAMP '2025-11-29 12:15:00',
        TIMESTAMP '2025-11-29 12:15:00'),
       (50034, 'Eintritt Dauerausstellung', '1 Erwachsener', 'Standardbesucher', 'Regulär',
        TIMESTAMP '2025-11-29 13:40:00', TIMESTAMP '2025-11-29 13:40:00'),
       (50035, 'Familienführung', '1 Erwachsener', 'Familie', 'Regulär', TIMESTAMP '2025-11-29 14:25:00',
        TIMESTAMP '2025-11-29 14:25:00'),
       (50036, 'Workshop Kunst', '1 Erwachsener', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-29 15:10:00',
        TIMESTAMP '2025-11-29 15:10:00'),
       (50037, 'Eintritt Deepspace', '1 Student', 'Studierende', 'Ermäßigt', TIMESTAMP '2025-11-29 16:40:00',
        TIMESTAMP '2025-11-29 16:40:00'),
       (50038, 'Eintritt Dauerausstellung', '1 Erwachsener', 'Standardbesucher', 'Regulär',
        TIMESTAMP '2025-11-29 17:20:00', TIMESTAMP '2025-11-29 17:20:00'),
       (50039, 'Abendveranstaltung', '1 Erwachsener', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-29 19:30:00',
        TIMESTAMP '2025-11-29 19:30:00');

-- Sonntag (6 Tickets) — 30.11.2025
INSERT INTO Ticket (ticketNumber, visitType, ticketType, customerType, priceGroup, createdAt, updatedAt)
VALUES (50040, 'Familienführung', '1 Erwachsener + 3 Kinder', 'Familie', 'Familienrabatt',
        TIMESTAMP '2025-11-30 10:20:00', TIMESTAMP '2025-11-30 10:20:00'),
       (50041, 'Eintritt Dauerausstellung', '1 Erwachsener', 'Standardbesucher', 'Regulär',
        TIMESTAMP '2025-11-30 11:05:00', TIMESTAMP '2025-11-30 11:05:00'),
       (50042, 'Eintritt Sonderausstellung', '1 Senior', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-30 12:40:00',
        TIMESTAMP '2025-11-30 12:40:00'),
       (50043, 'Eintritt Deepspace', '1 Erwachsener', 'Standardbesucher', 'Premium', TIMESTAMP '2025-11-30 13:50:00',
        TIMESTAMP '2025-11-30 13:50:00'),
       (50044, 'Führung Museum', '1 Student', 'Studierende', 'Bildung', TIMESTAMP '2025-11-30 15:10:00',
        TIMESTAMP '2025-11-30 15:10:00'),
       (50045, 'Workshop Kunst', '1 Erwachsener', 'Standardbesucher', 'Regulär', TIMESTAMP '2025-11-30 16:30:00',
        TIMESTAMP '2025-11-30 16:30:00');

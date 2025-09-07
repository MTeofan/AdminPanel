-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;
-- Import.sql für Testdaten der Ticket-Entity (Deutsch, erweitert)

INSERT INTO Ticket (ticketNumber, visitType, ticketType, customerType, priceGroup)
VALUES
    -- Einzelbesuch
    (1001, 'Einzelbesuch', 'Erwachsener', 'Regulär', 'Standard'),
    (1002, 'Einzelbesuch', 'Kind', 'Student', 'Ermäßigt'),
    (1003, 'Einzelbesuch', 'Senior', 'Regulär', 'Standard'),
    (1004, 'Einzelbesuch', 'Erwachsener', 'VIP', 'Premium'),
    (1005, 'Einzelbesuch', 'Kind', 'Familie', 'Familienrabatt'),

    -- Saisonkarten
    (2001, 'Saisonkarte', 'Erwachsener', 'Regulär', 'Premium'),
    (2002, 'Saisonkarte', 'Kind', 'Student', 'Ermäßigt'),
    (2003, 'Saisonkarte', 'Senior', 'VIP', 'Premium'),
    (2004, 'Saisonkarte', 'Erwachsener', 'Familie', 'Familienrabatt'),

    -- Gruppenbesuch
    (3001, 'Gruppenbesuch', 'Erwachsener', 'Schule', 'Gruppenrabatt'),
    (3002, 'Gruppenbesuch', 'Kind', 'Schule', 'Gruppenrabatt'),
    (3003, 'Gruppenbesuch', 'Erwachsener', 'Firma', 'Business'),
    (3004, 'Gruppenbesuch', 'Erwachsener', 'Regulär', 'Standard'),

    -- Sonderaktionen
    (4001, 'Sonderaktion', 'Erwachsener', 'Regulär', 'Ermäßigt'),
    (4002, 'Sonderaktion', 'Kind', 'Student', 'Ermäßigt'),
    (4003, 'Sonderaktion', 'Senior', 'VIP', 'Premium'),
    (4004, 'Sonderaktion', 'Erwachsener', 'Familie', 'Familienrabatt');

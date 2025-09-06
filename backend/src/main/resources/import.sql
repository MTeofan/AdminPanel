-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

-- Import.sql für Testdaten der Ticket-Entity (Deutsch)


INSERT INTO Ticket (ticketNumber, visitType, ticketType, customerType, priceGroup)
VALUES (1001, 'Einzelbesuch', 'Erwachsener', 'Regulär', 'Standard'),
       (1002, 'Einzelbesuch', 'Kind', 'Student', 'Ermäßigt'),
       (1003, 'Saisonkarte', 'Erwachsener', 'VIP', 'Premium'),
       (1004, 'Einzelbesuch', 'Senior', 'Regulär', 'Standard'),
       (1005, 'Saisonkarte', 'Kind', 'Student', 'Premium');


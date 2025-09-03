import { Ticket } from "../types/ticket";

const mockTickets: Ticket[] = [
    {
        ticketnummer: "219900003559",
        besuchsart: "Eintritt Wappensaal",
        artDesTickets: "1 Erwachsener",
        kunde: "Standardbesucher",
        preisgruppe: "Sonstige Besucher",
        periode: "Preise ab 2024 Teil 2",
    },
    {
        ticketnummer: "219900003560",
        besuchsart: "Eintritt Ausstellung",
        artDesTickets: "1 Student",
        kunde: "Ermäßigt",
        preisgruppe: "Studenten",
        periode: "Preise ab 2024 Teil 2",
    },
];

export const ticketService = {
    getTickets: async (): Promise<Ticket[]> => {
        // später: fetch("api/tickets").then(...)
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockTickets), 800);
        });
    },
};

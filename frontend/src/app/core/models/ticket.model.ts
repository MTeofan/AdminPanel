export interface Ticket {
    id?: number;
    ticketNumber: number;
    visitType: string;
    ticketType: string;
    customerType: string;
    priceGroup: string;
    createdAt?: string;
    validUntil?: string;
    state?: string;
}

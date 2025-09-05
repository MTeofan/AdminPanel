package at.ac.htlleonding.entity;

public record TicketDTO(
        Long ticketNumber,
        String visitType,
        String ticketType,
        String customerType,
        String priceGroup
) {}

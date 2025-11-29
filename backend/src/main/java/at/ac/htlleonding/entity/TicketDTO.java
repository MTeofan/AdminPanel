package at.ac.htlleonding.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record TicketDTO(
        @NotNull @Positive Long ticketNumber,
        @NotBlank String visitType,
        @NotBlank String ticketType,
        @NotBlank String customerType,
        @NotBlank String priceGroup
) {}

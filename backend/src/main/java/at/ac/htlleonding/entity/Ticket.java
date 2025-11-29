package at.ac.htlleonding.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(
        name = "Ticket",
        indexes = {
                @Index(name = "ux_ticket_ticketNumber", columnList = "ticketNumber", unique = true)
        }
)
@NamedQueries({
        @NamedQuery(name = Ticket.QUERY_FIND_ALL, query = "SELECT t FROM Ticket t ORDER BY t.createdAt DESC")
})
public class Ticket {

    public static final String QUERY_FIND_ALL = "Ticket.findAll";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long ticketNumber;

    private String visitType;
    private String ticketType;
    private String customerType;
    private String priceGroup;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public Ticket() {
    }

    public Ticket(Long ticketNumber, String visitType, String ticketType, String customerType, String priceGroup) {
        this.ticketNumber = ticketNumber;
        this.visitType = visitType;
        this.ticketType = ticketType;
        this.customerType = customerType;
        this.priceGroup = priceGroup;
    }

    //<editor-fold desc="getter & setter">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(Long ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public String getVisitType() {
        return visitType;
    }

    public void setVisitType(String visitType) {
        this.visitType = visitType;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public String getCustomerType() {
        return customerType;
    }

    public void setCustomerType(String customer) {
        this.customerType = customer;
    }

    public String getPriceGroup() {
        return priceGroup;
    }

    public void setPriceGroup(String priceGroup) {
        this.priceGroup = priceGroup;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
    //</editor-fold>

}

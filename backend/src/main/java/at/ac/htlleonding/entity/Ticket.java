package at.ac.htlleonding.entity;

import jakarta.persistence.*;

@Entity
@NamedQueries({
        @NamedQuery(name = Ticket.QUERY_FIND_ALL, query = "select t from Ticket t"),
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

    public Ticket() {
    }

    public Ticket(Long ticketNumber, String visitType, String ticketType, String customerType, String priceGroup) {
        this.ticketNumber = ticketNumber;
        this.visitType = visitType;
        this.ticketType = ticketType;
        this.customerType = customerType;
        this.priceGroup = priceGroup;
    }

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
}

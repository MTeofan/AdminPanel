package at.ac.htlleonding;

import at.ac.htlleonding.entity.Ticket;
import at.ac.htlleonding.entity.TicketDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class TicketRepository {

    @Inject
    EntityManager entityManager;

    public List<Ticket> getAllTickets() {
        return this.entityManager
                .createNamedQuery(Ticket.QUERY_FIND_ALL, Ticket.class)
                .getResultList();
    }

    public Ticket getTicketById(Long id) {
        return entityManager.find(Ticket.class, id);
    }

    @Transactional
    public Ticket createTicket(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket( ticketDTO.ticketNumber(), ticketDTO.visitType(), ticketDTO.ticketType(), ticketDTO.customerType(), ticketDTO.priceGroup());

        this.entityManager.persist(ticket);

        // TODO: Generate QR code that saves the ticket as JSON and store as PNG

        return ticket;
    }

    public List<Ticket> getTicketsByVisitType(String visitType) {
        return entityManager.createQuery(
                        "SELECT t FROM Ticket t WHERE t.visitType = :visitType ORDER BY t.id DESC", Ticket.class)
                .setParameter("visitType", visitType)
                .getResultList();
    }

    public List<Ticket> getTicketsByPriceGroup(String priceGroup) {
        return entityManager.createQuery(
                        "SELECT t FROM Ticket t WHERE t.priceGroup = :priceGroup ORDER BY t.id DESC", Ticket.class)
                .setParameter("priceGroup", priceGroup)
                .getResultList();
    }

    public List<Ticket> getTicketsByCustomer(String customerType) {
        return entityManager.createQuery(
                        "SELECT t FROM Ticket t WHERE t.customerType = :customerType ORDER BY t.id DESC", Ticket.class)
                .setParameter("customerType", customerType)
                .getResultList();
    }

    @Transactional
    public void deleteTicket(Ticket ticket) {
        entityManager.remove(entityManager.contains(ticket) ? ticket : entityManager.merge(ticket));
    }

    @Transactional
    public Ticket updateTicket(Long id, TicketDTO ticketDTO) {
        Ticket ticket = entityManager.find(Ticket.class, id);
        if (ticket == null) {
            return null;
        }
        ticket.setTicketNumber(ticketDTO.ticketNumber());
        ticket.setVisitType(ticketDTO.visitType());
        ticket.setTicketType(ticketDTO.ticketType());
        ticket.setCustomerType(ticketDTO.customerType());
        ticket.setPriceGroup(ticketDTO.priceGroup());
        return entityManager.merge(ticket);
    }
}

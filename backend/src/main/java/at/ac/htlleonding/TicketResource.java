package at.ac.htlleonding;

import at.ac.htlleonding.entity.Ticket;
import at.ac.htlleonding.entity.TicketDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/tickets")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TicketResource {

    @Inject
    TicketRepository ticketRepository;

    @GET
    public Response getAllTickets() {
        List<Ticket> tickets = ticketRepository.getAllTickets();
        return Response.ok(tickets == null ? List.of() : tickets).build();
    }

    @GET
    @Path("/{id}")
    public Response getTicketById(@PathParam("id") Long id) {
        Ticket ticket = ticketRepository.getTicketById(id);
        if (ticket == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(ticket).build();
    }

    @GET
    @Path("/visitType/{visitType}")
    public Response getTicketsByVisitType(@PathParam("visitType") String visitType) {
        List<Ticket> tickets = ticketRepository.getTicketsByVisitType(visitType);
        return Response.ok(tickets == null ? List.of() : tickets).build();
    }

    @GET
    @Path("/priceGroup/{priceGroup}")
    public Response getTicketsByPriceGroup(@PathParam("priceGroup") String priceGroup) {
        List<Ticket> tickets = ticketRepository.getTicketsByPriceGroup(priceGroup);
        return Response.ok(tickets == null ? List.of() : tickets).build();
    }

    @GET
    @Path("/customer/{customer}")
    public Response getTicketsByCustomer(@PathParam("customer") String customer) {
        List<Ticket> tickets = ticketRepository.getTicketsByCustomer(customer);
        return Response.ok(tickets == null ? List.of() : tickets).build();
    }

    @POST
    public Response createTicket(TicketDTO ticketDTO) {
        Ticket ticket = ticketRepository.createTicket(ticketDTO);
        return Response.status(Response.Status.CREATED).entity(ticket).build();
    }

    @POST
    @Path("/scan")
    public Response scanTicket(TicketDTO ticketDTO) {
        Ticket ticket = ticketRepository.scanTicket(ticketDTO);
        if (ticket == null) {
            return Response.status(Response.Status.CONFLICT) // 409
                    .entity("Ticket wurde bereits gescannt")
                    .build();
        }

        return Response.status(Response.Status.CREATED).entity(ticket).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateTicketById(@PathParam("id") Long id, TicketDTO ticketDTO) {
        Ticket updatedTicket = ticketRepository.updateTicket(id, ticketDTO);
        if (updatedTicket == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(updatedTicket).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteTicket(@PathParam("id") Long id) {
        Ticket ticket = ticketRepository.getTicketById(id);
        if (ticket == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        ticketRepository.deleteTicket(ticket);
        return Response.noContent().build();
    }
}

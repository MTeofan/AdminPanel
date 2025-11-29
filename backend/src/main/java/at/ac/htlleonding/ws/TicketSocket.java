package at.ac.htlleonding.ws;

import io.quarkus.websockets.next.*;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
@WebSocket(path = "/tickets/ws")
public class TicketSocket {

    @OnOpen
    public void onOpen(WebSocketConnection conn) {
        // System.out.println("WS opened: " + conn.id());
    }

    @OnClose
    public void onClose(WebSocketConnection conn) {
        // System.out.println("WS closed: " + conn.id());
    }

    @OnError
    public void onError(WebSocketConnection conn, Throwable t) {
        // t.printStackTrace();
    }

}

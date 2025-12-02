package at.ac.htlleonding.ws;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/tickets/updates")
@ApplicationScoped
public class TicketSocket {

    private final Set<Session> sessions = ConcurrentHashMap.newKeySet();

    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        sessions.remove(session);
        throwable.printStackTrace();
    }

    public void notifyCreated(Long id) {
        JsonObject json = Json.createObjectBuilder()
                .add("type", "TICKET_CREATED")
                .add("id", id)
                .build();
        broadcast(json.toString());
    }

    public void notifyUpdated(Long id) {
        JsonObject json = Json.createObjectBuilder()
                .add("type", "TICKET_UPDATED")
                .add("id", id)
                .build();
        broadcast(json.toString());
    }

    public void notifyDeleted(Long id) {
        JsonObject json = Json.createObjectBuilder()
                .add("type", "TICKET_DELETED")
                .add("id", id)
                .build();
        broadcast(json.toString());
    }

    private void broadcast(String message) {
        for (Session s : sessions) {
            if (s.isOpen()) {
                s.getAsyncRemote().sendText(message);
            }
        }
    }
}

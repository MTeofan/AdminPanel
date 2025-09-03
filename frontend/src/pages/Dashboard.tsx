import { useEffect, useState } from "react";
import { Ticket } from "../types/ticket";
import { ticketService } from "../services/ticketService";
import TicketTable from "../components/TicketTable";
import Header from "../components/Header";

export default function Dashboard() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await ticketService.getTickets();
                setTickets(data);
            } catch (err) {
                setError("Fehler beim Laden der Tickets");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header mit Logo + Navigation */}
            <Header />

            {/* Hero Section */}
            <section className="bg-gray-50 border-b border-gray-200 py-12 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Tickets Übersicht
                </h1>
                <p className="text-gray-600">
                    Hier sehen Sie alle ausgestellten Tickets im Überblick
                </p>
            </section>

            {/* Hauptinhalt */}
            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    {loading && <p className="text-gray-600">Lade Tickets...</p>}
                    {error && <p className="text-red-600">{error}</p>}

                    {!loading && !error && (
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <TicketTable tickets={tickets} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

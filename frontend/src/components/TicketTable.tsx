import { Ticket } from "../types/ticket";
import { useNavigate } from "react-router-dom";

interface TicketTableProps {
    tickets: Ticket[];
}

export default function TicketTable({ tickets }: TicketTableProps) {
    const navigate = useNavigate();

    const handleRowClick = (ticketnummer: string) => {
        navigate(`/ticket/${ticketnummer}`);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-100 text-left text-gray-700 text-sm">
                    <th className="p-3">Ticketnummer</th>
                    <th className="p-3">Besuchsart</th>
                    <th className="p-3">Art des Tickets</th>
                    <th className="p-3">Kunde</th>
                    <th className="p-3">Preisgruppe</th>
                    <th className="p-3">Periode</th>
                </tr>
                </thead>
                <tbody>
                {tickets.map((ticket) => (
                    <tr
                        key={ticket.ticketnummer}
                        className="hover:bg-gray-50 cursor-pointer transition"
                        onClick={() => handleRowClick(ticket.ticketnummer)}
                    >
                        <td className="p-3">{ticket.ticketnummer}</td>
                        <td className="p-3">{ticket.besuchsart}</td>
                        <td className="p-3">{ticket.artDesTickets}</td>
                        <td className="p-3">{ticket.kunde}</td>
                        <td className="p-3">{ticket.preisgruppe}</td>
                        <td className="p-3">{ticket.periode}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {tickets.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                    Keine Tickets vorhanden
                </p>
            )}
        </div>
    );
}

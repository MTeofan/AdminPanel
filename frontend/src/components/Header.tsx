import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
                {/* Logo */}
                <div className="text-xl font-bold text-gray-800">🎟️ TicketAdmin</div>

                {/* Navigation */}
                <nav className="flex gap-6 text-gray-600">
                    <Link to="/" className="hover:text-gray-900 transition">
                        Dashboard
                    </Link>
                    <Link to="/settings" className="hover:text-gray-900 transition">
                        Einstellungen
                    </Link>
                </nav>
            </div>
        </header>
    );
}

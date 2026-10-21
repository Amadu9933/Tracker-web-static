import { Link } from "react-router-dom";
import logo from '../../../../assets/Logo.png';

export default function ReusableAffiliateHeader () {
    return <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/affiliate" aria-label="TrackerrGo affiliate home">
            <img className="h-9 w-auto" src={logo} alt="TrackerrGo" />
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6">
            <a
            className="hidden text-sm font-medium text-slate-600 hover:text-primary sm:inline"
            href="/affiliate/benefits"
            >
            Benefits
            </a>
        </nav>
    </header>
}
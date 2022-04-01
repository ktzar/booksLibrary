import { Link } from 'react-router-dom';

export function Home () {
    return (
        <>
        <h2>Search</h2>
        <Link className="btn btn-primary" to="/search"><i class="bi bi-search"/> Search</Link>
        <p>Type all or part of a title, author or ISBN to see what books we have.</p>

        <hr/>

        <h2>Take</h2>
        <p>Scan a book before taking it out.</p>
        <Link className="btn btn-outline-primary" to="/take"><i class="bi bi-box-arrow-up"/> Take a book</Link>

        <hr/>

        <h2>Return</h2>
        <p>Scan a barcode to mark a book as returned.</p>
        <Link className="btn btn-outline-primary" to="/return"><i class="bi bi-box-arrow-in-down"/> Return a book</Link>
        </>
    )
}

import { Link } from 'react-router-dom';

export function Home () {
    return (
        <>
        <h2>Search</h2>
        <Link className="btn btn-primary" to="/search">Search</Link>
        <p>Type all or part of a title, author or ISBN to see what books we have.</p>

        <hr/>

        <h2>Take</h2>
        <p>Scan a book before taking it out.</p>
        <Link className="btn btn-primary" to="/take">Take a book</Link>

        <hr/>

        <h2>Return</h2>
        <p>Scan a barcode to mark a book as returned.</p>
        <Link className="btn btn-primary" to="/return">Return a book</Link>
        </>
    )
}

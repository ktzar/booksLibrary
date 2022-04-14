import { State, StateEnum } from './State';
import { Link } from 'react-router-dom';

interface BookProps {
    title: string,
    author: string,
    isbn: string,
    category: string,
    year: string,
    state: StateEnum,
}

export function Book({title, author, isbn, category, year, state} : BookProps) {
    return <div className="card">
        <div className="card-header text-end fs-6"><i className="bi bi-upc"/> {isbn} </div>
        <div className="card-body">
            <h5 className="card-title"><strong>{title}</strong></h5>
            <h6 className="card-subtitle mb-2 text-muted">
                <i className="bi bi-person-fill"/> <Link to={`/author/${author}`}>{author}</Link>
            </h6>
            <p className="card-text">
                <i className="bi bi-bookmark"/> Category: <Link to={`/category/${category}`}>{category}</Link><br/>
                <i className="bi bi-calendar-fill"/> Year: {year}
            </p>
            <p className="card-text"><State value={state} /></p>
        </div>
    </div>;
}

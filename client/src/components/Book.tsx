import { State } from './State';

export function Book({title, author, isbn, category, year, state}) {
    return <div className="card" styles={{width: '18rem'}}>
        <div class="card-header text-end fs-6"> {isbn} </div>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
            <p className="card-text">Category: {category}<br/>
            Year: {year}</p>
            <p className="card-text"><State value={state} /></p>
        </div>
    </div>;
}

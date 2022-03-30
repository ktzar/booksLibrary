import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from 'react-simple-loading';
import { Book } from '../components/Book';

export function Search() {
    const [ results, setResults ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const search = query => {
        setLoading(true)
        fetch('/api/search/' + query)
            .then(d => d.json())
            .then((data) => {
                setResults(data);
                setLoading(false);
            })
    }

    return <>
        <h2>Search</h2>
        {loading ?
            <Loading />
            :
            <>
                <p>Search by title, author or ISBN</p>
                <input type="text" onKeyPress={evt => evt.charCode===13 && search(evt.target.value)}/>
            </>
        }
        {results === [] && <div>No results found</div>}
        {results &&
            <div className="d-grid gap-3">
                {results.map(res => <Book {...res}/>)}
            </div>
        }
    <hr/>
        <p>
            <Link className="btn btn-primary" to="/">Back</Link>
        </p>
    </>
}

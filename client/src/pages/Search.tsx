import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from 'react-simple-loading';
import { Book } from '../components/Book';

export function Search() {
    const [ results, setResults ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ query, setQuery ] = useState('')
    const inputEl = useRef(null);
    useEffect(() => inputEl?.current?.focus())

    const search = () => {
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
                <p><input type="text"
                    ref={inputEl}
                    onChange={evt => setQuery(evt.target.value)}
                    onKeyPress={evt => {evt.charCode===13 && search()}}
                /> <i className="bi bi-upc-scan"/>
                </p>
                <p><button className="btn btn-primary" disabled={query === ''} onClick={search}><i className="bi-search"/> Search</button></p>
            </>
        }
        {results === [] && <div>No results found</div>}
        {results &&
            <div className="d-grid gap-3">
                <h3>{results.length} Results</h3>
                {results.map(res => <Book {...res}/>)}
            </div>
        }
        <hr/>
        <p>
            <Link className="btn btn-secondary" to="/">
                <i className="bi bi-house"/> Go Back
            </Link>
        </p>
    </>
}

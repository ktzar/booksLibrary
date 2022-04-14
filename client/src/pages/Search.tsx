import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from 'react-simple-loading';
import { Book } from '../components/Book';
import { TypeaheadResult } from '../components/TypeaheadResult';

const fetchJson = (url : string) => {
    return fetch(url).then(d => d.json())
}

export function Search() {
    const [ results, setResults ] = useState([])
    const [ typeahead, setTypeahead ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ query, setQuery ] = useState('')

    const handleSearch = (term : string = '') => {
        setLoading(true)
        const searchTerm = term || query
        fetchJson('/api/search/' + searchTerm)
            .then((data) => {
                setResults(data);
                setLoading(false);
                setQuery('')
                setTypeahead('')
            })
            .catch( () => {
                setResults([]);
                setLoading(false);
            });
    }

    const handleTypeaheadResult = (val : string) => {
        setQuery(val)
        handleSearch(val)
        setTypeahead([])
    }

    const handleTypeahead = useCallback((term) => {
        if (term.length < 3) {
            return;
        }
        fetchJson('/api/typeahead/' + term)
            .then(setTypeahead)
    }, [query])

    return <>
        <h2>Search</h2>
        {loading ?
            <Loading />
            :
            <>
                <p>Search by title, author or ISBN</p>
                <input type="text"
                    value={query}
                    onChange={evt => {setQuery(evt.target.value); handleTypeahead(evt.target.value)}}
                    onKeyPress={evt => evt.charCode === 13 && handleSearch()}/>
            </>
        }
        {results === [] && <div>No results found</div>}
        {typeahead &&
            <div className="d-grid gap-1">
                {typeahead.map(res => <TypeaheadResult onFollow={handleTypeaheadResult} val={res} />
                )}
            </div>
        }
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

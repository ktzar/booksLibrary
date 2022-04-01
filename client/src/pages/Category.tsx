import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from 'react-simple-loading';
import { Book } from '../components/Book';

export function Category() {
    const { categoryName } = useParams();
    const [ results, setResults ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch('/api/category/' + categoryName)
            .then(d => d.json())
            .then((data) => {
                setResults(data);
                setLoading(false);
            })
    }, [])

    return <>
        <h2>Books in {categoryName}</h2>
        { loading && <Loading /> }

        {results === [] && <div>No results found</div>}


        {results &&
            <div className="d-grid gap-3">
            <p>
                <Link className="btn btn-secondary" to="/">
                    <i className="bi bi-house"/> Go Back
                </Link>
            </p>
            <hr/>
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

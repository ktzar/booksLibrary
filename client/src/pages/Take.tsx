import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Take() {
    const [ loading, setLoading ] = useState(false)
    const [ successful, setSuccessful ] = useState(false)
    const [ query, setQuery ] = useState('')
    const inputEl = useRef<HTMLInputElement>(null);
    useEffect(() => inputEl?.current?.focus())

    const handle = () => {
        setLoading(true)
        fetch('/api/take/' + query)
            .then(() => {
                setSuccessful(true);
                setLoading(false);
            })
    }

    return <>
        <h2>Take</h2>
        {loading ?
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            :
            <>
                <p>Scan a book before taking it.</p>
                <p><input ref={inputEl} type="text"
                    onChange={evt => setQuery(evt.target.value)}
                    onKeyPress={evt => {evt.charCode===13 && handle()}}
                /> <i className="bi bi-upc-scan"/></p>
                <p><button disabled={query === ''} className="btn btn-primary" onClick={handle}>
                    <i className="bi bi-box-arrow-up"/> Take
                </button></p>
            </>
        }
        {successful &&
            <div className="alert alert-success" role="alert">
                Book marked as taken
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

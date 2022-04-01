import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from 'react-simple-loading';

export function Return() {
    const [ loading, setLoading ] = useState(false)
    const [ successful, setSuccessful ] = useState(false)
    const [ query, setQuery ] = useState('')
    const inputEl = useRef(null);
    useEffect(() => inputEl.current.focus())

    const handle = () => {
        setLoading(true)
        fetch('/api/return/' + query)
            .then(() => {
                setSuccessful(true);
                setLoading(false);
            })
    }

    return <>
        <h2>Return</h2>
        {loading ?
            <Loading />
            :
            <>
                <p>Scan a book before putting it back in the shelf.</p>
                <p><input type="text"
                    ref={inputEl}
                    onChange={evt => setQuery(evt.target.value)}
                    onKeyPress={evt => {evt.charCode===13 && handle()}}
                /> <i className="bi bi-upc-scan"/></p>
                <p><button disabled={query === ''} className="btn btn-primary" onClick={handle}>
                    <i className="bi bi-box-arrow-in-down"/> Return
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

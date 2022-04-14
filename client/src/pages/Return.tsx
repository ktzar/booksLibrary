import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from 'react-simple-loading';

export function Return() {
    const [ loading, setLoading ] = useState(false)
    const [ successful, setSuccessful ] = useState(false)

    const handle = query => {
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
                <input type="text" onKeyPress={evt => evt.charCode===13 && handle(evt.target.value)}/>
            </>
        }
        {successful &&
            <div class="alert alert-success" role="alert">
                Book marked as taken
            </div>
        }

        <p>
            <Link className="btn btn-primary" to="/">Back</Link>
        </p>
    </>
}
import { State } from './State';

export function TypeaheadResult({val, onFollow}) {
    const parts = val.split('**')
    return <div style={{cursor: 'pointer'}} onClick={() => onFollow(parts.join(""))}>
        {parts[0]}
        <strong>{parts[1]}</strong>
        {parts[2]}
    </div>;
}

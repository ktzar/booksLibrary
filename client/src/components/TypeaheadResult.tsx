import { State } from './State';

interface TypeaheadResultProps {
    val: string,
    onFollow: (a: string) => void
}

export function TypeaheadResult({val, onFollow} : TypeaheadResultProps) {
    const parts = val.split('**')
    return <div style={{cursor: 'pointer'}} onClick={() => onFollow(parts.join(''))}>
        {parts[0]}
        <strong>{parts[1]}</strong>
        {parts[2]}
    </div>;
}

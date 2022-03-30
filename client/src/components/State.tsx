
const stateNames = {
    due: 'warning text-dark',
    available: 'success',
    missing: 'dark',
    damaged: 'danger'
};

const stateTexts = {
    due: 'Borrowed',
    available: 'Available',
    missing: 'Missing',
    damaged: 'Damaged'
};

export function State({value}) {
    const name = stateNames[value]
    const text = stateTexts[value]
    return <span className={`badge bg-${name}`}>{text}</span>;
}

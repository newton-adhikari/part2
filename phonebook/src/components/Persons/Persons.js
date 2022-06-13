import Person from "./Person/Person";

const Persons = ({filtered}) => {
    return (
        <>
            {filtered.map(p => <Person key={p.name} name={p.name} number={p.number} />)}
        </>
    )
}

export default Persons;
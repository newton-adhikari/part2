import Person from "./Person/Person";

const Persons = ({filtered, deleteHandler}) => {
    return (
        <>
            {filtered.map(p => <Person 
            key={p.name} 
            name={p.name} 
            number={p.number}
            del={() => deleteHandler(p.id)}
            />)}
        </>
    )
}

export default Persons;
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searched, setSearched] = useState("");

  const changeHandler = event => {
    if(event.target.name === "name") setNewName(event.target.value);
    else if (event.target.name === "searched") setSearched(event.target.value);
    else setNewNumber(event.target.value);
  }

  const nameSubmitHandler = event => {
    event.preventDefault();
    const exists = persons.findIndex(p => p.name === newName) !== -1;

    if(exists) return alert(`${newName} already exists in phonebook`);

    setPersons(persons.concat({name: newName, number: newNumber}));
    setNewName("");
    setNewNumber("");
  }

  const filtered = persons.filter(p => p.name.toLowerCase().includes(searched.toLowerCase()));
  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input name="searched" type="search" value={searched} onChange={changeHandler} /></p>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input 
          type="text"
          name="name"
          value={newName} 
          onChange={changeHandler}
        />
        </div>
        <div>
          number: <input 
            type="text"
            name="number"
            value={newNumber} 
            onChange={changeHandler}
          />
        </div>
        <div>
          <button 
          type="submit"
          onClick={nameSubmitHandler}
        > add
        </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtered.map(p => <p key={p.name}>{p.name} {p.number}</p>)}
    </div>
  )
}

export default App

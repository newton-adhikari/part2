import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "342-545-2111" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');

  const nameChangeHandler = event => {
    if(event.target.name === "name") setNewName(event.target.value);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
          type="text"
          name="name"
          value={newName} 
          onChange={nameChangeHandler}
        />
        </div>
        <div>
          number: <input 
            type="text"
            name="number"
            value={newNumber} 
            onChange={nameChangeHandler}
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
      {persons.map(p => <p key={p.name}>{p.name} {p.number}</p>)}
    </div>
  )
}

export default App

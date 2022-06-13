import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const nameChangeHandler = event => {
    setNewName(event.target.value);
  }

  const nameSubmitHandler = event => {
    event.preventDefault();

    const person = {name: newName};
    const exists = persons.findIndex(p => p.name === newName) !== -1;

    if(exists) return alert(`${newName} already exists in phonebook`); 
    setPersons(persons.concat({name: newName}));
    setNewName("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input type="text" value={newName} onChange={nameChangeHandler}/>
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
      {persons.map(p => <p key={p.name}>{p.name}</p>)}
    </div>
  )
}

export default App

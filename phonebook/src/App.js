import { useState } from 'react'
import Filter from "./components/Filter/Filter";
import PersonForm from './components/PersonForm/PersonForm';
import Persons from "./components/Persons/Persons";

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
      <Filter 
        searched={searched}
        changeHandler={changeHandler}
      />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        nameSubmitHandler={nameSubmitHandler}
        changeHandler={changeHandler}
      />
      <h2>Numbers</h2>
      <Persons filtered={filtered} />
    </div>
  )
}

export default App

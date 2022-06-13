import { useState, useEffect } from 'react'
import Filter from "./components/Filter/Filter";
import PersonForm from './components/PersonForm/PersonForm';
import Persons from "./components/Persons/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searched, setSearched] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(res => setPersons(res.data))
      .catch(err => console.log(err));
  }, [])

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

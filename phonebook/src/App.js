import { useState, useEffect } from 'react'
import Filter from "./components/Filter/Filter";
import PersonForm from './components/PersonForm/PersonForm';
import Persons from "./components/Persons/Persons";
import axios from "axios";
import { getAll, createEntry, updateEntry, deleteEntry } from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searched, setSearched] = useState("");

  useEffect(() => {
    getAll()
      .then(res => setPersons(res))
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

    const person = {name: newName, number: newNumber};
    createEntry(person)
      .then(data => {
        setPersons([...persons, data]);
      })
    setNewName("");
    setNewNumber("");
  }

  const deleteHandler = id => {
    const person = persons.find(p => p.id === id);
    const confirm = window.confirm(`delete ${person.name}`);
    if(confirm) {
      deleteEntry(id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== id));
      })
    }
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
      <Persons filtered={filtered} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App

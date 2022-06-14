import { useState, useEffect } from 'react'
import Filter from "./components/Filter/Filter";
import PersonForm from './components/PersonForm/PersonForm';
import Persons from "./components/Persons/Persons";
import Notification from "./components/Notification/Notification";
import { getAll, createEntry, updateEntry, deleteEntry } from "./services/phonebook";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searched, setSearched] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

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
    const existingPerson = persons.find(p => p.name === newName);

    if(existingPerson) {
      const confirm = window.confirm(`${newName} already exists in phonebook replace old number with new one??`);
      if(confirm) {
        updateEntry(existingPerson.id, {name: newName, number: newNumber})
        .then(res => {
          setPersons(persons.map(p => p.name === newName ? res : p));
          setNewName("");
          setNewNumber("");
        })
        .catch(err => {
          setMessage(`${newName} has already been removed from server`)
          setError(true);
          setTimeout(() => {
            setMessage(null);
            setError(false);
          }, 3000)
        })
      }
      return;
    }
    const person = {name: newName, number: newNumber};
    createEntry(person)
      .then(data => {
        setPersons([...persons, data]);
        setMessage(`added ${newName}`);

        setTimeout(() => {
          setMessage(null);
        }, 3000)
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
      <Notification error={error} message={message} />
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

import { useState } from 'react'
import { useEffect } from 'react'
import entryService from './services/entries'

const Person = ({ name, number, id, handleDeletion }) => {
  console.log('running Person',name,id)
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td><button onClick={handleDeletion}>delete</button></td>
    </tr>)
}

const Persons = ({ personsToShow, handleDeletionFor }) => {
  console.log('running Persons')
  return (
    <table>
      <tbody>
        {personsToShow.map(person =>
          <Person name={person.name} number={person.number} key={person.name} id={person.id} handleDeletion={() => handleDeletionFor(person.id, person.name)} />)}
      </tbody>
    </table>
  )
}

const Filter = ({ newFilter, handleFilterChange }) => (
  <div>
    filter shown with: <input
      value={newFilter}
      onChange={handleFilterChange} />
  </div>
)

const PersonForm = ({ handleSubmission, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={handleSubmission}>
    <div>
      name: <input
        value={newName}
        onChange={handleNameChange} />
    </div>
    <div>
      number: <input
        value={newNumber}
        onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    entryService
      .getAll()
      .then(initialEntries => {
        setPersons(initialEntries)
      })
  }, [])

  const handleSubmission = (event) => {
    event.preventDefault()
    if (!persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      const newEntry = { "name": newName, "number": newNumber }
      entryService
        .createEntry(newEntry)
        .then(returnedEntry=>{
          setPersons(persons.concat(returnedEntry))
          setNewName('')
          setNewNumber('')
          setNewFilter('')
        })
    }
    else { alert(`${newName} is already added to phonebook`) }
  }

  const handleDeletionFor = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      entryService.deleteEntry(id)
        .then(response => {
          console.log('deleted', response)
          entryService.getAll()
          .then(initialEntries => {
            setPersons(initialEntries)
            setNewName('')
            setNewNumber('')
          })
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  console.log('App run')
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add new entry</h3>
      <PersonForm handleSubmission={handleSubmission} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDeletionFor={handleDeletionFor} />
    </div>
  )
}

export default App
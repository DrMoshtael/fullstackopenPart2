import { useState } from 'react'
import { useEffect } from 'react'

const Person = ({ name, number }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>)
}

const Persons = ({filteredPersons}) => (
  <table>
    <tbody>
      {filteredPersons.map(person =>
        <Person name={person.name} number={person.number} key={person.name} />)}
    </tbody>
  </table>
)

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
  const initialPersons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]
  const [persons, setPersons] = useState(initialPersons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(initialPersons)

  const handleSubmission = (event) => {
    event.preventDefault()
    if (!persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      const updatedPersons = persons.concat({ name: newName, number: newNumber })
      setPersons(updatedPersons)
      setFilteredPersons(updatedPersons)
      setNewName('')
      setNewNumber('')
      setNewFilter('') //To ensure the filter matches the rendered list
    }
    else { alert(`${newName} is already added to phonebook`) }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('before', newFilter)
    setNewFilter(event.target.value)
    console.log('after', newFilter)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))

  }

  // useEffect(() => {
  //   console.log('before useEffect',newFilter)
  //   setFilteredPersons(persons.filter(person=>person.name.toLowerCase().includes(newFilter.toLowerCase())))
  //   console.log('after useEffect',newFilter)
  // }, [newFilter])


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add new entry</h3>
      <PersonForm handleSubmission={handleSubmission} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App
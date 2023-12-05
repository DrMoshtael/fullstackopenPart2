import { useState } from 'react'
import { useEffect } from 'react'

const Person = ({ name, number }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  const handleSubmission = (event) => {
    event.preventDefault()
    if (!persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
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
    console.log('before',newFilter)
    setNewFilter(event.target.value)
    console.log('after',newFilter)
    
  }

  useEffect(() => {
    console.log('before useEffect',newFilter)
    setFilteredPersons(persons.filter(person=>person.name.toLowerCase().includes(newFilter.toLowerCase())))
    console.log('after useEffect',newFilter)
  }, [newFilter])


  return (
    <div>
      <div>debug: {newFilter}</div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input 
        value={newFilter}
        onChange={handleFilterChange} />
      </div>
      <h2>add new entry</h2>
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
      <h2>Numbers</h2>
      <table>
        <tbody>
          {filteredPersons.map(person =>
            <Person name={person.name} number={person.number} key={person.name} />)}
        </tbody>
      </table>
    </div>
  )
}

export default App
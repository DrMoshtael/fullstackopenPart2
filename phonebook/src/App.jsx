import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

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

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(()=> {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      console.log('promise fulfilled')
      setPersons(response.data)
      setFilteredPersons(response.data)
    })
  },[])

  const handleSubmission = (event) => {
    event.preventDefault()
    if (!persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      const updatedPersons = persons.concat({ name: newName, number: newNumber })
      setPersons(updatedPersons)
      setFilteredPersons(updatedPersons)
      setNewName('')
      setNewNumber('')
      setNewFilter('') //To ensure the filter matches the rendered list

      axios.post('http://localhost:3001/persons',{"name": newName, "number": newNumber})
        .then(response=>console.log(response))

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
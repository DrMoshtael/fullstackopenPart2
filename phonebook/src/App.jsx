import { useState } from 'react'

const Person = ({name}) => <p>{name}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmission = (event) => {
    event.preventDefault()
    setPersons(persons.concat({name: newName  }))
    setNewName('')
  }
  
  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmission}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person=>
          <Person name={person.name} key={person.name} />)}
      </div>
    </div>
  )
}

export default App
import pService from '../services/persons'
import { useState } from 'react'

const closeMessage = (setMessage) => {
  setTimeout(() => {
    setMessage(null)
  }, 5000)
}

const Filter = ({ searchStr, setSearchStr }) => {
  const handleSearchChange = (event) => setSearchStr(event.target.value)
  return (
    <div>
      filter shown with:{' '}
      <input value={searchStr} onChange={handleSearchChange}></input>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) return null
  return <div className={message[1]}>{message[0]}</div>
}

const AddNew = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleNameChange = (event) => setNewName(event.target.value)

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (nameExists(newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        replaceNumber(newPerson)
        return
      }else{
        clearFields()
      return
    }}
    createPerson(newPerson)
  }

  const nameExists = (name) => {
    const names = persons.map((p) => p.name.toLowerCase())
    if (names.includes(name.toLowerCase())) return true
    return false
  }

  const clearFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const replaceNumber = (newPerson) => {
    const { id }= persons.find((p) => p.name === newName)
      pService
        .replace(id, newPerson)
        .then((initPerson) => {
          setPersons(persons.map((p) => (p.id !== id ? p : initPerson)))
          setMessage([
            `number of ${newName} updated to: ${newNumber}`,
            'infoMessage',
          ])
          clearFields()
          closeMessage(setMessage)
        })
        .catch((error) => {
          setMessage([
            `${newName} does not exist in server. Refresh page to update list.`,
            'errorMessage',
          ])
          closeMessage(setMessage)
        })
  }

  const createPerson = (newPerson) => {
    pService
    .create(newPerson)
    .then((initPerson) => {
      setPersons(persons.concat(initPerson))
      setMessage([`Added ${newName}`, 'infoMessage'])
      clearFields()
      closeMessage(setMessage)
    })
    .catch((error) => {
      setMessage([`${error.response.data.error}`, 'errorMessage'])
      closeMessage(setMessage)
    })
  }

  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{' '}
          <input value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type='submit' className='greenButton'>add</button>
        </div>
      </form>
    </div>
  )
}

const Numbers = ({ persons, setPersons, searchStr, setMessage }) => {
  const filteredList = persons.filter((p) =>
    p.name.toLowerCase().includes(searchStr.toLowerCase())
  )

  const remove = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      pService
        .remove(id)
        .then((res) => {
          setPersons(persons.filter((p) => p.id !== id))
          setMessage([`${name} deleted`, 'infoMessage'])
          closeMessage(setMessage)
        })
        .catch((err) => {
          console.log(err)
          setMessage([`${err.message}, ${err.name}`, 'errorMessage'])
          closeMessage(setMessage)
        })
    }
  }

  return (
    <div>
      <h2>Numbers</h2>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {filteredList.map((p) => (
          <li key={p.id}>
            {p.name} {p.number}{' '}
            <button onClick={() => remove(p.id, p.name)} className='redButton'>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* eslint-disable  */
export default { Numbers, AddNew, Filter, Notification }
/* eslint-enable */

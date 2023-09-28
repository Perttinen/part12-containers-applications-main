import { useEffect, useState } from "react";
import phoneBook from "./components/phoneBook";
import pService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    pService.getAll().then((initPers) => setPersons(initPers));
  }, []);

  return (
    <div>
      <div className='header'>
        <h1>Phonebook</h1>
      </div>
      
      <phoneBook.Notification message={message} />
      <phoneBook.Filter searchStr={searchStr} setSearchStr={setSearchStr} />
      <hr/>
      <div className="addNew">
      <phoneBook.AddNew 
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      </div>
      <hr/>

      <phoneBook.Numbers
        persons={persons}
        setPersons={setPersons}
        searchStr={searchStr}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;

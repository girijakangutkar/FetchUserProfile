import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    userProfile();
  }, []);

  const findUser = () => {
    return user.filter((users) =>
      users.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  async function userProfile() {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUser(response.data);
      {
        console.log(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.log("Error occurred:", err);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="searchBar">
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="container">
        {findUser().map((person) => (
          <div key={person.id} className="userCard">
            <div className="col1">
              <p>{person.name}</p>
              <b>Email:</b>
              <p>{person.email}</p>
              <b>City:</b>
              <p>{person.address.city}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

import './App.css';
import { useState } from "react";
import axios from "axios"
import Nav from './components/Nav';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [newWage, setNewWage] = useState(0);

  const addEmployee = () => {
    axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      console.log("success");
    })
  };

  const getEmployees = () => {
    axios.get("http://localhost:3001/employees",).then((response) => {
      setEmployeeList(response.data)
    })
  }

  const updateEmployeeWage = (id) => {
    axios.put("http://localhost:3001/update", {
      wage: newWage,
      id: id
    }).then((reponse) => {
      setEmployeeList(employeeList.map((val) => {
        return val.id === id ? { id: val.id, name: val.name, country: val.country, age: val.age, position: val.position, wage: newWage } : val
      }))
    })
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then((response) => {
        setEmployeeList(employeeList.filter((val) => {
          return val.id !== id;
        }))
      })
  }


  return (
    <div className="app">
      <Nav />
      <div className="information">
        <label>Name: </label>
        <input className="input" type="text" onChange={(event) => { setName(event.target.value) }} />

        <label>Age: </label>
        <input className="input" type="number" onChange={(event) => { setAge(event.target.value) }} />

        <label>Country: </label>
        <input className="input" type="text" onChange={(event) => { setCountry(event.target.value) }} />

        <label>Position: </label>
        <input className="input" type="text" onChange={(event) => { setPosition(event.target.value) }} />

        <label>Wage (year): </label>
        <input className="input" type="number" onChange={(event) => { setWage(event.target.value) }} />
        <button className="btn" onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees} className="btn" >Show Employees</button>

        {employeeList.map((val, key) => {
          return <div className="employee" >
            <div className="employee_infoLeft">
              <h3>Name: {val.name}</h3>
              <h3>Age: {val.age}</h3>
              <h3>Country: {val.country}</h3>
              <h3>Position: {val.position}</h3>
              <h3>Wage: {val.wage}</h3>
            </div>

            <div className="employee_infoRight">
              <input
                className="input"
                type="text"
                placeholder="Wage"
                onChange={(event) => {
                  setNewWage(event.target.value);
                }}
              />
              <button
                className="btn"
                onClick={() => {
                  updateEmployeeWage(val.id);
                }}
              >
                {" "}
                  Update
                </button>
              <button className="btn" onClick={() => { deleteEmployee(val.id) }}>Delete</button>
            </div>
          </div>
        })}

      </div>
    </div>
  );
}

export default App;

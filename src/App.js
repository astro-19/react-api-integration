import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css'

const App = () => {

  const [apiData, setApiData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dishesData, setDishesData] = useState([]);

  const myStyle = {
    marginLeft: "10vh"
  }

  const baseUrl = "http://localhost:3019"

  const getDishes = async () => {
    await axios.get(`${baseUrl}/dishes`)
    .then(data => {
      console.log(data.data)
      setDishesData(data.data)
      setDataLoaded(true)
    });
  }

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      setApiData(response.data)
      setDataLoaded(true)
    });

    getDishes();

  }, []);

  if (!dataLoaded) return <div><h1 style={myStyle}> Please wait some time.... </h1></div>;

  return (
    <>
      <div className = "App">
            <h1> Fetch data from an api in react </h1>
            <table>
                  <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Geolocation</th>
                  <th>Phone</th>
                  <th>Website</th>
                  <th>Company</th>
                  </tr>
              {
                apiData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>
                        Street: {item.address.street},
                        Suite: {item.address.suite},
                        City: {item.address.city},
                        Zipcode: {item.address.zipcode}
                      </td>
                      <td>
                        LAT: {item.address.geo.lat},
                        LNG: {item.address.geo.lng}
                      </td>
                      <td>{item.phone}</td>
                      <td>{item.website}</td>
                      <td>
                        Name: {item.company.name},
                        CatchPhrase: {item.company.catchPhrase},
                        BS: {item.company.bs}
                      </td>
                    </tr>
                ))
              }
            </table>
        </div>

        <div className = "App">
            <h1> Fetch data from an api in react </h1>
            <table>
                  <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  </tr>
              {
                dishesData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.image}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>{item.description}</td>
                    </tr>
                ))
              }
            </table>
        </div>
    </>
  )
}

export default App

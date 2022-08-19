import React, {useState, useEffect} from 'react';
import './App.css'

const App = () => {

  const [apiData, setApiData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  // const [dishesData, setDishesData] = useState([]);

  const myStyle = {
    marginLeft: "10vh"
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((data) => data.json())
    .then((json) => {
      setApiData(json)
      setDataLoaded(true)
    });
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
    </>
  )
}

export default App

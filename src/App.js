import React, {useState, useEffect} from 'react';
import './App.css'

const App = () => {

  const [apiData, setApiData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((data) => data.json())
    .then((json) => {
      setApiData(json)
      setDataLoaded(true)
    });
  });

  if (!dataLoaded) return <div><h1> Please wait some time.... </h1></div>;

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
                    </tr>
                ))
              }
            </table>
        </div>
    </>
  )
}

export default App


  // < ul key = { item.id } >
  //   <li>
  //     User_Name: {item.username},
  //     Full_Name: {item.name},
  //     User_Email: {item.email},
  //     Address: {item.address.street}, {item.address.suite}, {item.address.city}, {item.address.zipcode}
  //     Geo: {item.address.geo.lat}, {item.address.geo.lng}
  //   </li>
  //               </ >
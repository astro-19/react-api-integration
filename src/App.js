import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css'

const App = () => {

  const [dataLoaded, setDataLoaded] = useState(false);
  const [promotionData, setPromotionData] = useState([]);
  const [dishesData, setDishesData] = useState([]);
  const [leaderData, setLeadersData] = useState([]);

  // const myStyle = {
  //   marginLeft: "10vh"
  // }

  const password = 'password';
  const username = 'admin';

  const baseUrl = "http://localhost:3019";

  const getDishes = async () => {
    await axios.get(`${baseUrl}/dishes`, { auth:{
      username: username,
      password: password
    }})
    .then(data => {
      console.log(data.data)
      setDishesData(data.data)
      setDataLoaded(true)
    });
  }

  const getPromotions = async () => {
    await axios.get(`${baseUrl}/promotions`, { auth:{
      username: username,
      password: password
    }})
    .then(data => {
      console.log(data.data)
      setPromotionData(data.data)
      setDataLoaded(true)
    })
  }

  const getLeaders = async () => {
    await axios.get(`${baseUrl}/leaders`, { auth:{
      username: username,
      password: password
    }})
    .then(data => {
      console.log(data.data)
      setLeadersData(data.data)
      setDataLoaded(true)
    })
  }

  useEffect(() => {

    getDishes();
    getPromotions();
    getLeaders();

  });

  if (!dataLoaded) return <div className="spinner-3"></div>;

  return (
    <>

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

        <div className = "App">
            <h1> Fetch data from an api in react </h1>
            <table>
                  <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Label</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Featured</th>
                  </tr>
              {
                promotionData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.image}</td>
                      <td>{item.label}</td>
                      <td>{item.price}</td>
                      <td>{item.description}</td>
                      <td>{item.featured ? 'true' : 'false'}</td>
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
                  <th>Designation</th>
                  <th>Abbr</th>
                  <th>Description</th>
                  <th>Featured</th>
                  </tr>
              {
                leaderData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.image}</td>
                      <td>{item.designation}</td>
                      <td>{item.abbr}</td>
                      <td>{item.description}</td>
                      <td>{item.featured ? 'true' : 'false'}</td>
                    </tr>
                ))
              }
            </table>
        </div>

    </>
  )
}

export default App

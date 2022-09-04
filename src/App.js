import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css'
import { Buffer } from 'buffer';

const App = () => {

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dishesData, setDishesData] = useState([]);

  // const [promotionData, setPromotionData] = useState([]);
  // const [leaderData, setLeadersData] = useState([]);

  const baseUrl = "http://localhost:3019";

  const USERNAME = "admin";
  const PASSWORD = "password";

  const token = `${USERNAME}:${PASSWORD}`;
  const encodedToken = Buffer.from(token).toString('base64')

  const header = { 'Authorization': 'Basic ' + encodedToken };
  console.log(header)
   //header("Access-Control-Allow-Headers: *");
  const AUTH_TOKEN = `Basic ${encodedToken}`

  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  const getDishes = async () => {
    await axios.get(`${baseUrl}/dishes`, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"} })
        .then(data => {
        console.log(data.data)
        setDishesData(data.data)
        setDataLoaded(true)
      });
  }

  // const getDishes = async () => {
  //   await fetch(`${baseUrl}/dishes`, { headers: header })
  //     .then(data => data.json())
  //     .then((json) => {
  //       console.log(json);
  //       setDishesData(json);
  //       setDataLoaded(true)});
  // }


  // const getPromotions = async () => {
  //   await axios.get(`${baseUrl}/promotions`, { headers: { 'Authorization': 'Basic ' + encodedToken } }, { withCredentials: true })
  //     .then(data => {
  //       console.log(data.data)
  //       setPromotionData(data.data)
  //       setDataLoaded(true)
  //     })
  // }

  // const getLeaders = async () => {
  //   await axios.get(`${baseUrl}/leaders`, { headers: { 'Authorization': 'Basic ' + encodedToken } }, { withCredentials: true })
  //     .then(data => {
  //       console.log(data.data)
  //       setLeadersData(data.data)
  //       setDataLoaded(true)
  //     })
  // }

  useEffect(() => {

    getDishes();
    // getPromotions();
    // getLeaders();

  });

  if (!dataLoaded) return <div className="spinner"></div>;

  return (
    <>

      <div className="App">
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

      {/* <div className="App">
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

      <div className="App">
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
      </div> */}

    </>
  )
}

export default App

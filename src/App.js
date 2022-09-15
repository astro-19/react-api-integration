import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css'
import { Buffer } from 'buffer';

const App = () => {

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dishesData, setDishesData] = useState([]);

  const [promotionData, setPromotionData] = useState([]);
  const [leaderData, setLeadersData] = useState([]);

  const baseUrl = "http://localhost:3019";

  const USERNAME = "admin";
  const PASSWORD = "password";

  const token = `${USERNAME}:${PASSWORD}`;
  const encodedToken = Buffer.from(token).toString('base64')

  const AUTH_TOKEN = `Basic ${encodedToken}`

  const getDishes = async () => {
    await axios.get(`${baseUrl}/dishes`,
      {
        headers: {
          "Authorization": `${AUTH_TOKEN}`
        }
      })
      .then(data => {
        setDishesData(data.data)
        setDataLoaded(true)
      });
  }

  const postDishes = async () => {

    await axios.post(`${baseUrl}/dishes`, {
      body: {
        name: "Rasgulla",
        image: "images/rasgulla.png",
        category: "sweets",
        price: 499,
        description: "Bengali Sweet",
        comments: [
          {
            rating: 5,
            comment: "Imagine all the eatables, living in conFusion!",
            author: "Nihal P"
          }
        ]
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${AUTH_TOKEN}`,
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    })
      .then((resData) => setSuccessMessage(resData))
      .catch((err) => {
        if (err.response.status === 401) {
          setError("You're not authorized")
        }
      });
  }


  const getPromotions = async () => {
    await axios.get(`${baseUrl}/promotions`,
      {
        headers: {
          "Authorization": `${AUTH_TOKEN}`
        }
      })
      .then(data => {
        setPromotionData(data.data)
        setDataLoaded(true)
      })
  }

  const getLeaders = async () => {
    await axios.get(`${baseUrl}/leaders`,
      {
        headers: {
          "Authorization": `${AUTH_TOKEN}`
        }
      })
      .then(data => {
        setLeadersData(data.data)
        setDataLoaded(true)
      })
  }

  useEffect(() => {

    // setInterval(() => {
    //   getDishes();
    //   getPromotions();
    //   getLeaders();
    // }, 30000)

    getDishes();
    getPromotions();
    getLeaders();

    // setInterval(() => {
    //   console.log('Interval triggered');
    // }, 60000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <button type="button" className="post-btn" onClick={(e) => { postDishes(e) }}>
          POST Dishes
        </button>
        <div>
          <div className="error">
            {error}
          </div>
          <div className="success">
            {successMessage}
          </div>
        </div>
      </div>

      <div className="App">
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
      </div>

    </>
  )
}

export default App

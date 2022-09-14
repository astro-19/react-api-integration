import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css'
import { Buffer } from 'buffer';

const App = () => {

  const btnStyles = {
    width: '10rem',
    height: '2rem',
    backgroundColor: 'rgba(12, 123, 128)',
    color: 'rgba(255, 255, 255)',
    cursor: 'pointer'
  }

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
        // console.log(data.data)
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
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        "Authorization": `${AUTH_TOKEN}`
      },
      withCredentials: true,
    })
    .then((resData) => {
      console.log(resData)
    }).catch((err) => {
      console.log(err)
    })
  }


  const getPromotions = async () => {
    await axios.get(`${baseUrl}/promotions`,
      {
        headers: {
          "Authorization": `${AUTH_TOKEN}`
        }
      })
      .then(data => {
        // console.log(data.data)
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
        // console.log(data.data)
        setLeadersData(data.data)
        setDataLoaded(true)
      })
  }

  useEffect(() => {

    getDishes();
    getPromotions();
    getLeaders();

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

        <button type="button" style={btnStyles} onClick={(e)=> {postDishes(e)}}>
          POST Dishes
        </button>
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

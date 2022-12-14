import React, { useState, useEffect } from 'react';
import axios from 'axios'
import AUTH_TOKEN from '../Auth/Auth'

const ViewData = () => {

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [dataLoaded, setDataLoaded] = useState(false);

    const [dishesData, setDishesData] = useState([]);

    const [promotionData, setPromotionData] = useState([]);
    const [leaderData, setLeadersData] = useState([]);

    const baseUrl = "http://localhost:3019";

    const getDishes = async () => {
        setDataLoaded(true)
        await axios.get(`${baseUrl}/dishes`,
            {
                headers: {
                    "Authorization": `${AUTH_TOKEN}`
                }
            })
            .then(data => {
                setDishesData(data.data)
                setDataLoaded(false)
                setError(false)
                setSuccessMessage(false)
            });
    }

    const postDishes = async () => {
        setDataLoaded(true)
        await axios.post(`${baseUrl}/dishes`,
            {
                name: "Rasgulla Two",
                image: "images/rasgullaTwo.png",
                category: "sweets",
                price: 501,
                description: "Bengali Sweet Two",
                comments: [
                    {
                        rating: 4,
                        comment: "Imagine all the eatables, living in conFusion!",
                        author: "Nihal Pan"
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${AUTH_TOKEN}`,
                    'Access-Control-Allow-Origin': '*'
                }
            },
            { withCredentials: true }
        )
            .then((resData) => {
                if (resData.status === 200) {
                    setSuccessMessage("Dish saved successfully");
                    setDataLoaded(false)
                    getDishes();
                }
            })
            .catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    setError("You're not authorized")
                }
            });
    }


    const getPromotions = async () => {
        setDataLoaded(true)
        await axios.get(`${baseUrl}/promotions`,
            {
                headers: {
                    "Authorization": `${AUTH_TOKEN}`
                }
            })
            .then(data => {
                setPromotionData(data.data)
                setDataLoaded(false)
            })
    }

    const getLeaders = async () => {
        setDataLoaded(true)
        await axios.get(`${baseUrl}/leaders`,
            {
                headers: {
                    "Authorization": `${AUTH_TOKEN}`
                }
            })
            .then(data => {
                setLeadersData(data.data)
                setDataLoaded(false)
            })
    }

    useEffect(() => {

        getDishes();
        getPromotions();
        getLeaders();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {dataLoaded ? <div className="spinner"></div> : <> <div className="App">
                <h1> Dishes </h1>
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

                <button type="button" className="post-btn bg-cyan-400 align-center" onClick={(e) => { postDishes(e) }}>
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
                    <h1> Promotions</h1>
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
                    <h1> Leaders </h1>
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
            }

        </>
    )
}

export default ViewData

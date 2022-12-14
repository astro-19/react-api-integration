import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className='container:lg bg-gray-400 h-14 mx-auto'>
                <div className='flex justify-end p-4 mx-2'>
                    <div className='pr-4 font-bold' onClick={() => navigate('/view')}>View</div>
                    <div className='pr-4 font-bold'>Add Dish</div>
                    <div className='pr-4 font-bold'>Add Promotion</div>
                    <div className='pr-4 font-bold'>Add Leader</div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Home
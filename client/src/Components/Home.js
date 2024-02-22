import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom'
const Home = () => {
    const history=useHistory();
    history.push('/signup');
    return (
        <div>
            
        </div>
    )
}

export default Home

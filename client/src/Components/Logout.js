import React,{useEffect} from 'react'
import { useHistory } from 'react-router'
const Logout = () => {
    const history=useHistory();
    useEffect(() => {
        fetch("/logout",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then(()=>{
            history.push('/login');
        }).catch((err)=>{
            console.log(err);
        })
    },)
    return (
        <div>
            
        </div>
    )
}

export default Logout;

import React,{useState} from 'react'
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const history=useHistory();
    const usersigninhandler=()=>{
        history.push('/signup');
    }
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const setuseremail=(e)=>{
       setemail(e.target.value);
    }
    const setuserpassword=(e)=>{
        setpassword(e.target.value);
    }
    const userlogin=async(e)=>{
        e.preventDefault();
      const res=await fetch('/login',{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email,password
        })
      });
      const data=await res.json();
      if(res.status===422||res.status===401||!data)
      {
          window.alert("INVALID CREDENTIAL🕵️‍♂️");
          console.log("invalid")
      }
      else{
         toast.success("LOGIN SUCCESS😃");
          history.push('/mainpage')
      }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="posstyle">
                    <span>Don't have an account?<span className="loginbtn" onClick={usersigninhandler}>Get started</span></span>
                </div>
                <div className="row align-items-center">
                    <div className="col img_container">
                        <div className="imgbox">
                            <div>
                                <img src="../logo.svg" alt="logo" className="logo"></img>
                                <span className="heading">Hi,Welcome Back</span>
                            </div>
                            <img src="../Login.png" alt="signup.png"></img>
                        </div>
                    </div>
                    <div className="col form_container">
                        <div className="headingpos">
                            <span className="headingform">Sign in to Manthan</span>
                        </div>
                        <form method="POST">
                            <div className="form-group w-75">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control p-2 w-100" id="exampleInputEmail1" value={email} onChange={setuseremail} aria-describedby="emailHelp" placeholder="Enter email" autoComplete="off" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group w-75">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control p-2" id="exampleInputPassword1" value={password} onChange={setuserpassword} placeholder="Password" autoComplete="off" />
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                            </div>
                            <button type="submit" className="btn btn-success btn-lg btn-block my-2 w-75" onClick={userlogin}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login

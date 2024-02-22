import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
    const [firstname,setfirstname]=useState("");
    const [lastname,setlastname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [cpassword,setcpassword]=useState("");
    const history=useHistory();
    const usersigninhandler=()=>{
        history.push('/login');
    }
    const userfname=(e)=>{
      setfirstname(e.target.value);
    }
    const userlname=(e)=>{
        setlastname(e.target.value);
    }
    const useremail=(e)=>{
        setemail(e.target.value);
    }
    const userpassword=(e)=>{
        setpassword(e.target.value);
    }
    const usercpassword=(e)=>{
        setcpassword(e.target.value);
    }
   const  sumbituserdetail=async(e)=>{
       e.preventDefault();
       const res=await fetch('/signup',{
           method:"POST",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               firstname,lastname,email,password,cpassword
           })
       });
       const data=await res.json();
       if(res.status===422||!data)
       {
        toast.warning("OOPS SOMETHING WRONG😔");
           console.log("INVALID REGISTRATION");
       }
       else{
           console.log(res.status);
           toast.success("REGISTER SUCCESSFULLY KEEP CODING😊",{
               position:"top-center",
           });
           history.push('/login');
       }
   }
    return (
        <div>
            <div className="container-fluid">
            <div className="posstyle">
                    <span>Already have an account?<span className="loginbtn" onClick={usersigninhandler}>Login</span></span>
             </div>
                <div className="row align-items-center">
                    <div className="col img_container">
                        <div className="imgbox">
                            <div>
                                <img src="../logo.svg" alt="logo" className="logo"></img>
                                <span className="heading">LET'S CODE YOUR FUTURE</span>
                            </div>
                            <img src="../signup.png" alt="signup.png"></img>
                        </div>
                    </div>
                    <div className="col form_container">
                        <div className="headingpos">
                            <span className="headingform">Get Started absolutely free.</span>
                            <div className="parastyle">Free forever. No credit card needed.</div>
                        </div>
                        <form method="POST">
                            <div className="form-row">
                                <div className="col">
                                    <label for="firstname">First Name</label>
                                    <input type="text" className="form-control p-3" id="firstname" value={firstname} onChange={userfname} placeholder="First name" autoComplete="off" />
                                </div>
                                <div className="col">
                                    <label for="lastname">Last Name</label>
                                    <input type="text" className="form-control p-3" id="lastname" value={lastname} onChange={userlname} placeholder="Last name" autoComplete="off" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control p-2" id="exampleInputEmail1" value={email} aria-describedby="emailHelp" onChange={useremail} placeholder="Enter email" autoComplete="off"/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control p-2" id="exampleInputPassword1" value={password} onChange={userpassword} placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Confirm Password</label>
                                <input type="password" className="form-control p-2" id="exampleInputPassword1" value={cpassword} onChange={usercpassword} placeholder="Password" />
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                            </div>
                            <button type="submit" className="btn btn-success btn-lg btn-block my-2" onClick={sumbituserdetail}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp

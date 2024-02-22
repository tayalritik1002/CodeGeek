import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import * as ReactBootStrap from "react-bootstrap";
import Card from './Card'
import Public from './Public';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
const MainPage = () => {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [QuestionName, setQuestionName] = useState("");
    const [QuestionTag, setQuestiontag] = useState("");
    const [QuestionSource, setQuestionSource] = useState("");
    const [QuestionUrl, setQuestionUrl] = useState("");
    const [database, userdatabase] = useState([]);
    const [Name,setuserName]=useState("");
    const userquestionname = (e) => {
        setQuestionName(e.target.value);
    }
    const userquestiontag = (e) => {
        setQuestiontag(e.target.value);
    }
    const userquestionsource = (e) => {
        setQuestionSource(e.target.value);
    }
    const userquestionurl = (e) => {
        setQuestionUrl(e.target.value);
    }
    const username=(e)=>{
        setuserName(e.target.value);
    }
    const userquestiondetail = async (event) => {
        const data = {
            QuestionName,
            QuestionTag,
            QuestionUrl,
            QuestionSource,
            Name
        }
        console.log(data);
        if (QuestionName && QuestionTag && QuestionUrl && QuestionSource) {
            event.preventDefault();
            const res = await fetch("/questionsave", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    QuestionName, QuestionTag, QuestionUrl, QuestionSource,Name
                })
            });
            const questiondata = await res.json();
            if (res.status === 422 || !questiondata) {
                window.alert("Question Not Added");
                toast.error("QUESTION NOT ADDED");
                console.error("Question Not Added");
            }
            else {
                console.log(questiondata);
                toast.success('Question Added Successfully🎉');
                showques();
            }
        }
        else {
            toast.error('FILL DETAILS PROPERLY');
        }
    }
    const showques = async () => {
        try {
            const res = await fetch('/QuestionShow', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            userdatabase(data);
            console.log(database);
            if (!res.status === 200 || !data) {
                toast("OOP's Something Went Wrong!!");
            }
        } catch (e) {
            console.log(e);
            history.push('/login');
        }
    }
    const logoutfun = () => {
        history.push('/login');
    }
    useEffect(() => {
        console.log(database[database.length-1]);
        showques();
    }, []);
    return (
        <>
            <div className="griddisplay">
                <Navbar/>
                <div className="main1">
                    <div class="container-fluid">
                        <div className="text-center my-4">
                            <button type="button" class="btn btn-success btn-lg show-modal" data-toggle="modal" data-target="#myModal">
                                +Add Question
                            </button>
                        </div>
                        <div class="modal-box">
                            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content clearfix">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                        <div class="modal-body">
                                            <div class="modal-icon"><i class="fas fa-crown"></i></div>
                                            <h3 class="title">Question Detail</h3>
                                            <ul class="description">
                                                <div class="input-container">
                                                    <input type="text" value={QuestionName} onChange={userquestionname} required="" />
                                                    <label>Question Name</label>
                                                </div>
                                                <div class="input-container">
                                                    <input type="text" value={QuestionTag} onChange={userquestiontag} required="" />
                                                    <label>Question Tag</label>
                                                </div>
                                                <div class="input-container">
                                                    <input type="text" value={QuestionUrl} onChange={userquestionurl} required="" />
                                                    <label>Question Url</label>
                                                </div>
                                                <div class="input-container">
                                                    <input type="text" value={QuestionSource} onChange={userquestionsource} required="" />
                                                    <label>Question Source</label>
                                                </div>
                                                <div class="input-container">
                                                    <input type="text" value={Name} onChange={username} required="" />
                                                    <label>User Name</label>
                                                </div>
                                            </ul>
                                            <button class="btn" data-dismiss="modal" onClick={userquestiondetail}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container1">
                            {
                                (database.map((e) => {
                                    if (e.QuestionName !== undefined) {
                                        return <Card quesname={`${e.QuestionName}`}
                                            questag={`${e.QuestionTag}`}
                                            quessource={`${e.QuestionSource}`}
                                            queslink={`${e.QuestionUrl}`}
                                            quesid={`${e._id}`}
                                            name={`${database[database.length - 1]}`}
                                        />
                                    }
                                }))
                            }
                        </div>
                    </div>
                </div>
                <div className="dashboard">
                    <div className="sidenavimg">
                        <img src="https://res.cloudinary.com/dkzihi39r/image/upload/v1634054046/USERPHOTO/xbgg4gariy46ybknnilw.jpg" className="userlogoimg"></img>
                        <form enctype="multipart/form-data">
                        <input type="file" name="image"></input>
                        </form>
                    </div>
                    <div class="box1">
                        <div class="our-services settings">
                            <div class="icon"> <img src="https://i.imgur.com/6NKPrhO.png" /> </div>
                            <div className="cardcontent">
                                <h4>Name:</h4>
                                <h4>{database[database.length - 1]}</h4>
                            </div>
                        </div>
                        <div class="our-services settings">
                            <div class="icon"> <img src="https://i.imgur.com/6NKPrhO.png" /> </div>
                            <div className="cardcontent">
                                <h4>Name:</h4>
                                <h4>{database[database.length - 1]}</h4>
                            </div>
                        </div>
                        <div class="our-services settings">
                            <div class="icon"> <img src="https://i.imgur.com/6NKPrhO.png" /> </div>
                            <div className="cardcontent">
                                <h4>Name:</h4>
                                <h4>{database[database.length - 1]}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}
export default MainPage;

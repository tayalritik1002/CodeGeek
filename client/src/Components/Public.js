import React, { useState,useEffect } from 'react'
import * as ReactBootStrap from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
import Card from './Card';
import CardPublic from './CardPublic';
const Public = (props) => {
    console.log(props.publicname);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const logoutfun = () => {
        history.push('/login');
    }
    const [QuestionName, setQuestionName] = useState("");
    const [QuestionTag, setQuestiontag] = useState("");
    const [QuestionSource, setQuestionSource] = useState("");
    const [QuestionUrl, setQuestionUrl] = useState("");
    const [publicdata, userpublicdata] = useState([]);
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
    const userquestiondetail = async(event) => {
        if(QuestionName&&QuestionTag&&QuestionUrl&&QuestionSource)
        {
        event.preventDefault();
        const res = await fetch("/publicquessave", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            QuestionName,QuestionTag,QuestionUrl,QuestionSource,Name
          })
        });
          const questiondata = await res.json();
        if (questiondata.status === 422 || !questiondata) 
        {
          window.alert("Question Not Added");
          console.error("Question Not Added");
        }
        else
        {
            window.alert("QUESTION ADDED😊");
             window.location.reload();
            showpubques();
        }
    }
}
    const showpubques=async()=>{
        const res=await fetch('/showpublic',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            }
        });
        const data=await res.json();
        console.log(data);
        userpublicdata(data);
        console.log(publicdata);
    }
    useEffect(() => {
        showpubques();
    }, [])
    return (
        <>
            <div className="publicpage">
                <div className="navigation">
                    <ReactBootStrap.Navbar bg="light" expand="lg">
                        <ReactBootStrap.Container>
                            <ReactBootStrap.Navbar.Brand href="#home"><img src="../logo.svg" alt="logo" className="logo1"></img></ReactBootStrap.Navbar.Brand>
                            <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
                                <ReactBootStrap.Nav className="me-auto">
                                    <ReactBootStrap.Nav.Link href="https://www.geeksforgeeks.org/top-algorithms-and-data-structures-for-competitive-programming/" target="_blank">CodingHelp</ReactBootStrap.Nav.Link>
                                    <ReactBootStrap.NavDropdown title="OnlineCodingIde" id="basic-nav-dropdown">
                                        <ReactBootStrap.NavDropdown.Item href="">CodeChef</ReactBootStrap.NavDropdown.Item>
                                        <ReactBootStrap.NavDropdown.Item href="">CodeBlocks</ReactBootStrap.NavDropdown.Item>
                                        <ReactBootStrap.NavDropdown.Item href="">Compiler</ReactBootStrap.NavDropdown.Item>
                                    </ReactBootStrap.NavDropdown>
                                    <ReactBootStrap.Nav.Link href="/mainpage">MainPage</ReactBootStrap.Nav.Link>
                                    <ReactBootStrap.Nav.Link href="/public">PublicPost</ReactBootStrap.Nav.Link>
                                </ReactBootStrap.Nav>
                            </ReactBootStrap.Navbar.Collapse>
                        </ReactBootStrap.Container>
                        <ReactBootStrap.Button variant="info" href="/compare" className="mx-2 text-light">
                            Compare User
                        </ReactBootStrap.Button>
                        <ReactBootStrap.Button variant="danger" onClick={handleShow}>
                            Important Coding Topics
                        </ReactBootStrap.Button>
                        <ReactBootStrap.Modal show={show} onHide={handleClose}>
                            <ReactBootStrap.Modal.Header closeButton>
                                <ReactBootStrap.Modal.Title>TOPICS</ReactBootStrap.Modal.Title>
                            </ReactBootStrap.Modal.Header>
                            <ReactBootStrap.Modal.Body>
                                <div className="topics">
                                    <a href="">Arrays</a>
                                    <a href="">Stacks</a>
                                    <a href="">Queues</a>
                                    <a href="">Linked Lists</a>
                                    <a href="">Trees</a>
                                    <a href="">Graphs</a>
                                    <a href="">Hash Tables</a>
                                </div>
                            </ReactBootStrap.Modal.Body>
                            <ReactBootStrap.Modal.Footer>
                                <ReactBootStrap.Button variant="secondary" onClick={handleClose}>
                                    Close
                                </ReactBootStrap.Button>
                            </ReactBootStrap.Modal.Footer>
                        </ReactBootStrap.Modal>
                        <ReactBootStrap.Button variant="success" href="/logout" className="logoutbtn">Logout</ReactBootStrap.Button>
                    </ReactBootStrap.Navbar>
                </div>
                <div>
                    <div className="text-center">
                        <button type="button" class="btn btn-success btn-lg show-modal my-4" data-toggle="modal" data-target="#myModal">
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
                    </div>
                    <div className="container1">
                    {
                        publicdata.map((e)=>{
                            console.log(e);
                           return( <CardPublic publicquesname={`${e.QuestionName}`}
                               publicquestag={`${e.QuestionTag}`}
                               publicquessrc={`${e.QuestionSource}`}
                               publicurl={`${e.QuestionUrl}`}
                               publiclike={`${e.Like}`}
                               publicdislike={`${e.Dislike}`}
                               publicid={`${e._id}`}
                               publicnamenew={`${e.Name}`}
                           />)
                        })
                    }
                    </div>
                </div>
        </>
    )
}

export default Public

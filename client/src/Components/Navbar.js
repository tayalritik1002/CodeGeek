import React from 'react'
import * as ReactBootStrap from "react-bootstrap";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
const Navbar = () => {
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
    const logoutfun = () => {
        history.push('/login');
    }
    return (
        <>
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
        </>
    )
}

export default Navbar

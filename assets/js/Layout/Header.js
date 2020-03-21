import React, {Component} from 'react';
import '../../css/header.css';
import {Link} from "react-router-dom";
import {Col, Container, Grid, Icon, Nav, Navbar, Row} from "rsuite";


export default function Header(){

   /* const navbar = (<Navbar expand="md" sticky="top">
        <Navbar.Brand href="#home">
            <img className="logo_image" src=""/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <i className="material-icons">notes</i>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link to="/" className="nav-link">Home </Link>
                <Link to="/authoring" className="nav-link">I miei contenuti</Link>
                <Link to="/codelab" className="nav-link">Jupyter Notebook</Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>);*/


        return (

            <nav id="main_header">
                <Container className="header_container">
                    <Nav>
                        <Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item>
                        <Nav.Item>News</Nav.Item>
                        <Nav.Item>Solutions</Nav.Item>
                        <Nav.Item>Products</Nav.Item>
                        <Nav.Item>About</Nav.Item>
                    </Nav>
                </Container>
            </nav>
        );

}

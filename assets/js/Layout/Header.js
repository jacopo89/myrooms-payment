import React, {Component} from 'react';
import '../../css/header.css';
import {ButtonToolbar, Col, Container, Dropdown, Grid, Icon, Nav, Navbar, Row} from "rsuite";
import {useTranslation} from "react-i18next";


export default function Header(){

    const { t, i18n } = useTranslation();
    const changeLanguage = code => {
        i18n.changeLanguage(code);
    };
    const logout = () => console.log("logout");

    const CustomDropdown = ({ ...props }) => (
        <Dropdown {...props}>
            <Dropdown.Item onClick={() => changeLanguage('it')} > It</Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage('en')} > En</Dropdown.Item>
        </Dropdown>
    );

        return (

            <nav id="main_header">
                <ButtonToolbar>
                    <CustomDropdown title="Hover" trigger="hover" />
                    <CustomDropdown title="Click" trigger="click" />
                    <CustomDropdown title="Right Click" trigger="contextMenu" />
                    <CustomDropdown title="Click and Hover" trigger={['click', 'hover']} />
                </ButtonToolbar>
            </nav>
        );

}

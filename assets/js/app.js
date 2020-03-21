/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';
import 'rsuite/dist/styles/rsuite-default.min.css';
import * as ReactDOM from "react-dom";
import React from "react";
import Header from "./Layout/Header";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';


function App(){
    console.log('Hello Webpack Encore! Edit me in assets/js/app.js');
    return <Header>boh</Header>;
}
ReactDOM.render(<App/>, document.getElementById('root'));
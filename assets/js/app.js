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
import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import {Provider, useSelector} from "react-redux";
import Login from "./Login/Pages/Login";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import reducer from "./Redux/reducer";
import Layout from "./Layout/Layout";
import Registration from "./Login/Pages/Registration";
import Dashboard from "./MainApp/Dashboard";
import './i18n';
import {useTranslation} from "react-i18next";
import {Button} from "rsuite";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';


function App(){

    const { t, i18n } = useTranslation();



    const {authenticated} = useSelector(state=>state);
    const registrationPage = <Layout page={<Registration/>}/>;
    const dashboardPage = <Layout page={<Dashboard/>}/>;
    const loginPage = <Layout page={<Login/>}/>;

    const mainApp =
        (<>
            <Switch>
                <Route path="/register" children={registrationPage}/>
                <Route path="/dashboard" children={dashboardPage}/>
            </Switch>
        </>);

    const authRequired =
        (<>
            <Switch>
                <Route exact path="/" children={loginPage} />
                <Route exact path="/register" children={registrationPage}/>
            </Switch>
        </>);


    const render = (authenticated) ? mainApp : authRequired ;

    return <>{render}</>;
}



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(
    applyMiddleware(thunk)
));


ReactDOM.render(  <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</Provider>, document.getElementById('root'));
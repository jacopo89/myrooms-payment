import React from "react";
import Header from "./Header";

function Layout(props){

        return (
            <div>
            <Header />
            <div style={{ paddingTop: '66px', position: 'absolute', height: '100vh', width: '100vw'}}>
                {props.page}
            </div>
    </div>
);
}

export default Layout;
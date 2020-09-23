import React from "react";
import Header from "./Header";

function Layout(props){


        return (
            <div>
                {false && <Header />}
            <div style={{position: 'absolute', height: '100vh', width: '100vw', display:"flex", alignItems:"center", justifyContent:"space-around"}}>
                {props.page}
            </div>
    </div>
);
}

export default Layout;
import React from "react";
import Header from "./Header";

function Layout(props){


        return (
            <>
                <div style={{position: "absolute", width: "100%", minHeight: "100%"}}>
                    <div style={{minHeight: '100%', width: '100vw', display:"flex", alignItems:"center", justifyContent:"space-around"}}>
                        {props.page}
                    </div>
                </div>
            </>);
}

export default Layout;



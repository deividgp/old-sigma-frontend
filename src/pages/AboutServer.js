import { useOutletContext } from "react-router-dom";
import * as React from 'react';

function AboutServer() {
    const description = useOutletContext();

    return (
        <div style={{ backgroundColor: "#613d5f", height: "100%", overflowY: "auto", flexGrow: "1" }}>
            <div style={{ padding: "20px" }}>
                {description}
            </div>
        </div>
    );
}

export default AboutServer;
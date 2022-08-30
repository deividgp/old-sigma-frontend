import React, { useState } from 'react';

export const ServersContext = React.createContext();

export const ServersProvider = ({ children }) => {
    const [servers, setServers] = useState([]);

    return (
        <ServersContext.Provider value={{ servers, setServers }}>
            {children}
        </ServersContext.Provider>
    );
};
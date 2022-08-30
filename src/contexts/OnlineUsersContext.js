import React, { useState } from 'react';

export const OnlineUsersContext = React.createContext();

export const OnlineUsersProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);

    return (
        <OnlineUsersContext.Provider value={{ onlineUsers, setOnlineUsers }}>
            {children}
        </OnlineUsersContext.Provider>
    );
};
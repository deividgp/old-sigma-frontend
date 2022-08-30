import React, { useState } from 'react';

export const ActiveContext = React.createContext();

export const ActiveProvider = ({ children }) => {
    const [active, setActive] = useState();

    return (
        <ActiveContext.Provider value={{ active, setActive }}>
            {children}
        </ActiveContext.Provider>
    );
};
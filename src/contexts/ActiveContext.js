import React, { useState } from 'react';

export const ActiveContext = React.createContext();

export const ActiveProvider = ({ children }) => {
    const [ type, setType ] = useState();
    const [ id, setId ] = useState();

    return(
        <ActiveContext.Provider value = {{ type, setType, id, setId }}>
            {children}
        </ActiveContext.Provider>
    );
};
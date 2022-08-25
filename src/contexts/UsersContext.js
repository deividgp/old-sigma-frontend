import React, { useState } from 'react';

export const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
    const [ users, setUsers ] = useState();
    const [ friends, setFriends ] = useState();
    const [ pending, setPending ] = useState();

    return(
        <UsersContext.Provider value = {{ users, setUsers, friends, setFriends, pending, setPending }}>
            {children}
        </UsersContext.Provider>
    );
};
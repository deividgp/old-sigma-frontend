import React, { useState } from 'react';

export const PendingFriendsContext = React.createContext();

export const PendingFriendsProvider = ({ children }) => {
    const [ pendingFriends, setpendingFriends ] = useState();

    return(
        <PendingFriendsContext.Provider value = {{ friends, setFriends }}>
            {children}
        </PendingFriendsContext.Provider>
    );
};
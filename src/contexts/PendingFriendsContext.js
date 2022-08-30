import React, { useState } from 'react';

export const PendingFriendsContext = React.createContext();

export const PendingFriendsProvider = ({ children }) => {
    const [pendingFriends, setPendingFriends] = useState([]);

    return (
        <PendingFriendsContext.Provider value={{ pendingFriends, setPendingFriends }}>
            {children}
        </PendingFriendsContext.Provider>
    );
};
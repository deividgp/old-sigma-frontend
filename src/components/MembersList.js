//import './ServerChat.css';

function MembersList({users}) {

    return (
        <div style={{backgroundColor: "#2B3180", minWidth: "200px", maxWidth: "200px", overflowY: "auto"}}>
            <ul>
                <li>MEMBERS</li>
                <li>&nbsp;</li>
                {users.map((user) => {
                    return (
                        <li key={user.id}>
                            {user.username}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default MembersList;
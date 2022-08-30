import "./UserState.css";
import { useContext } from "react";
import { OnlineUsersContext } from '../contexts/OnlineUsersContext';
import { UserContext } from "../contexts/UserContext";

function MembersList({ members, isOwner }) {
    const { onlineUsers } = useContext(OnlineUsersContext);
    const { user } = useContext(UserContext);

    return (
        <div style={{ backgroundColor: "#2B3180", minWidth: "200px", maxWidth: "200px", overflowY: "auto" }}>
            <ul>
                <li><b>MEMBERS</b></li>
                <li>&nbsp;</li>
                {members.map((member) => {
                    return (
                        <li key={member.id}>
                            <span className={onlineUsers.includes(member.id) ? "green" : "grey"} />
                            &nbsp;
                            {member.username}
                            &nbsp;
                            {
                                isOwner && member.id != user.id
                                    ?
                                    (<button>Kick</button>)
                                    :
                                    ""
                            }
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default MembersList;
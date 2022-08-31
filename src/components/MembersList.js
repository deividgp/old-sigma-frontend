import "./UserState.css";
import { useContext } from "react";
import { OnlineUsersContext } from '../contexts/OnlineUsersContext';
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import socket from '../socket';

function MembersList({ server, members, isOwner }) {
    const { onlineUsers } = useContext(OnlineUsersContext);
    const { user } = useContext(UserContext);

    const kickMember = (memberId) => {
        axios.delete("/servers/" + server.id + "/" + memberId)
            .then(() => {
                socket.emit("action", { room: memberId, action: "user_kicked", server });
            });
    };

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
                                isOwner && member.id !== user.id
                                    ?
                                    (<button onClick={() => kickMember(member.id)}>Kick</button>)
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
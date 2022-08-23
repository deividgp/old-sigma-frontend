//import './ServerChat.css';

function Chat() {
    return (
        <div style={{backgroundColor: "#613d5f", minWidth: "100px", height: "calc(100vh - 90px)", overflowY: "hidden", flexGrow: "1", overflowX: "hidden"}}>
            <div style={{overflowY: "auto", height: "calc(100vh - 90px - 50px - 15px)"}}>
                <ul>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                </ul>
            </div>
            <div style={{width: "calc(100vw - 472px)", height: "50px", bottom: "10px", display: "flex", position: "absolute", border: "solid 1px black"}}>
                <span contenteditable="true" style={{flex: "1"}}>sdfsd</span>
                <button>hola</button>
            </div>
        </div>
    );
}

export default Chat;
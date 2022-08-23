import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Me() {
    const { user, setUser } = useContext(UserContext);
    return (
        <div style={{backgroundColor: "#613d5f", height: "100%", overflowY: "auto" }}>
            L’aplicació que tinc pensat fer serà una aplicació de missatgeria semblant a Discord, 
                una aplicació basada en servidors (grups públics o privats on usuaris poden interactuar mitjançant 
                diferents canals que funcionen com a petits fórums per parlar d’un tema en concret) per l’àmbit gaming 
                i casual. La diferència és que vull enfocar la meva aplicació en l’àmbit professional i empresarial 
                principalment tot i que també tenen cabuda els sectors mencionats anteriorment, depenent de l’estructura 
                del servidor perquè la idea és fer-los altament configurables afegint canals i rols per controlar l’accés 
                dels usuaris entre altres opcions. També tindrà certa semblança amb Slack però el que no m’agrada d’aquesta 
                plataforma és que se centra massa en els grups. Aquesta part la vull enfocar més com Discord perquè a part 
                d’interactuar amb servidors també es podrà xatejar amb usuaris per privat sense necessitat d’estar dins 
                d’un servidor. A més, també vull integrar tots els accesos dels grups en una sola pàgina com fa Discord 
                perquè a la versió web de Slack es necessita sortir d’un servidor per entrar a un altre.
                En resum: single-page application a totes les plataformes.
            <p>{user}</p>
            <button onClick={() => setUser("Andy")}>hola</button>
        </div>
    );
}

export default Me;
import Header from "../Componentes_Recurrentes/Header";
import { Outlet } from "react-router-dom";

function Home() {


    return (
        <div className="page_Container">
            <Header />
            <Outlet />
        </div>
    )
}

export default Home;
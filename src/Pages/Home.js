import Header from "../Componentes_Recurrentes/Header";
import { Outlet } from "react-router-dom";

function Home() {


    return (
        <div className="page_Container">
            <Header />
            <div className="home-message">
                <h1>Welcome to Wonderland Store!</h1>
                <p>
                    We are a K-pop fan store, bringing imported
                    content directly from Korea for the past ten years.
                    We offer original products and bring them as soon
                    as they are released there! We invite you to
                    explore the site to learn more about our items
                    and also visit our fan-page where we update
                    daily news about ATEEZ.
                </p>
            </div>
            <Outlet />
        </div>
    )
}

export default Home;
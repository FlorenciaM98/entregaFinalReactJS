import { Link } from "react-router-dom";

function Header() {

    return (
        <div className="header_Container">   
            <div className="header-gallery">
                <Link to="/product/JVy2wW5lDOfnWh7V5Qeu">
                    <div className="header-gallery_img">
                        <img src="https://i.imgur.com/xIccvDc.jpg"></img>
                    </div>
                </Link>
                <Link to="/product/WyU4bGHroJjwk1HUhDCf">
                    <div className="header-gallery_img">
                        <img src="https://i.imgur.com/Qt3Uws5.jpg"></img>
                    </div>
                </Link>   
                <Link to="/product/5GVGgJkTzZGnc62MIIyu">
                    <div className="header-gallery_img">
                    <img src="https://i.imgur.com/jyTkevj.jpg"></img>
                    </div>
                </Link>
            </div>
            
        </div>
    )
}

export default Header;
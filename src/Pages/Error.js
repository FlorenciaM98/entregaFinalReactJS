import { Link } from "react-router-dom";

export default function Error() {
    
    return (
        <div className="page_Container">
            <div className="errorPage">
                <span>404 Page not found, go back to </span><Link to="/">home</Link>   
            </div>
        </div>

    )
}
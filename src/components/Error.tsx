import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="error-page">
            <h1>Error 404: Page Not Found</h1>
            <Link to="/">
                Go Home
            </Link>
        </div>
    );
}
 
export default Error;
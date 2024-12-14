import { Navigate } from "react-router-dom";

function NotFound(){
    return(
        <Navigate to='/products' replace />
    )
}
export default NotFound;
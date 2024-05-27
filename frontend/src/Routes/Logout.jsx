import { useContext, useEffect } from 'react';
import { LoginContext } from '../Services/LoginContext';
import { useNavigate } from 'react-router-dom';




function Logout() {
    const { setIsLoggedIn, setLoggedUser } = useContext(LoginContext);
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedUser(null)
        setIsLoggedIn(false);
        navigate("/");
    }, []);
}
export default Logout;

import { useLocation } from 'react-router-dom';


function TesteRota() {

    const location = useLocation();

    return (
        <div>
            <h1>{location.state.message}</h1>
        </div>
    );
}
export default TesteRota;

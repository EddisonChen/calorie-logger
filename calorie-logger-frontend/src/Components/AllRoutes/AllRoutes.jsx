import {useLocation, Routes, Route} from 'react-router-dom';
import LogoutPage from '../LogoutPage/LogoutPage';

const AllRoutes = () => {

    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/logoutpage" element={<LogoutPage/>}/>
        </Routes>
    )
}

export default AllRoutes;
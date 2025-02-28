import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateUser from '../pages/createUser';
import ListUser from '../pages/listUser';
import DeleteUser from '../pages/deleteUser';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>  
      <Route path="/" element={<ListUser />} />
      <Route path="/deleteUser" element={<DeleteUser />} />
      <Route path="/createUser" element={<CreateUser />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

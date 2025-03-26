import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateUser from '../pages/createUser';
  
import DeleteUser from '../pages/deleteUser';
import SetPassword from '../pages/setPassword';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>  
      <Route path="/" element={<SetPassword />} />
      <Route path="/deleteUser" element={<DeleteUser />} />
      <Route path="/createUser" element={<CreateUser />} />
      <Route path="/setPassword" element={<SetPassword />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

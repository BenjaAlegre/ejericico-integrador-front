import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList'; 
import EditUser from './components/EditUser';

const App = () => (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/userlist/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
);

export default App;

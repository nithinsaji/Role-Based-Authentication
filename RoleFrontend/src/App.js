import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/common/RequireAuth";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Home from "./pages/Admin/home/Home";
import Notification from "./pages/Admin/notification/Notification";
import Profile from "./pages/Admin/profile/Profile";
import Users from "./pages/Admin/users/Users";
import EditProfile from "./pages/Common/editProfile/EditProfile";
import SignIn from "./pages/Common/Login";
import Notfound from "./pages/Common/Notfound";
import SignUp from "./pages/Common/register";
import UserDashboard from "./pages/User/UserDashboard";


const ROLES = {
  user: 'ROLE_USER',
  admin: 'ROLE_ADMIN'
}


function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      {/* User content */}
      <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
        <Route path="/Dashboard" element={<UserDashboard />} >
          <Route path="profile" element={<Profile />} exact />
            <Route path="editProfile" element={<EditProfile />} exact />
          <Route path="notification" element={<Notification />} exact />
        </Route>
      </Route>

      {/* Admin content */}
      <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
        <Route path="/AdminDashboard/" element={<AdminDashboard />} >
          <Route path="" element={<Home />} exact />
          <Route path="users" element={<Users />} exact />
          <Route path="profile" element={<Profile />} exact  />
            <Route path="editProfile" element={<EditProfile />} exact />
          <Route path="notification" element={<Notification />} exact />
        </Route>
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;

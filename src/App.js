import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Layout from "./components/Layout/Layout";
import Public from "./components/Public/Public";

import Login from "./pages/authSpecific/Login";
import Welcome from "./pages/authSpecific/Welcome";

import Noteslist from "./pages/notesSpecific/Noteslist";
import NewNote from "./pages/notesSpecific/NewNote";
import EditNote from "./pages/notesSpecific/EditNote";

import Userslist from "./pages/usersSpecific/Userslist";
import NewUserForm from "./pages/usersSpecific/NewUserForm";
import EditUser from "./pages/usersSpecific/EditUser";

import Prefetch from "./pages/authSpecific/Prefetch";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<Prefetch />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Welcome />} />
            <Route path="users">
              <Route index element={<Userslist />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
            </Route>

            <Route path="notes">
              <Route index element={<Noteslist />} />
              <Route path=":id" element={<EditNote />} />
              <Route path="new" element={<NewNote />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

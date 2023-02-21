import { Routes, Route } from "react-router-dom";

import { ROLES } from "./config/roles";

import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Layout from "./components/Layout/Layout";
import Public from "./components/Public/Public";

import RequireAuth from "./pages/authSpecific/RequireAuth";
import Prefetch from "./pages/authSpecific/Prefetch";
import PersistLogin from "./pages/authSpecific/PersistLogin";
import Login from "./pages/authSpecific/Login";
import Welcome from "./pages/authSpecific/Welcome";

import Noteslist from "./pages/notesSpecific/Noteslist";
import NewNote from "./pages/notesSpecific/NewNote";
import EditNote from "./pages/notesSpecific/EditNote";

import Userslist from "./pages/usersSpecific/Userslist";
import NewUserForm from "./pages/usersSpecific/NewUserForm";
import EditUser from "./pages/usersSpecific/EditUser";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/** public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/** protected routes */}
        <Route
          element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
        >
          <Route element={<PersistLogin />}>
            <Route element={<Prefetch />}>
              <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<Welcome />} />
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<Userslist />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<Noteslist />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/** end protected routes */}
      </Route>
    </Routes>
  );
};

export default App;

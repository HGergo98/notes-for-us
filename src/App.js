import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Layout from "./components/Layout/Layout";
import Public from "./components/Public/Public";

import Login from "./pages/authSpecific/Login";
import Welcome from "./pages/authSpecific/Welcome";
import Noteslist from "./pages/notesSpecific/Noteslist";
import Userslist from "./pages/usersSpecific/Userslist";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Welcome />} />
          <Route path="notes">
            <Route index element={<Noteslist />} />
          </Route>
          <Route path="users">
            <Route index element={<Userslist />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

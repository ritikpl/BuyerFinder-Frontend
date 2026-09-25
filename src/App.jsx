import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import FindBuyers from "./pages/FindBuyers";
import SavedLeads from "./pages/SavedLeads";
import EmailHistory from "./pages/EmailHistory";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Find Buyers */}
          <Route
            path="/find-buyers"
            element={
              <div className="min-h-screen bg-slate-50">
                <Sidebar />
                <Navbar />

                <main className="ml-64 pt-16">
                  <FindBuyers />
                </main>
              </div>
            }
          />

          {/* Saved Leads */}
          <Route
            path="/saved-leads"
            element={
              <div className="min-h-screen bg-slate-50">
                <Sidebar />
                <Navbar />

                <main className="ml-64 pt-16">
                  <SavedLeads />
                </main>
              </div>
            }
          />

          {/* Email History */}
          <Route
            path="/emails"
            element={
              <div className="min-h-screen bg-slate-50">
                <Sidebar />
                <Navbar />

                <main className="ml-64 pt-16">
                  <EmailHistory />
                </main>
              </div>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;




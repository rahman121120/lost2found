import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import LostItems from "./pages/LostItems/LostItems";
import FoundItems from "./pages/FoundItems/FoundItems";
import Claims from "./pages/Claims/Claims";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import CreateLostItem from "./pages/CreateLostItem/CreateLostItem";

function App() {

    const token=localStorage.getItem("token");
  
    return (

<BrowserRouter>

  <Routes>

    <Route
    path="/create-lost-item"
    element={
        <ProtectedRoute>
            <MainLayout>
                <CreateLostItem/>
            </MainLayout>
        </ProtectedRoute>
    }
/>

    <Route
    path="/items/:id"
    element={
        <ProtectedRoute>
            <MainLayout>
                <ItemDetails />
            </MainLayout>
        </ProtectedRoute>
    }
/>

    <Route
    path="/"
    element={
        token
            ? <Navigate to="/dashboard" replace />
            : <Login />
    }
/>

    <Route
    path="/dashboard"
    element={
        <ProtectedRoute>

            <MainLayout>

                <Dashboard />

            </MainLayout>

        </ProtectedRoute>
    }
/>

   <Route
    path="/lost-items"
    element={
        <ProtectedRoute>
            <MainLayout>
                <LostItems />
            </MainLayout>
        </ProtectedRoute>
    }
/>

   <Route
    path="/found-items"
    element={
        <ProtectedRoute>
            <MainLayout>
                <FoundItems />
            </MainLayout>
        </ProtectedRoute>
    }
/>

   <Route
    path="/claims"
    element={
        <ProtectedRoute>
            <MainLayout>
                <Claims />
            </MainLayout>
        </ProtectedRoute>
    }
/>

    <Route
    path="/profile"
    element={
        <ProtectedRoute>
            <MainLayout>
                <Profile />
            </MainLayout>
        </ProtectedRoute>
    }
/>

  </Routes>

</BrowserRouter>

  );

}

export default App;
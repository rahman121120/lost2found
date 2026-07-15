import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import LostItems from "./pages/LostItems/LostItems";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import CreateLostItem from "./pages/CreateLostItem/CreateLostItem";

import FoundItems from "./pages/FoundItems/FoundItems";
import FoundItemDetails from "./pages/FoundItems/FoundItemDetails";
import CreateFoundItem from "./pages/CreateFoundItem/CreateFoundItem";

import Claims from "./pages/Claims/Claims";
import Profile from "./pages/Profile/Profile";

import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    const token = localStorage.getItem("token");

    return (

        <BrowserRouter>

            <Routes>

                {/* ================= Login ================= */}

                <Route
                    path="/"
                    element={
                        token
                            ? <Navigate to="/dashboard" replace />
                            : <Login />
                    }
                />

                {/* ================= Dashboard ================= */}

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

                {/* ================= Lost Items ================= */}

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
                    path="/create-lost-item"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <CreateLostItem />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                {/* ================= Found Items ================= */}

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
                    path="/found-items/:id"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <FoundItemDetails />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-found-item"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <CreateFoundItem />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                {/* ================= Claims ================= */}

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

                {/* ================= Profile ================= */}

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

                {/* ================= 404 ================= */}

                <Route
                    path="*"
                    element={
                        <Navigate to="/" replace />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
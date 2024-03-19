import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./context/auth-context";

import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import CharacterVaultPage from './pages/CharacterVaultPage/CharacterVaultPage.jsx';
import AddCharacterPage from './pages/AddCharacterPage/AddCharacterPage.jsx';
import EditCharacterPage from './pages/EditCharacterPage/EditCharacterPage.jsx';
import CharacterSheetPage from './pages/CharacterSheetPage/CharacterSheetPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<RegisterPage />} />
                    <Route path="/characters" element={<CharacterVaultPage />} />
                    <Route path="/characters/add" element={<AddCharacterPage />} />
                    <Route path="/charactes/:id" element={<CharacterSheetPage />} />
                    <Route path="/charactes/:id/edit" element={<EditCharacterPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
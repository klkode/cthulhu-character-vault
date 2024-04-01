import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./context/auth-context";
import { useEffect, useState } from 'react';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import CharacterVaultPage from './pages/CharacterVaultPage/CharacterVaultPage.jsx';
import AddCharacterPage from './pages/AddCharacterPage/AddCharacterPage.jsx';
import EditCharacterPage from './pages/EditCharacterPage/EditCharacterPage.jsx';
import CharacterSheetPage from './pages/CharacterSheetPage/CharacterSheetPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = sessionStorage.getItem("token");
    
    useEffect(() => {
        if(!!token){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }
    }, [token]);

    return (
        <div className="app">
            <AuthProvider>
                <div className="main">
                    <BrowserRouter>
                        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                            <Route path="/signup" element={<RegisterPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                            <Route path="/characters" element={<CharacterVaultPage isLoggedIn={isLoggedIn}/>} />
                            <Route path="/characters/add" element={<AddCharacterPage isLoggedIn={isLoggedIn}/>} />
                            <Route path="/characters/:id" element={<CharacterSheetPage isLoggedIn={isLoggedIn}/>} />
                            <Route path="/characters/:id/edit" element={<EditCharacterPage isLoggedIn={isLoggedIn}/>} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </BrowserRouter>
                </div>
                <Footer />
            </AuthProvider>
        </div>
    );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Layout } from 'antd';
import 'normalize.css';
import './App.css';

//Components Imports
import AppContext from './AppContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Index from './components/pages/Index';
import Reports from './components/pages/Reports';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import CreateReport from './components/pages/CreateReport';
import EditReport from './components/pages/EditReport';

function App() {
    const location = useLocation();

    // Global state variables and functions
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [csrfToken, setCSRFToken] = useState('');
    const userSettings = {
        isLoggedIn: isLoggedIn,
        csrfToken: csrfToken,
        setIsLoggedIn,
        setCSRFToken,
    };
    useEffect(() => {
        const getCSRF = async () => {
            const res = await axios.get('/api/auth/get-csrf-token');
            userSettings.setCSRFToken(res.data.csrfToken);
            axios.defaults.headers['X-CSRF-Token'] = res.data.csrfToken;
        };
        const checkLogInStatus = async () => {
            try {
                await axios.get('/api/auth/authCheck');

                userSettings.setIsLoggedIn(true);
            } catch (error) {
                userSettings.setIsLoggedIn(false);
            }
        };
        getCSRF();
        checkLogInStatus();
    }, []);
    return (
        <AppContext.Provider value={userSettings}>
            <div className="App">
                <Layout>
                    <Header />
                    <Layout>
                        <Sidebar />
                        <Layout style={{ minHeight: '80vh', position: 'relative' }}>
                            <AnimatePresence>
                                <Switch location={location} key={location.pathname}>
                                    <Route exact path="/" component={Index} />
                                    <Route path="/reports/week/:week/" component={Reports} />
                                    <Route path="/auth/login" component={Login} />
                                    <Route path="/auth/register" component={Register} />
                                    <Route path="/reports/new" component={CreateReport} />
                                    <Route path="/reports/edit" component={EditReport} />
                                </Switch>
                            </AnimatePresence>
                        </Layout>
                    </Layout>
                    <Footer />
                </Layout>
            </div>
        </AppContext.Provider>
    );
}

export default App;

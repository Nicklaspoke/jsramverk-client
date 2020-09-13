import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from 'antd';
import 'normalize.css';
import './App.css';

//Components Imports
import AppContext from './AppContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Index from './components/pages/Index';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Kmom01 from './components/pages/reports/Kmom01';
import Kmom02 from './components/pages/reports/Kmom02';
import Kmom03 from './components/pages/reports/Kmom03';
import Kmom04 from './components/pages/reports/Kmom04';
import Kmom05 from './components/pages/reports/Kmom05';
import Kmom06 from './components/pages/reports/Kmom06';
import Kmom10 from './components/pages/reports/Kmom10';

function App() {
    const location = useLocation();

    // Global state variables and functions
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const userSettings = {
        isLoggedIn: isLoggedIn,
        setIsLoggedIn,
    };

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
                                    <Route path="/reports/week/1" component={Kmom01} />
                                    <Route path="/reports/week/2" component={Kmom02} />
                                    <Route path="/reports/week/3" component={Kmom03} />
                                    <Route path="/reports/week/4" component={Kmom04} />
                                    <Route path="/reports/week/5" component={Kmom05} />
                                    <Route path="/reports/week/6" component={Kmom06} />
                                    <Route path="/reports/week/7" component={Kmom10} />
                                    <Route path="/auth/login" component={Login} />
                                    <Route path="/auth/register" component={Register} />
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

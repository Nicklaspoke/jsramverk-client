import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import { Layout } from 'antd';
import 'normalize.css';
import './App.css';

//Components Imports
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Index from './components/pages/Index'
import Kmom01 from './components/pages/reports/Kmom01';
import Kmom02 from './components/pages/reports/Kmom02';
import Kmom03 from './components/pages/reports/Kmom03';
import Kmom04 from './components/pages/reports/Kmom04';
import Kmom05 from './components/pages/reports/Kmom05';
import Kmom06 from './components/pages/reports/Kmom06';
import Kmom10 from './components/pages/reports/Kmom10';

function App() {
    const location = useLocation();
    return (
        <div className="App">
            <Layout>
                <Header />
                <Layout>
                    <Sidebar />
                    <Layout style={{ minHeight: '80vh', position: 'relative'}}>
                        <AnimatePresence>
                            <Switch location={location} key={location.pathname}>
                                <Route exact path='/' component={Index} />
                                <Route path='/reports/week/1' component={Kmom01} />
                                <Route path='/reports/week/2' component={Kmom02} />
                                <Route path='/reports/week/3' component={Kmom03} />
                                <Route path='/reports/week/4' component={Kmom04} />
                                <Route path='/reports/week/5' component={Kmom05} />
                                <Route path='/reports/week/6' component={Kmom06} />
                                <Route path='/reports/week/10' component={Kmom10} />
                            </Switch>
                        </AnimatePresence>
                    </Layout>
                </Layout>
                <Footer />
            </Layout>
        </div>
    );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'normalize.css';
import './App.css';

//Components Imports
import CHeader from './components/layout/Header';
import Index from './components/pages/Index'
import Kmom01 from './components/pages/reports/Kmom01';
import Kmom02 from './components/pages/reports/Kmom02';
import Kmom03 from './components/pages/reports/Kmom03';
import Kmom04 from './components/pages/reports/Kmom04';
import Kmom05 from './components/pages/reports/Kmom05';
import Kmom06 from './components/pages/reports/Kmom06';
import Kmom10 from './components/pages/reports/Kmom10';

const { Footer } = Layout;

function App() {
    return (
        <Router>
            <div className="App">
                <Layout>
                    <CHeader />
                    <Route exact path='/' component={Index} />
                    <Route path='/reports/week/1' component={Kmom01} />
                    <Route path='/reports/week/2' component={Kmom02} />
                    <Route path='/reports/week/3' component={Kmom03} />
                    <Route path='/reports/week/4' component={Kmom04} />
                    <Route path='/reports/week/5' component={Kmom05} />
                    <Route path='/reports/week/6' component={Kmom06} />
                    <Route path='/reports/week/10' component={Kmom10} />
                    <Footer />
                </Layout>
            </div>
        </Router>
    );
}

export default App;

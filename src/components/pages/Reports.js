import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { GithubOutlined } from '@ant-design/icons';

import NotFound from '../layout/NotFound';
import { ReportStyle } from '../../ReusableStyles';
import { SlideInRight } from '../../PageAnimations';
const { Content } = Layout;
const { variations, transition } = SlideInRight;

export default function Reports() {
    const [state, setState] = useState({});
    const location = useLocation();
    const week = location.pathname.substr(location.pathname.lastIndexOf('/') + 1);
    console.log(week);

    useEffect(() => {
        retriveData();
    }, []);

    const retriveData = async () => {
        let res = await fetch(`http://localhost:8080/reports/week/${week}`);
        const data = await res.json();
        if (data.error) {
            setState({ display404: true });
        } else {
            console.log(data.data);
            setState({ display404: false, ...data.data });
        }
    };
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={variations}
            transition={transition}
        >
            {state.display404 ? (
                <NotFound />
            ) : (
                <Content style={ReportStyle}>
                    <h1>{state.title}</h1>
                    <GithubOutlined />
                    <a
                        href="https://github.com/Nicklaspoke/jsramverk-client"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        Github
                    </a>
                    <ReactMarkdown source={state.content} />
                </Content>
            )}
        </motion.div>
    );
}

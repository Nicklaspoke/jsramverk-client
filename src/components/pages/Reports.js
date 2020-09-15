import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { GithubOutlined } from '@ant-design/icons';

import getErrorPage from '../../helpers/getErrorPage';
import { ReportStyle } from '../../ReusableStyles';
import { SlideInRight } from '../../PageAnimations';
const { Content } = Layout;
const { variations, transition } = SlideInRight;

export default function Reports() {
    const [state, setState] = useState({});
    const location = useLocation();
    const week = location.pathname.substr(location.pathname.lastIndexOf('/') + 1);

    useEffect(() => {
        const retriveData = async () => {
            try {
                let data = await axios.get(`/api/reports/week/${week}`);
                data = data.data;

                setState({ displayErrorPage: false, ...data.data });
            } catch (error) {
                const status = error.response.status;
                if (status) {
                    setState({
                        displayErrorPage: true,
                        errorPage: getErrorPage(status),
                    });
                }
            }
        };

        retriveData();
    }, []);

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={variations}
            transition={transition}
        >
            {state.displayErrorPage ? (
                <state.errorPage />
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

import React, { useState, useEffect } from 'react';
// import marked from "marked";
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import { SlideInRight } from '../../../PageAnimations';
import { ReportStyle } from '../../../ReusableStyles';
import { GithubOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';

const { Content } = Layout;
const { variations, transition } = SlideInRight

const content = {}
export default function Kmom01() {
    const [state, setState] = useState({});

    useEffect(() => {
        retriveData();
    }, [])

    const retriveData = async () => {
        let res = await fetch('http://localhost:8080/reports/week/1');
        res = await res.json();
        setState(res.data);
    }

    return (
        <motion.div initial='initial' animate='in' exit='out' variants={variations} transition={transition}>
            <Content style={ReportStyle}>
                <h1>{state.titel}</h1>
                <GithubOutlined />
                <a
                    href='https://github.com/Nicklaspoke/jsramverk-client'
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{textDecoration:'none'}}
                >
                    Github
                </a>
                <ReactMarkdown source={state.content} />

            </Content>
        </motion.div>
    );
}
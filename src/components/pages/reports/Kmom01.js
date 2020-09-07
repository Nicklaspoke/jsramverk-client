import React from 'react';
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import { SlideInRight } from '../../../PageAnimations';
import { ReportStyle } from '../../../ReusableStyles';
import { GithubOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { variations, transition } = SlideInRight

export default function Kmom01() {
    return (
        <motion.div initial='initial' animate='in' exit='out' variants={variations} transition={transition}>
            <Content style={ReportStyle}>
                <h1>Kmom01</h1>
                <GithubOutlined />
                <a
                    href='https://github.com/Nicklaspoke/jsramverk-client'
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{textDecoration:'none'}}
                >
                    Github
                </a>
                <h1>Content of README</h1>
                <h1>jsramverk-me-page</h1>
                <h2> How to run the application</h2>
                <h3> prerequisites</h3>
                <ul>
                    <li>nodejs version >= 12 (developed on version 14, but should work with the latest lts)</li>
                </ul>
                <p>
                    The easiest way to get the application up and running is to first use "npm i" to install all dependencies, after that use "npm start" to begin runnint the development server.
                    Once the server has started, it can be accessed on localhost:3000
                </p>
            </Content>
        </motion.div>
    );
}

import React from 'react'

import { Layout } from 'antd';
import { motion } from 'framer-motion';

import PageTransitions from '../../PageTransitions'
const { Content } = Layout;

export default function Index() {
    return (
        <motion.div initial='out' animate='in' exit='out' variants={PageTransitions}>
            <Content style={indexStyle}>
                <h1>OwO Index Page</h1>
            </Content>

        </motion.div>
    )
}

const indexStyle = {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '20rem',
    height: '100%'
}
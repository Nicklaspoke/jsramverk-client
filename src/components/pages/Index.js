import React from 'react'
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import { SlideInRight } from '../../PageAnimations'
const { Content } = Layout;
const { variations, transition } = SlideInRight

export default function Index() {
    return (
        <motion.div initial='initial' animate='in' exit='out' variants={variations} transition={transition}>
            <Content style={indexStyle}>
                <h1>Well hello there fellow traveller</h1>

            </Content>

        </motion.div>
    )
}

const indexStyle = {
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0
}
import React from 'react';
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import { SlideInRight } from '../../../PageAnimations';
import { ReportStyle } from '../../../ReusableStyles';

const { Content } = Layout;
const { variations, transition } = SlideInRight

export default function Kmom03() {
    return (
        <motion.div initial='initial' animate='in' exit='out' variants={variations} transition={transition}>
            <Content style={ReportStyle}>
                <h1>Kmom03</h1>
            </Content>
        </motion.div>
    );
}
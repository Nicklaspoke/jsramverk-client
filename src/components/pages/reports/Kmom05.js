import React from 'react';
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import {PageTransitions} from '../../../PageAnimations';
import { ReportStyle } from '../../../ReusableStyles';


const { Content } = Layout;

export default function Kmom05() {
    return (
            <motion.div initial='out' animate='in' exit='out' variants={PageTransitions}>
                <Content   style={ ReportStyle }>
                    <h1>Kmom05</h1>
                </Content>
            </motion.div>
    );
}
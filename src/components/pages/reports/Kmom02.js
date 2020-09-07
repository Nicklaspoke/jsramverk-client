import React from 'react';
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import {PageTransitions} from '../../../PageAnimations';
import { ReportStyle } from '../../../ReusableStyles';

const { Content } = Layout;

export default function Kmom02() {
    return (
        <motion.div initial='out' animate='in' exit='out' variants={PageTransitions}>
            <Content style={ReportStyle}>
                <h1>Kmom02</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea qui numquam accusantium dolores nisi et soluta beatae architecto, dolorem deleniti quae fugit ullam itaque dolor magnam officiis perferendis deserunt quo.</p>
            </Content>
        </motion.div>
    );
}

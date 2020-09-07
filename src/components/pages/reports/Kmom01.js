import React from 'react';
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import { SlideInRight } from '../../../PageAnimations';
import { ReportStyle } from '../../../ReusableStyles';

const { Content } = Layout;
const { variations, transition } = SlideInRight

export default function Kmom01() {
    return (
        <motion.div initial='initial' animate='in' exit='out' variants={variations} transition={transition}>
            <Content style={ReportStyle}>
                <h1>Kmom01</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea qui numquam accusantium dolores nisi et soluta beatae architecto, dolorem deleniti quae fugit ullam itaque dolor magnam officiis perferendis deserunt quo.</p>
            </Content>
        </motion.div>
    );
}

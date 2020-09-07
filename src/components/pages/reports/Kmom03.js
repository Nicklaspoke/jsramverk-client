import React from 'react';
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import PageTransitions from '../../../PageTransitions';
import ReportNav from '../../layout/ReportNav';

const { Content } = Layout;

export default function Kmom03() {
    return (
        <Layout>

            <motion.div initial='out' animate='in' exit='out' variants={PageTransitions}>
                <Content   style={{ padding: '1rem' }}>
                    <h1>Kmom03</h1>
                </Content>
            </motion.div>
        </Layout>
    );
}
import React from 'react';
import { Layout } from 'antd';
import ReportNav from '../../layout/ReportNav';
import { motion } from 'framer-motion';
import PageTransitions from '../../../PageTransitions';

const { Content } = Layout;

export default function Kmom02() {
    return (
        <Layout>
            <ReportNav />
            <motion.div initial='out' animate='in' exit='out' variants={PageTransitions}>
            <Content   style={{ padding: '1rem' }}>
                <h1>Kmom02</h1>
            </Content>
            </motion.div>
        </Layout>
    );
}
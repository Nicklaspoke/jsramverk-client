import React from 'react';
import { Layout } from 'antd';
import ReportNav from '../../layout/ReportNav';
import { motion } from 'framer-motion';
import PageTransitions from '../../../PageTransitions';
const { Content } = Layout;

export default function Kmom01() {
    return (
        <Layout>

            <motion.div initial='out' animate='in' exit='out' variants={PageTransitions}>
                <Content style={{padding: '1rem'}}>
                    <h1>Kmom01</h1>
                </Content>
            </motion.div>
        </Layout>
    );
}

import React from 'react';
import { Layout } from 'antd';
import ReportNav from '../../layout/ReportNav';

const { Content } = Layout;

export default function Kmom02() {
    return (
        <Layout>
            <ReportNav />
            <Content style={{ padding: '1rem' }}>
                <h1>Kmom02</h1>
            </Content>
        </Layout>
    );
}
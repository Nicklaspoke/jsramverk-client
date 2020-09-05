import React from 'react';
import { Layout } from 'antd';
import ReportNav from '../../layout/ReportNav';

const { Content } = Layout;

export default function Kmom10() {
    return (
        <Layout>
            <ReportNav />
            <Content style={{ padding: '1rem' }}>
                <h1>Kmom10</h1>
            </Content>
        </Layout>
    );
}
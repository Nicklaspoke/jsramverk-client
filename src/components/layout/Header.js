import React from 'react';
import { Affix, Layout } from 'antd';
import Nav from './Nav';

export default function Header() {
    return (
        <Affix offsetTop={0}>
            <Layout.Header style={headerStyle}>
                <h1 style={{ color: '#ddd' }}>JSRamverk Me-Page</h1>
                <Nav />
            </Layout.Header>
        </Affix>
    );
}

const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
};

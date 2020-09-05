import React from 'react';
import { Affix, Layout } from 'antd';
import Nav from './Nav';
const { Header } = Layout;

export default function CHeader() {
    return (
        <Affix offsetTop={0}>
            <Header style={headerStyle}>
                <h1 style={{ justifyContent: 'flex-end', color: '#fff' }}>JSRamverk Me-Page</h1>
                <Nav />
            </Header>
        </Affix>
    );
}

const headerStyle = {
    display: 'flex',
    // justifyContent: 'flex-start',
    // backgroundColor: '#202020'
};
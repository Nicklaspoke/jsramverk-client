import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Space } from 'antd';
import { HomeOutlined, AlignLeftOutlined, AlignCenterOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

export default function Nav() {
    return (
        <div style={navStyle}>
                <Menu mode='horizontal' theme='dark'>
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <SubMenu icon={<AlignLeftOutlined />} title='Reports'>
                        <Menu.Item icon={<AlignCenterOutlined />}>
                            <Link to='/reports/week/1'>kmom01</Link>
                        </Menu.Item>
                        <Menu.Item icon={<AlignCenterOutlined />}>
                            <Link to='/reports/week/2'>kmom02</Link>
                        </Menu.Item>
                        <Menu.Item icon={<AlignCenterOutlined />}>
                            <Link to='/reports/week/3'>kmom03</Link>
                        </Menu.Item>
                        <Menu.Item icon={<AlignCenterOutlined />}>
                            <Link to='/reports/week/4'>kmom04</Link>
                        </Menu.Item>
                        <Menu.Item icon={<AlignCenterOutlined />}>
                            <Link to='/reports/week/5'>kmom05</Link>
                        </Menu.Item>
                        <Menu.Item icon={<AlignCenterOutlined />}>
                            <Link to='/reports/week/6'>kmom06</Link>
                        </Menu.Item>
                        <Menu.Item icon={<AlignCenterOutlined />}>
                            <Link to='/reports/week/10'>kmom10</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
        </div>
    );
}

const navStyle = {
    // opacity: '0%',
    // position: 'absolute',
    // bottom: '0px'
    // alignSelf: 'flex-end'
};
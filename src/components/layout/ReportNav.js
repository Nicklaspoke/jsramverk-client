import React from 'react'
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { AlignCenterOutlined } from '@ant-design/icons';

const { Sider } = Layout;

export default function ReportNav() {
    let currentPage = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
    return (
        <Sider>
            <Menu mode='inline' style={{ height: '100%', borderRight: 0 }} theme='dark' defaultSelectedKeys={[currentPage]}>
                <Menu.Item key='1' icon={<AlignCenterOutlined />}>
                    <Link to='/reports/week/1'>kmom01</Link>
                </Menu.Item>
                <Menu.Item key='2' icon={<AlignCenterOutlined />}>
                    <Link to='/reports/week/2'>kmom02</Link>
                </Menu.Item>
                <Menu.Item key='3' icon={<AlignCenterOutlined />}>
                    <Link to='/reports/week/3'>kmom03</Link>
                </Menu.Item>
                <Menu.Item key='4' icon={<AlignCenterOutlined />}>
                    <Link to='/reports/week/4'>kmom04</Link>
                </Menu.Item>
                <Menu.Item key='5' icon={<AlignCenterOutlined />}>
                    <Link to='/reports/week/5'>kmom05</Link>
                </Menu.Item>
                <Menu.Item key='6' icon={<AlignCenterOutlined />}>
                    <Link to='/reports/week/6'>kmom06</Link>
                </Menu.Item>
                <Menu.Item key='10' icon={<AlignCenterOutlined />}>
                    <Link to='/reports/week/10'>kmom10</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

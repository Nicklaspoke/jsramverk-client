import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    AlignLeftOutlined,
    AlignCenterOutlined,
    LoginOutlined,
    LogoutOutlined,
    IdcardOutlined,
    EditOutlined,
    FormOutlined,
    DiffOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import AppContext from '../../AppContext';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function Sidebar() {
    const context = useContext(AppContext);
    let history = useHistory();
    const handleLogOut = () => {
        const requestLogout = async () =>
            await axios.get('https://jsramverk.nicklaspoke.se/api/auth/logout');
        requestLogout();
        context.setIsLoggedIn(false);
        history.push('/auth/login');
    };
    return (
        <Sider>
            <Menu mode="inline" style={{ height: '100%', borderRight: 0 }} theme="dark">
                <Menu.Item icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <SubMenu icon={<AlignLeftOutlined />} title="Reports">
                    <Menu.Item icon={<AlignCenterOutlined />}>
                        <Link to="/reports/week/1">kmom01</Link>
                    </Menu.Item>
                    <Menu.Item icon={<AlignCenterOutlined />}>
                        <Link to="/reports/week/2">kmom02</Link>
                    </Menu.Item>
                    <Menu.Item icon={<AlignCenterOutlined />}>
                        <Link to="/reports/week/3">kmom03</Link>
                    </Menu.Item>
                    <Menu.Item icon={<AlignCenterOutlined />}>
                        <Link to="/reports/week/4">kmom04</Link>
                    </Menu.Item>
                    <Menu.Item icon={<AlignCenterOutlined />}>
                        <Link to="/reports/week/5">kmom05</Link>
                    </Menu.Item>
                    <Menu.Item icon={<AlignCenterOutlined />}>
                        <Link to="/reports/week/6">kmom06</Link>
                    </Menu.Item>
                    <Menu.Item icon={<AlignCenterOutlined />}>
                        <Link to="/reports/week/10">kmom10</Link>
                    </Menu.Item>
                </SubMenu>
                {!context.isLoggedIn ? (
                    <Menu.Item icon={<IdcardOutlined />}>
                        <Link to="/auth/register">Register New Account</Link>
                    </Menu.Item>
                ) : (
                    <SubMenu icon={<FormOutlined />} title="Content Management">
                        <Menu.Item icon={<DiffOutlined />}>
                            <Link to="/reports/new">New Report</Link>
                        </Menu.Item>

                        <Menu.Item icon={<EditOutlined />}>
                            <Link to="/reports/edit">Edit Reports</Link>
                        </Menu.Item>
                    </SubMenu>
                )}
                {!context.isLoggedIn ? (
                    <Menu.Item icon={<LoginOutlined />}>
                        <Link to="/auth/login">Log In</Link>
                    </Menu.Item>
                ) : (
                    <Menu.Item icon={<LogoutOutlined />} onClick={handleLogOut}>
                        {/* <Link to="/">Log Out</Link> */}Logout
                    </Menu.Item>
                )}
            </Menu>
        </Sider>
    );
}

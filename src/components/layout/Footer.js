import React from 'react';
import { Menu } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
export default function Footer() {
    return (
        <Menu mode="horizontal" theme="dark" style={footerStyle}>
            <Menu.Item icon={<GithubOutlined />}>
                <a
                    href="https://github.com/Nicklaspoke/jsramverk-client"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Github
                </a>
            </Menu.Item>
        </Menu>
    );
}

const footerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    bottom: '0',
};

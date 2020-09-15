import React from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button, Image } from 'antd';

export default function Forbidden() {
    const history = useHistory();
    const goLogin = () => {
        history.push('/auth/login');
    };
    return (
        <Result
            icon={
                <Image
                    width="50%"
                    alt="403 Image"
                    preview="false"
                    src="https://derpicdn.net/img/view/2020/5/25/2357844.png"
                />
            }
            style={{ position: 'absolute', left: 0, right: 0 }}
            title="403"
            subTitle="Access denied for the page, did you forget to login?"
            extra={
                <Button type="primary" onClick={goLogin}>
                    Login
                </Button>
            }
        />
    );
}

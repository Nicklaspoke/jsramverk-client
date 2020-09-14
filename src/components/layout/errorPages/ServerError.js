import React from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button, Image } from 'antd';

export default function ServerError() {
    const history = useHistory();
    const goBack = () => {
        history.push('/');
    };
    return (
        <Result
            icon={
                <Image
                    width="50%"
                    alt="404 Image"
                    preview="false"
                    src="https://derpicdn.net/img/view/2012/6/20/10898.gif"
                />
            }
            style={{ position: 'absolute', left: 0, right: 0 }}
            title="500"
            subTitle="Server problems, profesionals are working on it"
            extra={
                <Button type="primary" onClick={goBack}>
                    Go Home
                </Button>
            }
        />
    );
}

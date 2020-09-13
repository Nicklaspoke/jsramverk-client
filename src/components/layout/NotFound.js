import React from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';

export default function NotFound() {
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    };
    return (
        <Result
            style={{ position: 'absolute', left: 0, right: 0 }}
            status="404"
            title="404"
            subTitle="Could not find the page you're looking for"
            extra={
                <Button type="primary" onClick={goBack}>
                    Go Back
                </Button>
            }
        />
    );
}

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button, Image } from 'antd';

export default function NotFound() {
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    };
    return (
        <Result
            icon={
                <Image
                    width="50%"
                    alt="404 Image"
                    preview="false"
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6ea4b5bd-159c-48b5-a240-7ba56149aff9/d7sgogb-6674ec4c-e15b-4852-94e5-afe84ee21daa.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNmVhNGI1YmQtMTU5Yy00OGI1LWEyNDAtN2JhNTYxNDlhZmY5XC9kN3Nnb2diLTY2NzRlYzRjLWUxNWItNDg1Mi05NGU1LWFmZTg0ZWUyMWRhYS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.JXCxALy1Tf3aFzjL3ZCtLQxG1JnSLAQYrWjCzkkRCqA"
                />
            }
            style={{ position: 'absolute', left: 0, right: 0 }}
            title="404"
            subTitle="Could not find the page you're looking for, but I found this cute GIF"
            extra={
                <Button type="primary" onClick={goBack}>
                    Go Back
                </Button>
            }
        />
    );
}

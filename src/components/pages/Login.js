import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Layout, Alert } from 'antd';
import { motion } from 'framer-motion';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { SlideInRight } from '../../PageAnimations';
import AppContext from '../../AppContext';

const { variations, transition } = SlideInRight;

export default function Login() {
    const [state, setState] = useState({});
    const context = useContext(AppContext);
    let history = useHistory();
    const onFinish = async (values) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'X-CSRF-Token': context.csrfToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        const data = await res.json();
        if (data.error) {
            console.log(data);
            setState({
                displayError: true,
                errorTitle: data.error.title,
                errorDescription: data.error.description,
            });
        } else {
            setState({ displayError: false, errorTitle: '', errorDescription: '' });
            context.setIsLoggedIn(true);
            history.push('/');
        }
    };
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={variations}
            transition={transition}
        >
            <Layout style={{ position: 'absolute' }}>
                <h1 style={{ marginLeft: '5rem' }}>Login</h1>
                {state.displayError && (
                    <Alert
                        style={{
                            minWidth: '20%',
                            marginLeft: '5rem',
                            marginTop: '0',
                            marginBottom: '1rem',
                        }}
                        message={state.errorTitle}
                        description={state.errorDescription}
                        type="error"
                    />
                )}
                <Form
                    name="login"
                    className="login-form"
                    style={{ minWidth: '20%', marginLeft: '5rem', marginTop: '0' }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The Input is not a valid email address',
                            },
                            {
                                required: true,
                                message: 'Input Email',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
            </Layout>
        </motion.div>
    );
}

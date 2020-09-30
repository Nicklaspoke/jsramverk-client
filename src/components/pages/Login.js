import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Layout, Alert } from 'antd';
import { motion } from 'framer-motion';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { SlideInRight } from '../../PageAnimations';
import AppContext from '../../AppContext';
import getErrorPage from '../../helpers/getErrorPage';

const { variations, transition } = SlideInRight;

export default function Login() {
    const [state, setState] = useState({});
    const context = useContext(AppContext);
    let history = useHistory();
    const onFinish = async (values) => {
        try {
            await axios.post(
                'https://jsramverk.nicklaspoke.se/api/auth/login',
                { ...values },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            setState({ displayErrorMessage: false });
            context.setIsLoggedIn(true);
            history.push('/');
        } catch (error) {
            const { status, data } = error.response;
            if (status === 400) {
                setState({
                    errorTitle: data.error.title,
                    errorDescription: data.error.description,
                    displayErrorMessage: true,
                });
            } else if (status === 500) {
                setState({
                    displayErrorPage: true,
                    errorPage: getErrorPage(status),
                });
            }
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
            {state.displayErrorPage ? (
                <state.errorPage />
            ) : (
                <Layout style={{ position: 'absolute' }}>
                    <h1 style={{ marginLeft: '5rem' }}>Login</h1>
                    {state.displayErrorMessage && (
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
            )}
        </motion.div>
    );
}

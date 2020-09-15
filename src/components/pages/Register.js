import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Layout, Checkbox, Modal, Alert } from 'antd';
import { PasswordInput } from 'antd-password-input-strength';
import { motion } from 'framer-motion';
import { UserOutlined, LockOutlined, AuditOutlined } from '@ant-design/icons';
import axios from 'axios';

import { SlideInRight } from '../../PageAnimations';
import getErrorPage from '../../helpers/getErrorPage';
const { variations, transition } = SlideInRight;

export default function Register() {
    const [state, setState] = useState({});
    let history = useHistory();

    const onFinish = async (values) => {
        try {
            await axios.post(
                '/api/auth/register',
                {
                    email: values.email,
                    password: values.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            successModal();
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

    const successModal = () => {
        let secondsToGo = 5;
        const modal = Modal.success({
            title: 'Account Registerd successfully',
            content: `Click OK to be redirected to the login page, or wait and be redirected automaticaly in ${secondsToGo} seconds`,
            okText: 'Go To Login',
            onOk() {
                history.push('/auth/login');
            },
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `Click OK to be redirected to the login page, or wait and be redirected automaticaly in ${secondsToGo} seconds`,
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
            history.push('/auth/login');
        }, secondsToGo * 1000);
    };
    const showAgreement = () => {
        Modal.info({
            title: 'User Agreement',
            bodyStyle: { minWidth: '50%' },
            content: (
                <div>
                    <p>
                        By creating a account, you "the user", agrees that provided email and
                        password will be stored in a database for account managemet and
                        authentication. This information (email and password) will only be
                        accessible by you "the user" and manitainers of the system.
                    </p>
                    <p>
                        This information will not be shared with any 3rd party members, unless you
                        "the user" agrees to it.
                    </p>
                </div>
            ),
            onOk() {},
        });
    };
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={variations}
            transition={transition}
        >
            {' '}
            {state.displayErrorPage ? (
                <state.errorPage />
            ) : (
                <Layout style={{ position: 'absolute' }}>
                    <h1 style={{ marginLeft: '5rem' }}>Register New Account</h1>
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
                        name="register"
                        className="login-form"
                        style={{ minWidth: '20%', marginLeft: '5rem', marginTop: '0' }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The Input is not a valid email address',
                                },
                                {
                                    required: true,
                                    message: 'Input a email you want to register with',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm-email"
                            label="Confirm email"
                            dependencies={['email']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Confirm Email',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('email') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('Email addresses does not match');
                                    },
                                }),
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password',
                                },
                            ]}
                            hasFeedback
                        >
                            <PasswordInput
                                prefix={<LockOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm-password"
                            label="Confirm password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Confirm Password',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('Password does not match');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject(
                                                  'Please read and accept the user agreement',
                                              ),
                                },
                            ]}
                        >
                            <Checkbox>
                                By clicking this button I confim that I have read and understod the
                                User agreement
                            </Checkbox>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register Account
                        </Button>
                        <Button
                            type="default"
                            onClick={showAgreement}
                            icon={<AuditOutlined />}
                            style={{ marginLeft: '1rem' }}
                        >
                            User Agreement
                        </Button>

                        <Form.Item></Form.Item>
                    </Form>
                </Layout>
            )}
        </motion.div>
    );
}

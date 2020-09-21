import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Layout, Select, Alert } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';

import AppContext from '../../AppContext';
import getErrorPage from '../../helpers/getErrorPage';
import { SlideInRight } from '../../PageAnimations';
const { variations, transition } = SlideInRight;

const { Option } = Select;

export default function CreateReport() {
    const [state, setState] = useState({ avilableWeeks: [1] });
    const context = useContext(AppContext);
    let history = useHistory();

    useEffect(() => {
        const getAvilableWeeks = async () => {
            try {
                await axios.get('/api/auth/authCheck');

                let data = await axios.get('/api/validate/avilableWeeks');
                data = data.data;
                setState({
                    displayErrorPage: false,
                    avilableWeeks: data.data,
                    finishedLoading: true,
                });
            } catch (error) {
                const status = error.response.status;
                if (status) {
                    context.setIsLoggedIn(false);
                    setState({
                        displayErrorPage: true,
                        finishedLoading: true,
                        errorPage: getErrorPage(status),
                    });
                }
            }
        };

        getAvilableWeeks();
    }, []);

    const handleChange = (e) => {
        setState({ ...state, weekSelected: true });
    };
    const onFinish = async (values) => {
        try {
            await axios.post(
                '/api/reports',
                { ...values },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            setState({ displayErrorPage: false, displayErrorMessage: false });
            history.push(`/reports/week/${values.week}`);
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
                <Layout style={{ position: 'absolute', minWidth: '50%' }}>
                    <h1 style={{ marginLeft: '5rem' }}>Create New Report</h1>
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
                        layout="vertical"
                        name="create-report"
                        onFinish={onFinish}
                        style={{
                            marginLeft: '5rem',
                            marginTop: '0',
                            minWidth: '20%',
                        }}
                    >
                        <Form.Item name="week" label="Week:">
                            {state.finishedLoading ? (
                                <Select
                                    onChange={handleChange}
                                    defaultValue="Select A Week"
                                    style={{ maxWidth: '20%' }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Title of the report',
                                        },
                                    ]}
                                >
                                    {state.avilableWeeks.map((week) => (
                                        <Option value={week}>{week}</Option>
                                    ))}
                                </Select>
                            ) : null}
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="Title:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Title of the report',
                                },
                            ]}
                        >
                            <Input
                                style={{ maxWidth: '15rem' }}
                                placeholder="Title of the report"
                            />
                        </Form.Item>
                        <Form.Item
                            name="content"
                            label="Content (supports markdown syntax):"
                            rules={[
                                {
                                    required: true,
                                    message: 'Content of your report',
                                },
                            ]}
                        >
                            <Input.TextArea
                                style={{ minHeight: '15rem', minWidth: '20rem' }}
                                placeholder="Content of the report"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={!state.weekSelected}>
                                Create Report
                            </Button>
                        </Form.Item>
                    </Form>
                </Layout>
            )}
        </motion.div>
    );
}

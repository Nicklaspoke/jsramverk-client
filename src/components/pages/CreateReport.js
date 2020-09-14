import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Layout, Alert, Select } from 'antd';
import { motion } from 'framer-motion';

import Forbidden from '../layout/Forbidden';
import AppContext from '../../AppContext';

import { SlideInRight } from '../../PageAnimations';
const { variations, transition } = SlideInRight;

const { Option } = Select;

export default function CreateReport() {
    const [state, setState] = useState({ avilableWeeks: [1] });
    const context = useContext(AppContext);
    let history = useHistory();

    useEffect(() => {
        const getAvilableWeeks = async () => {
            const res = await fetch('/api/auth/authCheck', {
                headers: {
                    'X-CSRF-Token': context.csrfToken,
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.error) {
                setState({ displayErrorPage: true, finishedLoading: true });
            } else {
                const res = await fetch('/api/validate/avilableWeeks', {
                    headers: {
                        'X-CSRF-Token': context.csrfToken,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                setState({
                    displayErrorPage: false,
                    avilableWeeks: data.data,
                    finishedLoading: true,
                });
            }
        };

        getAvilableWeeks();
    }, []);

    const onFinish = async (values) => {
        console.log(values);
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
                <Forbidden />
            ) : (
                <Layout style={{ position: 'absolute', minWidth: '50%' }}>
                    <h1 style={{ marginLeft: '5rem' }}>Create New Report</h1>
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
                            <Select
                                style={{ maxWidth: '10%' }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Title of the report',
                                    },
                                ]}
                            >
                                {state.finishedLoading
                                    ? state.avilableWeeks.map((week) => (
                                          <Option value={week}>{week}</Option>
                                      ))
                                    : null}
                            </Select>
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
                            <Button type="primary" htmlType="submit">
                                Create Report
                            </Button>
                        </Form.Item>
                    </Form>
                </Layout>
            )}
        </motion.div>
    );
}

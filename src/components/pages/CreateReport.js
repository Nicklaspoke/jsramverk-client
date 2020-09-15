import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Layout, Select, Modal } from 'antd';
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

    const errorModal = () => {
        Modal.warning({
            title: 'Missing Week Number',
            content: 'Please select a week number before submitting',
        });
    };
    const onFinish = async (values) => {
        if (!values.week) {
            errorModal();
        } else {
            const res = await fetch('/api/reports', {
                method: 'POST',
                headers: {
                    'X-CSRF-Token': context.csrfToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (res.status === 201) {
                history.push(`/reports/week/${values.week}`);
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

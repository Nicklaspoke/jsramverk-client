import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Layout, Select, Modal } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';

import Forbidden from '../layout/errorPages/Forbidden';
import AppContext from '../../AppContext';

import { SlideInRight } from '../../PageAnimations';
const { variations, transition } = SlideInRight;

const { Option } = Select;

export default function EditReport() {
    const [state, setState] = useState({ avilableWeeks: [1] });
    const [form] = Form.useForm();
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
            console.log(res);
            const data = await res.json();
            if (data.error) {
                setState({ displayErrorPage: true, finishedLoading: true });
            } else {
                const res = await fetch('/api/validate/populatedWeeks', {
                    headers: {
                        'X-CSRF-Token': context.csrfToken,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                setState({
                    displayErrorPage: false,
                    populatedWeeks: data.data,
                    finishedLoading: true,
                });
            }
        };

        getAvilableWeeks();
    }, []);

    const handleChange = async (e) => {
        let res = await fetch(`/api/reports/week/${e}`);
        const data = await res.json();

        setState({
            displayErrorPage: false,
            populatedWeeks: state.populatedWeeks,
            finishedLoading: true,
            reportTitle: data.data.title,
            reportContent: data.data.content,
            selectedWeek: e,
        });
        form.resetFields(['title', 'content']);
    };

    const onFinish = async (values) => {
        let res = await axios.put(
            `/api/reports/week/${values.week}`,
            { ...values },
            {
                headers: {
                    'X-CSRF-Token': context.csrfToken,
                    'Content-Type': 'application/json',
                },
            },
        );
        res = res.data;
        if (!res.error) {
            history.push(`/reports/week/${values.week}`);
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
                <Forbidden />
            ) : (
                <Layout style={{ position: 'absolute', minWidth: '50%' }}>
                    <h1 style={{ marginLeft: '5rem' }}>Edit Reports</h1>
                    <Form
                        form={form}
                        initialValues={{ title: state.reportTitle, content: state.reportContent }}
                        layout="vertical"
                        name="create-report"
                        onFinish={onFinish}
                        style={{
                            marginLeft: '5rem',
                            marginTop: '0',
                            // minWidth: '20%',
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
                                            message: 'Choose a week report',
                                        },
                                    ]}
                                    onChange={handleChange}
                                >
                                    {state.populatedWeeks.map((week) => (
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
                                value={state.reportTitle}
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
                                autoSize="true"
                                value={state.reportContent}
                                placeholder="Content of the report"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={!state.selectedWeek}>
                                Update Report
                            </Button>
                        </Form.Item>
                    </Form>
                </Layout>
            )}
        </motion.div>
    );
}

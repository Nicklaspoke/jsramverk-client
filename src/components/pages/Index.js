import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import { SlideInRight } from '../../PageAnimations';
import axios from 'axios';
import getErrorPage from '../../helpers/getErrorPage';
const { Content } = Layout;
const { variations, transition } = SlideInRight;

export default function Index() {
    const [state, setState] = useState({});
    useEffect(() => {
        const getPresentation = async () => {
            try {
                let data = await axios('/api/');
                data = data.data;
                console.log(data);

                setState({ displayErrorPage: false, presentation: data.data.content });
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    if (status) {
                        setState({
                            displayErrorPage: true,
                            errorPage: getErrorPage(status),
                        });
                    }
                }
            }
        };
        getPresentation();
    }, []);
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
                <Content style={indexStyle}>
                    <div dangerouslySetInnerHTML={{ __html: state.presentation }} />

                    <p style={{ color: '#000000', cursor: 'default' }}>
                        Please find my location the network master dosen't let me publish the
                        location, I will try to make a backdoor in the comming weeks for you to
                        access the network and find out my location. I haven't seen the sky in
                        weeks.
                    </p>
                </Content>
            )}
        </motion.div>
    );
}

const indexStyle = {
    textAlign: 'center',
    position: 'absolute',
    margin: '0 2rem',
    padding: '1rem',
    left: 0,
    right: 0,
};

import React from 'react'
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import { SlideInRight } from '../../PageAnimations'
const { Content } = Layout;
const { variations, transition } = SlideInRight

export default function Index() {
    return (
        <motion.div initial='initial' animate='in' exit='out' variants={variations} transition={transition}>
            <Content style={indexStyle}>
                <h1>Well hello there fellow traveller of the internet</h1>
                <p>You might wonder where you have ended up. Maybe you got this link from a friend or colleague? Or you just happend to stumble accros by chance.</p>
                <p>Well when you are here, let me tell you some things about myself. Currently I reside in a singel person vault, also known as an apartment
                    located in a location known as <b style={{color: 'red'}}>REDACTED</b>. While living here, I do quite a few things. Among those are programming(obviosly),
                    playing MMO games like Runescape and World of Warcraft (WoW) and another plethora of games like platformers, action, simulation and puzzle games.
                    But I alse watch a lot of movies and TV-Shows among those the genere I watch the most are Action and Scifi.
                    That's about it about me, feel free to explre the site and enjoy the for now limitied content.
                </p>

                <p style={{ color: '#000000', cursor: 'default'}}>Please find my location the network master dosen't let me publish the location, I will try to make a backdoor in the comming weeks
                    for you to access the network and find out my location. I haven't seen the sky in weeks.
                </p>
            </Content>

        </motion.div>
    )
}

const indexStyle = {
    textAlign: 'center',
    position: 'absolute',
    margin: '0 2rem',
    padding: '1rem',
    left: 0,
    right: 0
}
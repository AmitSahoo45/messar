import React, { useEffect } from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import './Homepage.css'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'
import { useHistory } from 'react-router-dom'

const Homepage = () => {

    let history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) history.push("/chats");
    }, [history]);


    return (
        <Container
            maxW='xl'
            centerContent
        >
            <Box
                className='header-container-text'
            >
                <Text
                    className='header-container-text-font'
                >
                    Messar
                </Text>
            </Box>
            <Box
                className='login-box'
            >
                <Tabs isFitted variant='enclosed unstyled'>
                    <TabList
                        mb='1em'
                    >
                        <Tab
                            _selected={{ background: '#E3CAA5', outline: 'none', borderTop: '1px solid #000', borderRight: '1px solid #000', borderLeft: '1px solid #000' }}
                        >
                            Login</Tab>
                        <Tab
                            _selected={{ background: '#E3CAA5', outline: 'none', borderTop: '1px solid #000', borderRight: '1px solid #000', borderLeft: '1px solid #000' }}
                        >Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <SignUp />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Homepage
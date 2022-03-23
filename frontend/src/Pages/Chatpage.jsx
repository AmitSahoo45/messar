import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import './Chatpage.css'
import { ChatBox, MyChats, SideDrawer } from '../components/Chats'

const Chatpage = () => {
    const { user } = ChatState()

    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div className="chatpagebox">
            {user && <SideDrawer />}
            <Box
                className="message_Container"
            >
                {user && <MyChats
                    fetchAgain={fetchAgain}
                />}
                {user && <ChatBox
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                />}
            </Box>
        </div>
    )
}

export default Chatpage
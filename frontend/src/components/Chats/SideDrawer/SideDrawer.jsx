import React, { useState } from 'react'
import './sideDrawer.css'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../../Context/ChatProvider';
import ProfileModal from './ProfileModal/ProfileModal';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from './ChatLoading/ChatLoading';
import UserListItem from '../../UserAvatar/UserListItem';
import { getSender } from '../../../config/ChatLogics';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';


const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState()
  let history = useHistory();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    console.log(user)
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (

    <>
      <div className="parent-box">
        <Box
          className='sideDrawer'
        >
          <Tooltip
            label="Search User"
            hasArrow
            placement='bottom-end'
          >
            <Button
              variant='ghost'
              onClick={onOpen}
            >
              <i className="fas fa-search"></i>
              <Text
                d={{ base: 'none', md: 'flex' }}
                px={3}
              >
                Search User
              </Text>
            </Button>
          </Tooltip>
          <header>
            <Text
              className='sideDrawer-header'
            >
              Messar
            </Text>
          </header>
          <div>
            <Menu>
              <MenuButton p={1}>
                <NotificationBadge
                  count={notification.length}
                  effect={Effect.SCALE}
                />
                <BellIcon fontSize='2xl' m={1} />
              </MenuButton>
              <MenuList pl={2}>
                {!notification.length && "No New Messages"}
                {notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getSender(user, notif.chat.users)}`}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                <Avatar
                  size='sm'
                  cursor='pointer'
                  name={user.name}
                  src={user.pic}
                />
              </MenuButton>
              <MenuList>
                <ProfileModal user={user}>
                  <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Box>
        <Drawer
          placement='left'
          onClose={onClose}
          isOpen={isOpen}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              borderBottomWidth='2px'
            >
              Search Users
            </DrawerHeader>
            <DrawerBody>
              <Box
                className='drawer-body'
              >
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  onClick={handleSearch}
                >Go</Button>
              </Box>
              {loading ?
                <ChatLoading />
                :
                (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  ))
                )
              }
              {loadingChat && <Spinner ml="auto" d="flex" />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}

export default SideDrawer
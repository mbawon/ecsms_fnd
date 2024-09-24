import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ChatList, { ChatItem } from './ChatList';
import AgentStats from './AgentStats';
import { useCloseSession, useReply } from './services';
import { baseURL } from '@/common/configs/axios';
import { useStores } from '@/common/contexts/StoreContext';
import { toJS } from 'mobx';

const Chat: React.FC = () => {
    let messageEnd: { scrollIntoView: (arg0: { behavior: string; }) => void; };

    const { mutate: reply } = useReply()
    const { mutate: closeSession } = useCloseSession();
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const { UserStore } = useStores()
    const userName = toJS(UserStore.user)?.name
    const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
    const [scrolled, setScrolled] = useState(false)
    const [sessionClosed, setSessionClose] = useState(false)

    useEffect(() => {
        if (selectedChat) {
            const eventSource = new EventSource(`${baseURL}ws-messaging/sse/v1/messaging/incoming/messages?msisdn=${selectedChat.msisdn}&page=0&limit=10&sortBy=createdOn&sortDir=asc`, { withCredentials: false });

            eventSource.onmessage = (event) => {
                const newMessage = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            };

            return () => {
                eventSource.close();
            };
        }
        if (!scrolled) {
            scrollToBottom()
        }

    }, [selectedChat]);

    const handleSendMessage = (payload: any) => {
        if (inputMessage.trim() && userName) {
            const message = {
                id: uuidv4(),
                user: userName,
                text: inputMessage.trim(),
                chatId: selectedChat?.id,
            };

            reply(payload, {
                onSuccess: (response) => {
                    console.log(response)
                    setMessages((prevMessages) => [...prevMessages, message]);
                    setInputMessage('');
                },
                onError: (error) => {
                    console.log(error)
                }
            })


        }
    };

    const handleCloseSession = (payload: any) => {
        closeSession(payload, {
            onSuccess: (response) => {
                console.log(response)
                setMessages([])
                setSessionClose(true)
            },
            onError: (error) => {
                console.log(error)
            }
        })
    };

    const scrollToBottom = () => {
        messageEnd.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <nav className="bg-red-500 h-[70px] flex justify-between items-center px-4">
                <h1 className="text-white text-xl font-medium">Telecel EC-SMS Agent</h1>
                <NavLink to="/logout" className="flex items-center gap-1 text-white">
                    <LogOut className="w-5 h-5" />
                    <span className="text-lg font-light">Logout</span>
                </NavLink>
            </nav>

            <div className="flex flex-row h-[calc(100vh-70px)]">
                <ChatList selectedChat={selectedChat} setSelectedChat={setSelectedChat} sessionClosed={sessionClosed} />

                <div className="flex-1 flex flex-col p-4">
                    <AgentStats />

                    <div className="w-full bg-white p-4 flex justify-between items-center border border-b-0">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {selectedChat ? selectedChat.msisdn : 'Select a case'}
                        </div>
                        <button onClick={handleCloseSession} className={`p-2 px-4 rounded-xl ${!selectedChat ? "bg-gray-100 text-gray-500" : "bg-blue-500 text-white"}`} disabled={!selectedChat}>
                            Close Session
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-white border border-b-0 p-4" onScroll={() => setScrolled(true)}>
                        {selectedChat ? (
                            messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`p-2 my-2 rounded-xl max-w-xs ${message.user === userName
                                        ? 'ml-auto bg-gray-100'
                                        : 'mr-auto bg-gray-100'
                                        }`}
                                >
                                    <p>{message.text}</p>
                                    <p className="text-xs text-gray-600">{message.user}</p>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-500">Select a case to start messaging</p>
                            </div>
                        )}
                        <div style={{ float: "left", clear: "both" }} ref={(el: any) => { messageEnd = el; }}>
                        </div>
                    </div>

                    <div className="bg-white px-4">
                        <div className="flex items-center border mb-2 rounded-xl p-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 outline-none p-2 bg-white"
                                disabled={!selectedChat}
                            />
                            <button
                                onClick={() => handleSendMessage({})}
                                className={`ml-2 p-2 px-8 rounded-xl ${!selectedChat ? "bg-gray-100 text-gray-500" : "bg-blue-500 text-white"}`}
                                disabled={!selectedChat}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;

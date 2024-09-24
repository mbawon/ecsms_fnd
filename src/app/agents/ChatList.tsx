import { baseURL } from '@/common/configs/axios';
import { useStores } from '@/common/contexts/StoreContext';
import { LogOut, User } from 'lucide-react';
import { toJS } from 'mobx';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export interface ChatItem {
    id: number;
    msisdn: string;
    lastMessage: string;
}

interface Props {
    selectedChat: ChatItem | null;
    setSelectedChat: (chat: ChatItem) => void;
    sessionClosed: boolean;
}

const ChatList: React.FC<Props> = ({ selectedChat, setSelectedChat, sessionClosed }) => {
    const [cases, setCases] = React.useState<ChatItem[]>([]);
    const [sessionEnded, _] = useState(sessionClosed)
    const { UserStore } = useStores()
    const userName = toJS(UserStore.user)?.name

    useEffect(() => {
        const eventSource = new EventSource(`${baseURL}ws-messaging/sse/v1/messaging/incoming/messages?username=${userName}`, { withCredentials: false });

        eventSource.onmessage = (event) => {
            const updatedCases: ChatItem[] = JSON.parse(event.data);
            setCases(updatedCases);
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
        };

        return () => {
            eventSource.close();
        };
    }, [sessionEnded]);

    const handleChatClick = (chat: ChatItem) => {
        setSelectedChat(chat);
    };

    return (
        <div className="w-[300px] bg-white pt-4 border-r border-gray-300 overflow-y-auto flex flex-col justify-between">
            <div className='flex-1 flex flex-col'>
                <div className="bg-white border-b p-6">
                    <h2 className="text-xl font-bold mb-4">Cases</h2>
                    <p className="text-gray-700">Please select any case below to respond.</p>
                </div>

                {cases.length > 0 ? (
                    <ul>
                        {cases.map((chat) => (
                            <li
                                key={chat.id}
                                onClick={() => handleChatClick(chat)}
                                className={`p-3 px-6 rounded-lg mb-2 cursor-pointer flex items-center gap-1 ${selectedChat?.id === chat.id ? 'bg-blue-200' : 'bg-white'} hover:bg-blue-100`}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleChatClick(chat)}
                            >
                                <User className="w-4 h-4" />
                                <div>
                                    <p className="font-semibold">{chat.msisdn}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='flex justify-center items-center flex-1'>No cases available</div>
                )}
            </div>
            <NavLink to="/logout" className="flex flex-row items-center gap-1 px-8 text-red-500 border-t py-6">
                <LogOut className="w-4 h-4" />
                <span className="text-lg font-light">Logout</span>
            </NavLink>
        </div>
    );
};

export default ChatList;

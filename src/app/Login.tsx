import { useStores } from '@/common/contexts/StoreContext';
import Button from '@/components/ui/button';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from './services';

const LoginForm = observer(() => {
    const { mutate: loginMutate } = useLogin()
    const [error, setError] = useState(null)
    const [payload, setPayload] = useState({
        username: "",
        password: ""
    })
    const { UserStore } = useStores();
    const user = toJS(UserStore.user);

    if (user) {
        return <Navigate to="/" replace />;
    }

    const handleLogin = (payload: any) => {
        UserStore.saveUser({
            id: "1",
            name: "John Tanko",
            email: "john.tanko@telecel.com.gh",
            role: "agent",
        });

        // loginMutate(payload, {
        //     onSuccess: (response) => {
        //         console.log(response)
        //     },
        //     onError: (error: any) => {
        //         console.log(error)
        //         setError(error.message)
        //     }
        // })

        window.location.reload();
    };

    const handleInputChange = (e: any) => {
        let key = e.target.name
        let value = e.target.value
        setPayload(prev => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-red-500">
            <div className="h-screen bg-white p-8 w-full max-w-md flex flex-col gap-4 relative">
                {error && (
                    <div className='bg-red-100 border border-red-400 w-full h-auto p-2 mb-10 rounded-xl'>
                        <p className="text-gray-500 text-sm text-center">
                            {error}
                        </p>
                    </div>
                )}
                <div className='flex flex-col items-center gap-4'>
                    <img src="/images/logo.jpg" alt="Logo" className="w-24 h-24 rounded-xl" />
                    <div>
                        <h2 className="text-2xl font-bold text-center">Welcome to <span className='text-red-500 font-bold'>EC-SMS</span></h2>
                        <p className='text-center text-gray-500'>Please enter your telecel username and password to get started.</p>
                    </div>
                </div>
                <input
                    type="text"
                    id="username"
                    value={payload.username}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                    placeholder="Eg: john.doe"
                />

                <input
                    type="password"
                    id="password"
                    value={payload.password}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl outline-none"
                    placeholder="Password"
                />
                <Button label="Continue" loadingText='Processing...' onClick={() => handleLogin(payload)} />
            </div>
        </div>
    );
});

export default LoginForm;

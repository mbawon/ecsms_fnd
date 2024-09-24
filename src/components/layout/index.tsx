import { useModal } from '@/common/contexts/ModalContext'
import NavBar from './NavBar'
import { useStores } from '@/common/contexts/StoreContext'
import Switch from '../ui/Switch'
import { useState } from 'react'

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    const { showModal, setModalTitle } = useModal()
    const { UserStore } = useStores()
    const user = UserStore.user

    const showHandoverModal = () => {
        setModalTitle("Teri Handover")
        showModal(<TeriHandOver />)
    }
    return (
        <div className='relative w-full h-screen flex'>
            <div className="fixed w-[250px] h-full">
                <NavBar />
            </div>

            <div className='ml-[250px] p-4 w-full h-full overflow-auto bg-gray-100'>
                {children}
            </div>

            {user && user.role === "admin" && (
                <div className='fixed bottom-10 right-10 w-20 h-auto border border-gray-400 bg-white rounded-xl cursor-pointer flex flex-col items-center p-4' onClick={showHandoverModal}>
                    <img
                        src="/images/teri.jpg"
                        alt="teri"
                        className='rounded-full border border-red-500'
                    />
                    <h1 className='font-light'>Handover</h1>
                </div>
            )}
        </div>
    )
}

export default Layout

const TeriHandOver = () => {
    const [checked, setChecked] = useState(false)
    const toggle = () => {
        setChecked(!checked)
    }
    return (
        <div className='w-[500px] bg-white'>
            <div className="flex flex-col items-center justify-center gap-6 py-6">
                <p>Toggle between Teri and Agent in the handling case</p>
                <Switch checked={checked} onChange={toggle} />
                <div>{checked ? "TERI" : "AGENT"}</div>
            </div>
        </div>
    )
}

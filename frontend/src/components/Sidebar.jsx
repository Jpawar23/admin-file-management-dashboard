import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'

const navigation = [
    { name: 'Dashboard', to: '/', icon: HomeIcon, current: true },
    // { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Files', to: '/files', icon: FolderIcon, current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Sidebar() {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut()
        navigate('/login')
    }
    return (
        <div className="flex min-h-screen flex-col border-r border-gray-200 bg-white px-6">

            {/* Logo */}
            <div className="flex h-16 items-center w-48">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                />
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    classNames(
                                        isActive
                                            ? 'bg-gray-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                                    )
                                }
                            >
                                <item.icon
                                    className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                />
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Bottom Section */}
                <div className="-mx-6 mt-auto border-t border-gray-200">
                    {/* Logout */}
                    <button
                        // onClick={() => { navigate('/login') }}
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-x-3 px-6 py-3 text-sm/6 font-semibold
                                   text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    >
                        <ArrowRightOnRectangleIcon
                            className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        />
                        Log Out
                    </button>


                    {/* Profile */}
                    <div className="flex items-center gap-x-4 px-6 py-3">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                            className="size-8 rounded-full bg-gray-50"
                        />
                        <div className="text-sm">
                            <p className="font-semibold text-gray-900">Tom Cook</p>

                        </div>
                    </div>


                </div>
            </nav>


        </div>
    )
}


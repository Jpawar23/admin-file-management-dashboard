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

const navigation = [
    { name: 'Dashboard', to: '/', icon: HomeIcon, current: true },
    // { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Files', to: '/files', icon: FolderIcon, current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// export default function Sidebar() {
//     return (
//         <div className="relative flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 min-h-screen">
//             <div className="relative flex h-16 shrink-0 items-center w-48">
//                 <img
//                     alt="Your Company"
//                     src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//                     className="h-8 w-auto"
//                 />
//             </div>
//             <nav className="relative flex flex-1 flex-col">
//                 <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                     <li>
//                         <ul role="list" className="-mx-2 space-y-1">
//                             {navigation.map((item) => (
//                                 <li key={item.name}>
//                                     <NavLink
//                                         to={item.to}
//                                         className={classNames(
//                                             item.current
//                                                 ? 'bg-gray-50 text-indigo-600'
//                                                 : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
//                                             'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
//                                         )}
//                                     >
//                                         <item.icon
//                                             aria-hidden="true"
//                                             className={classNames(
//                                                 item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
//                                                 'size-6 shrink-0',
//                                             )}
//                                         />
//                                         {item.name}
//                                         {item.count ? (
//                                             <span
//                                                 aria-hidden="true"
//                                                 className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs/5 font-medium text-gray-600 outline outline-1 -outline-offset-1 outline-gray-200"
//                                             >
//                                                 {item.count}
//                                             </span>
//                                         ) : null}
//                                     </NavLink>
//                                 </li>
//                             ))}
//                         </ul>
//                     </li>

//                     <li className="-mx-6 mt-auto">
//                         {/* <a
//                             href="#"
//                             className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
//                         >
//                             <ArrowRightOnRectangleIcon className="h-auto w-8 text-gray-700 hover:bg-gray-50 hover:text-indigo-600" />


//                             <span className=" text-gray-700 hover:bg-gray-50 hover:text-indigo-600 text-sm/6 font-semibold">Log Out</span>
//                         </a> */}


//                         <a
//                             href="#"
//                             className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
//                         >
//                             <img
//                                 alt=""
//                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                                 className="size-8 rounded-full bg-gray-50 outline outline-1 -outline-offset-1 outline-black/5"
//                             />
//                             <span className="sr-only">Your profile</span>
//                             <span aria-hidden="true">Tom Cook</span>
//                         </a>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     )
// }

export default function Sidebar() {
    const navigate = useNavigate();
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
                        onClick={() => { navigate('/login') }}

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



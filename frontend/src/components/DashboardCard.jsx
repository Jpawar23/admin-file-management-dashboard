import React from "react";

// const DashboardCard = ({ title, value, icon: Icon, children }) => {
//     return (
//         <div className="bg-white rounded-lg shadow-sm border p-5 flex items-center justify-between">
//             <div>
//                 <p className="text-sm text-gray-500">{title}</p>
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                     {value}
//                     {children && <div className="mt-2">{children}</div>}

//                 </h2>
//             </div>

//             {Icon && (
//                 <div className="p-3 rounded-md bg-indigo-100">
//                     <Icon className="h-6 w-6 text-indigo-600" />
//                 </div>
//             )}

//         </div>
//     );
// };

const DashboardCard = ({ title, value, icon: Icon, children }) => {
    return (
        // <div className={`bg-white rounded-lg shadow-sm border p-5 flex items-center justify-between ${className}`}>
        <div className="mb-6 break-inside-avoid bg-white rounded-lg shadow-sm border p-5 flex items-center justify-between ">

            <div>
                <p className="text-sm text-gray-500">{title}</p>

                {value && (
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {value}
                    </h2>
                )}

                {children && <div className="mt-2">{children}</div>}
            </div>

            {Icon && (
                <div className="p-3 rounded-md bg-indigo-100 ml-4">
                    <Icon className="h-6 w-6 text-indigo-600" />
                </div>
            )}
        </div>
        // </div>
    );
};

export default DashboardCard;

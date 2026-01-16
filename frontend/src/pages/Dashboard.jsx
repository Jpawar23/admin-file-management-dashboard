import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "../components/DashboardCard";
import { DocumentIcon, ArchiveBoxIcon, ArrowUpTrayIcon, PhotoIcon } from "@heroicons/react/20/solid";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalFiles: 0,
        totalStorage: 0,
        recentUploads: [],
        fileTypes: []
    });

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/files/data"); // your dashboard API
                if (res.data.success) {
                    setDashboardData(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching dashboard data", err);
            }
        };

        fetchDashboard();
    }, []);

    // convert totalStorage to KB/MB
    const formatStorage = (bytes) => {
        if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
        if (bytes >= 1024) return (bytes / 1024).toFixed(2) + " KB";
        return bytes + " B";
    };
    const formatFileType = (type) => {
        if (!type) return "Unknown";

        if (type.includes("json")) return "JSON";
        if (type.includes("pdf")) return "PDF";
        if (type.includes("svg")) return "SVG";
        if (type.includes("png")) return "PNG";
        if (type.includes("jpg") || type.includes("jpeg")) return "JPG";
        if (type.includes("image")) return "IMAGE";

        return type;
    };

    return (
        // <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6  items-start">
        <div className="p-6 columns-1 sm:columns-2 lg:columns-3 gap-6">
            <DashboardCard
                title="Total Files"
                value={dashboardData.totalFiles}
                icon={DocumentIcon}
            />

            <DashboardCard
                title="Total Storage Used"
                value={formatStorage(dashboardData.totalStorage)}
                icon={ArchiveBoxIcon}
            />

            {/* <DashboardCard
                title="Recent Uploads"
                value={dashboardData.recentUploads.length}
                icon={ArrowUpTrayIcon}
            /> */}
            <DashboardCard
                title="Recent Uploads"
                icon={ArrowUpTrayIcon}
                className="col-span-1"
            >
                <div className="mt-2 text-sm space-y-1">
                    {dashboardData.recentUploads.length === 0 ? (
                        <div className="text-gray-400">No recent uploads</div>
                    ) : (
                        dashboardData.recentUploads.map((file) => (
                            <div
                                key={file._id}
                                className="truncate text-base font-semibold text-gray-800"
                                title={file.FileName}
                            >
                                {file.FileName}
                            </div>
                        ))
                    )}
                </div>
            </DashboardCard>

            {/* <DashboardCard
                title="File Types"
                value={dashboardData.fileTypes.length}
                icon={PhotoIcon}
            /> */}

            <DashboardCard
                title="File Types"
                icon={PhotoIcon}
            >
                <div className="mt-2 text-sm space-y-1">
                    {dashboardData.fileTypes.map((ft) => (
                        <div key={ft.type} className="flex justify-between capitalize text-base font-semibold text-gray-800">
                            <span>{formatFileType(ft.type)}</span>
                            <span className="font-medium">{ft.count}</span>
                        </div>
                    ))}


                </div>
            </DashboardCard>


        </div>
    );
};

export default Dashboard;

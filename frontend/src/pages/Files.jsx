import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import Pagination from "../components/Pagination";
const Files = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);


        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(
                "http://localhost:3000/api/files/upload",
                formData
            );
            setData((prev) => [res.data.data, ...prev]);
            await getdata();

        } finally {
            setLoading(false);
        }
    };


    // get api
    const getdata = async (page) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/files/all?page=${page}&limit=5`)
            setData(res.data.data)
            console.log("response", res.data.data);
        }
        catch (err) {
            console.error(err.message);

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deletedata = async (id) => {
        if (!window.confirm("Are you sure you want to delete this file?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/files/${id}`);
            setData((prev) => prev.filter(item => item._id !== id));
        }
        catch (err) {
            console.error("Delete error", err);
        }
    }
    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + " B"
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
        return (bytes / (1024 * 1024)).toFixed(2) + " MB"
    }

    return (
        <div className='px-0 py-8'>
            <h1 className='text-2xl text-center font-semibold text-gray-800'>
                Image & Pdf Uploader Platform
            </h1>

            <div className='mt-12 mx-auto flex justify-center items-center border border-dotted  2xl:w-[50%] xl:w-[70%]'>
                <div className='p-24'>

                    <input type="file" onChange={handleFileChange} />
                    {loading && <p>Uploading...</p>}

                </div>
            </div>

            <div className='mt-10'>
                <table className='border w-full'>
                    <thead>
                        <tr className='border'>
                            <th className='text-xl font-semibold text-gray-900'>
                                Id
                            </th>
                            <th className='text-xl font-semibold text-gray-900'>
                                Image/Pdf
                            </th>
                            <th className='text-xl font-semibold text-gray-900'>
                                File Type
                            </th>
                            <th className='text-xl font-semibold text-gray-900'>
                                Size
                            </th>
                            <th className='text-xl font-semibold text-gray-900'>
                                Created At
                            </th>
                            <th className='text-xl font-semibold text-gray-900'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={index} className="border p-2 items-center text-center">
                                        <td className='p-2 text-base font-medium text-gray-800 '>{item._id}</td>
                                        <td className='p-2 text-base font-medium text-blue-600'>{item.SavedFileName}</td>
                                        <td className='p-2 text-base font-medium text-gray-800'>{item.mimetype}</td>
                                        <td className='p-2 text-base font-medium text-gray-800'>{formatFileSize(Number(item.filesize))}</td>
                                        <td className='p-2 text-base font-medium text-gray-800'>{new Date(item.createdAt).toLocaleString("en-IN", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        }).replaceAll('/', '-')}</td>


                                        <td className='p-2 flex justify-center gap-4'>
                                            <a
                                                href={`http://localhost:3000${item.URL}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <button className='border bg-green-500 rounded-md p-1 text-base font-medium'>
                                                    View
                                                </button>
                                            </a>
                                            <button className='border bg-red-500 rounded-md p-1 text-base font-medium pointer' onClick={() => deletedata(item._id)}>Delete</button>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>


                </table>
            </div>

            <div className="mt-4">
                <Pagination />
            </div>
        </div>

    )
}

export default Files;
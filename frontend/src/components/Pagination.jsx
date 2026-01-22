import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'




export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex justify-end px-4 py-3">
            <nav className="inline-flex items-center gap-1">

                {/* PREVIOUS */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-2 py-2 border rounded disabled:opacity-50"
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                </button>

                {/* PAGE NUMBERS */}
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-4 py-2 border rounded text-sm font-medium
                                ${page === currentPage
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white hover:bg-gray-50"}
                            `}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* NEXT */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-2 py-2 border rounded disabled:opacity-50"
                >
                    <ChevronRightIcon className="h-5 w-5" />
                </button>

            </nav>
        </div>
    );
}

const InboxSkeleton = () => {
    return (
        <div className=" flex items-center py-4 border-b border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-4"></div>
            <div className="flex-1">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-500 rounded w-1/2"></div>
            </div>
        </div>
    );
};

export default InboxSkeleton;

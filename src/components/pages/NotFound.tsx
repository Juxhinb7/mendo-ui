import { Link } from "react-router-dom";

const NotFound: React.FC = (): JSX.Element => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-10rem)] justify-center items-center">
            <div className="flex flex-col items-center">
                <h1 className="text-[120px] font-extrabold text-gray-700">404</h1>
                <p className="text-2xl font-medium text-gray-600 mb-6">Page Not Found</p>
                <Link to="/" className="block py-2 px-4 text-white font-medium bg-cyan-600 rounded-lg shadow-lg hover:bg-cyan-500 hover:shadow-none cursor-pointer">
                    Go Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound;
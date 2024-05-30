import React from "react";
import { Link } from "react-router-dom";

function Header(): React.ReactElement {
    return (
        <div>
            <nav className="fixed top-0 left-0 w-full h-[3rem] flex items-center justify-between bg-blue-300 p-6 z-50">
                <div className="flex items-center">
                    <p className="mr-2 text-white hover:text-gray-800 ">
                        <Link to="/">Game</Link>
                    </p>
                    <div className="border-r-2 border-white h-6 mx-2"></div> 
                    <Link to="history" className="text-white hover:text-gray-800 ">
                        Player History
                    </Link>
                </div>
                <div className="flex-grow text-center">
                    <h1 className="font-bold text-3xl text-white">Bingo</h1>
                </div>
            </nav>
        </div>
    );
}

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import { IoGameController } from "react-icons/io5";


function Header(): React.ReactElement {
    return (
        <div>
            <nav className="fixed top-0 left-0 w-full flex items-center justify-between bg-blue-200 p-6 z-50">
                <p className="mr-2"><IoGameController className="text-3xl text-blue-600"/>
</p>
                <div className="flex items-center justify-center rounded bg-blue-200">
                    <Link to="history" className="text-blue-600 hover:text-blue-800 mr-4">Player History</Link>
                </div>
                <div className="flex-grow text-center">
                    <h1 className="font-bold text-6xl text-blue-600">Bingo</h1>
                </div>
            </nav>
        </div>
    );
}

export default Header;

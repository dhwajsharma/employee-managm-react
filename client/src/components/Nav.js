import React from "react";
import "./Nav.css";

const Nav = () => {
    return (
        <div className="nav-container">
            <div className="nav-left">
                <p>Employee Management</p>
            </div>
            <div className="nav-right">
                <a
                    target="_blank"
                    className="nav-github-link"
                    href="https://github.com/dhwajsharma/employee-managm-react"
                    rel="noreferrer"
                >
                    GitHub
        </a>
            </div>
        </div>
    );
};

export default Nav;

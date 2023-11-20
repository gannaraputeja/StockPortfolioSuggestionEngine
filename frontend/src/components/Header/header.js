import React from "react";
import ResponsiveMenu from "react-responsive-navbar";
import { Close } from "styled-icons/material/Close";
import { Menu } from "styled-icons/material/Menu";
import {NavLink} from "react-router-dom";

export default function(props) {
    return (
        <header className="header">
            <div className="wrap">
                <header className="logo">
                    <h1 className="logo-title">
                        <a href="#" className="logo-link">
                            Invest Wise
                        </a>
                    </h1>
                </header>
                <nav className="menu">
                    <ResponsiveMenu
                        menuOpenButton={
                            <div className="menu hamburger-menu menu-btn">
                                <Menu size={32} />
                            </div>
                        }
                        menuCloseButton={
                            <div className="menu hamburger-menu menu-btn">
                                <Close size={32} />
                            </div>
                        }
                        changeMenuOn="900px"
                        menu={
                            <ul className="menu-list">
                                <li className="menu-item is-active menu-item--play">
                                    <NavLink to="" className="menu-link">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="menu-item is-active menu-item--play">
                                    <NavLink to='trends' className="menu-link">
                                        Trends
                                    </NavLink>
                                </li>
                            </ul>
                        }
                    />
                </nav>
            </div>
        </header>
    );
}

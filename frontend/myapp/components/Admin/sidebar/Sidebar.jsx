import React from 'react'
import { useState } from 'react';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import { 
  MdOutlineHome,
  MdOutlineLogout,
  MdDirectionsBus,
  MdLocationOn,
  MdRoute,
  MdBarChart,
  MdLanguage
} from 'react-icons/md';
import {FaUniversity} from 'react-icons/fa'
import { useLanguage } from '../../../context/LanguageContext';
import { translations } from '../../../translations/translations';

function Sidebar() {
  const [activeMenuItem, setActiveMenuItem] = useState(
    sessionStorage.getItem('activeMenu') === null ? 'home' : sessionStorage.getItem('activeMenu')
  );
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const handleMenuItemActive = (menuItem) => {
    setActiveMenuItem(menuItem);
    sessionStorage.setItem('activeMenu', menuItem);
  };

  return (
    <nav className="sidebar sidebar-show">
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <MdDirectionsBus size={35} className="brand-icon" />
          <span className="sidebar-brand-text">{t.admin.sidebar.title}</span>
        </div>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link
                to="/admin"
                className={`menu-link ${activeMenuItem === "home" ? "active" : ""}`}
                onClick={() => handleMenuItemActive("home")}
              >
                <span className="menu-link-icon">
                  <MdOutlineHome size={24} />
                </span>
                <span className="menu-link-text">{t.admin.sidebar.home}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/admin/univ-sections"
                className={`menu-link ${activeMenuItem === "universities" ? "active" : ""}`}
                onClick={() => handleMenuItemActive("universities")}
              >
                <span className="menu-link-icon">
                  < FaUniversity size={24} />
                </span>
                <span className="menu-link-text">{t.admin.sidebar.universitySection}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/admin/routes"
                className={`menu-link ${activeMenuItem === "routes" ? "active" : ""}`}
                onClick={() => handleMenuItemActive("routes")}
              >
                <span className="menu-link-icon">
                  <MdRoute size={24} />
                </span>
                <span className="menu-link-text">{t.admin.sidebar.routes}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/admin/buses"
                className={`menu-link ${activeMenuItem === "buses" ? "active" : ""}`}
                onClick={() => handleMenuItemActive("buses")}
              >
                <span className="menu-link-icon">
                  <MdDirectionsBus size={24} />
                </span>
                <span className="menu-link-text">{t.admin.sidebar.buses}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/admin/stations"
                className={`menu-link ${activeMenuItem === "stations" ? "active" : ""}`}
                onClick={() => handleMenuItemActive("stations")}
              >
                <span className="menu-link-icon">
                  <MdLocationOn size={24} />
                </span>
                <span className="menu-link-text">{t.admin.sidebar.stations}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link
                to="/admin/statistics"
                className={`menu-link ${activeMenuItem === "statistics" ? "active" : ""}`}
                onClick={() => handleMenuItemActive("statistics")}
              >
                <span className="menu-link-icon">
                  <MdBarChart size={24} />
                </span>
                <span className="menu-link-text">{t.admin.sidebar.statistics}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/admin/language"
                className={`menu-link ${activeMenuItem === "language" ? "active" : ""}`}
                onClick={() => handleMenuItemActive("language")}
              >
                <span className="menu-link-icon">
                  <MdLanguage size={24} />
                </span>
                <span className="menu-link-text">{t.admin.sidebar.language}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/logout"
                className={`menu-link ${activeMenuItem === "logout" ? "active" : ""}`}
                onClick={() => {
                  handleMenuItemActive("logout");
                  sessionStorage.removeItem('token');
                  sessionStorage.removeItem('accountId');
                  sessionStorage.removeItem('activeMenu');
                }}
              >
                <span className="menu-link-icon">
                  <MdOutlineLogout size={24} />
                </span>
                <span className="menu-link-text">{t.admin.sidebar.logout}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;

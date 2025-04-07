import React, { useState, useMemo } from 'react';
import { MdSearch, MdLocationOn } from 'react-icons/md';
import { FaFilter, FaBus, FaPhoneAlt, FaUniversity, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '../../../../context/LanguageContext';
import { translations } from '../../../../translations/translations';
import './HomeDashboard.scss';
import LoadingData from '../loadingData/LoadingData.jsx';
import LoadingError from '../loadingError/LoadingError.jsx';
import { useHomeDashboard } from '../../../../hooks/useHomeDashboard.js';

const HomeDashboard = () => {

  const {loading,error,routes} = useHomeDashboard();

  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');

  // Get unique sections for filter dropdown
  const sections = useMemo(() => {
    return ['all', ...new Set(routes.map(route => route.section))];
  }, [routes]);

  // Filter routes based on search query and selected section
  const filteredRoutes = useMemo(() => {
    return routes.filter(route => {
      const matchesSearch = searchQuery === '' || 
        route.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.mainStation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.internalStations.some(station => 
          station.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesSection = selectedSection === 'all' || route.section === selectedSection;

      return matchesSearch && matchesSection;
    });
  }, [routes, searchQuery, selectedSection]);


  if(loading) { 
       return   <LoadingData/>  
  }

  if(error) {
    return <LoadingError/>;
  }

  return (
    <div className="home-dashboard">
      <div className="dashboard-header">
        <h1>{t.admin.home.title}</h1>
        <p>{t.admin.home.summary}</p>
        
        <div className="search-filter-container">
          <div className="search-bar">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder={t.admin.home.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-bar">
            <FaFilter className="filter-icon" />
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              {sections.map(section => (
                <option key={section} value={section}>
                  {section === 'all' ? t.admin.home.allSections : section}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="routes-grid">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map((route) => (
            <div key={route.id} className="route-card">
              <div className="route-card-header">
                <div className="route-info">
                  <div className="route-icon">
                    <FaUniversity />
                  </div>
                  <div className="route-details">
                    <h3>{route.section}</h3>
                    <p className="main-station">
                      <FaMapMarkerAlt className="location-icon" />
                      {route.mainStation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="route-content">
                <div className="stations">
                  <div className="stations-icon">
                    <MdLocationOn />
                  </div>
                  <div className="stations-list">
                    {route.internalStations.map((station, index) => (
                      <span key={index} className="station-chip">
                        {station}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="buses">
                  {route.busesInfo.map((bus, index) => (
                    <div key={index} className="bus-info">
                      <div className="bus-header">
                        <div className="bus-icon">
                          <FaBus />
                        </div>
                        <div className="bus-details">
                          <h4>{bus.busNumber}</h4>
                          <div className="driver-info">
                            <p className="driver-name">{bus.driverName}</p>
                            <p className="driver-phone">
                              <FaPhoneAlt />
                              {bus.driverPhone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-routes">{t.admin.home.noRoutes}</div>
        )}
      </div>
    </div>
  );
};

export default HomeDashboard;
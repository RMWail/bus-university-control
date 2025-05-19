import { 
  MdDirectionsBus, 
  MdCheckCircle, 
  MdFreeCancellation,
  MdRoute,
  MdLocationOn,
  MdWarning,
  MdChecklist
} from 'react-icons/md';
import './Statistics.scss';
import { useLanguage } from '../../../../context/LanguageContext';
import { translations } from '../../../../translations/translations';
import LoadingData from '../loadingData/LoadingData.jsx';
import LoadingError from '../loadingError/LoadingError.jsx';
import { useStatistics } from '../../../../hooks/useStatistics.js';

const Statistics = () => {

  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const {loading,error,stats} = useStatistics();

  const cards = [
    {
      title: t.admin.statistics.totalBuses || 0,
      value: stats.totalBuses,
      icon: <MdDirectionsBus />,
      color: '#4CAF50'
    },
    {
      title: t.admin.statistics.activeBuses || 0,
      value: stats.activeBuses,
      icon: <MdCheckCircle />,
      color: '#2196F3'
    },
    {
      title: t.admin.statistics.inactiveBuses || 0,
      value: stats.inactiveBuses,
      icon: <MdFreeCancellation />,
      color: 'orange'
    },
    {
      title: t.admin.statistics.totalRoutes || 0,
      value: stats.totalRoutes,
      icon: <MdRoute />,
      color: '#FF9800'
    },
    {
      title: t.admin.statistics.totalStations || 0,
      value: stats.totalStations,
      icon: <MdLocationOn />,
      color: '#9C27B0'
    },
    {
      title: t.admin.statistics.coveredStations || 0,
      value: stats.coveredStations,
      icon: <MdChecklist />,
      color: '#4CAF50'
    },
    {
      title: t.admin.statistics.uncoveredStations || 0,
      value: stats.uncoveredStations,
      icon: <MdWarning />,
      color: '#FF5722'
    }
  ];

  if(loading) {
    return (
      <LoadingData/>
    );
  }

  if(error) {
    return <LoadingError/>;
  }


  return (
    <div className="statistics-container">
      <h1 className="statistics-title">{t.admin.statistics.title}</h1>
      <div className="statistics-grid">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="stat-card"
            style={{ '--card-color': card.color }}
          >
            <div className="card-icon">
              {card.icon}
            </div>
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-value">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;

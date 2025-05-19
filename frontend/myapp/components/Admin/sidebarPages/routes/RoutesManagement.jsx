import React, { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdSearch, 
  MdDirectionsBus, 
  MdLocationOn, 
} from 'react-icons/md';
import { TimePicker } from 'antd';
import './RoutesManagement.scss';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import dayjs from 'dayjs';
import swal from 'sweetalert2';
import { useLanguage } from '../../../../context/LanguageContext';
import { translations } from '../../../../translations/translations';
import LoadingData from '../loadingData/LoadingData.jsx';
import LoadingError from '../loadingError/LoadingError.jsx';
import { useRoutes } from '../../../../hooks/useRoutes.js';
const RoutesManagement = () => {
  const {loading,error,routes,availableStations,availableBuses,universitySections,addNewRoute,editRoute,deleteRoute} = useRoutes();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const [errors,setErrors] = useState({});
  const [newRoute, setNewRoute] = useState({
    ID_RELATION: '',
    ID_UNIV:'',
    universitySection: '',
    ID_STATION:'',
    mainStation: '',
    internalStations: [],
    buses: [],
    goSchedules: [],
    backSchedules: []
  });
  


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRoutes = routes.filter(route => 
    route.mainStation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.internalStations.some(station => 
      station.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleAddBus = (bus) => {
    console.log('bus = '+bus);
    if (bus && !newRoute.buses.includes(bus)) {
      setNewRoute(prev => ({
        ...prev,
        buses: [...prev.buses, bus]
      }));
    }
  };

  const handleRemoveBus = (bus) => {
    setNewRoute(prev => ({
      ...prev,
      buses: prev.buses.filter(b => b !== bus)
    }));
  };

  const handleAddInternalStation = (station) => {
    if (station && !newRoute.internalStations.includes(station)) {
      setNewRoute(prev => ({
        ...prev,
        internalStations: [...prev.internalStations, station]
      }));
    }
  };

  const handleRemoveInternalStation = (station) => {
    setNewRoute(prev => ({
      ...prev,
      internalStations: prev.internalStations.filter(s => s !== station)
    }));
  };

  const handleAddGoSchedule = (time) => {
    if (time) {
      const formattedTime = dayjs(time).format('HH:mm');
      if (!newRoute.goSchedules.includes(formattedTime)) {
        setNewRoute(prev => ({
          ...prev,
          goSchedules: [...prev.goSchedules, formattedTime].sort()
        }));
      }
    }
  };

  const handleAddComeSchedule = (time) => {
    if (time) {
      const formattedTime = dayjs(time).format('HH:mm');
      if (!newRoute.backSchedules.includes(formattedTime)) {
        setNewRoute(prev => ({
          ...prev,
          backSchedules: [...prev.backSchedules, formattedTime].sort()
        }));
      }
    }
  };

  const handleRemoveGoSchedule = (time) => {
    setNewRoute(prev => ({
      ...prev,
      goSchedules: prev.goSchedules.filter(t => t !== time)
    }));
  };

  const handleRemoveComeSchedule = (time) => {
    setNewRoute(prev => ({
      ...prev,
      backSchedules: prev.backSchedules.filter(t => t !== time)
    }));
  };

  const getUniversitySectionName = (id) => {
    const section = universitySections.find(section => section.UNIV_ID == id);
    return section ? section.UNIV_NAME : '';
  };

  const getStationName = (id) => {
    const station = availableStations.find(station => station.ID == id);
    return station ? station.stationName : '';
  };

    
  const handleEdit = (route) => {
   //  console.log(route);
    setEditingRoute(route);
    setNewRoute(route);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    
    const validationErrors = {};



   
    if(newRoute.mainStation==''){
     
      validationErrors.mainStation = `${t.admin.validationErrors.mainStation}`;
    }   
  
    if(newRoute.universitySection==''){
      validationErrors.universitySection = `${t.admin.validationErrors.universitySection}`;
    }

    if(newRoute.internalStations.length<=0){
      validationErrors.internalStations = `${t.admin.validationErrors.internalStations}`;
    }
    if(newRoute.buses.length<=0){
      validationErrors.buses = `${t.admin.validationErrors.buses}`;
    }
    if(newRoute.goSchedules.length<=0){
      validationErrors.goSchedules = `${t.admin.validationErrors.goSchedules}`;
    }
    if(newRoute.backSchedules.length<=0){
      validationErrors.backSchedules = `${t.admin.validationErrors.backSchedules}`;
    }


   setErrors(validationErrors);

   if(Object.keys(validationErrors).length==0){
    
    if (editingRoute) {

     swal.fire({
      icon:'warning',
      title:t.admin.routes.confirmation,
      html:`<span style=color:"orangered"}>${t.admin.routes.confirmEdit}</span>`,
      showCancelButton:true,
      confirmButtonText:`${t.admin.routes.confirm}`,
      cancelButtonText: `${t.admin.routes.cancel}`,
      confirmButtonColor:'#e67e22'
    }).then(async(res)=> {
      if(res.isConfirmed) {
        const targetRoute = routes.find(route => route.id === newRoute.id);
        const oldBuses = targetRoute.buses;
        console.log("Sent Data = \n"+newRoute.id+"  "+oldBuses+"  "+newRoute.internalStations)
        const editRouteResponse = await editRoute({routeId:newRoute.id,oldBuses:oldBuses,updatedRoute:newRoute});
        console.log('editRouteResponse = ',editRouteResponse);

        if(editRouteResponse.status == 200){

          if(editRouteResponse.data.message == 'Exist'){
            swal.fire({
              icon:'warning',
              title:t.admin.routes.error,
              html:`<span style="color:red">${t.admin.routes.routeExists}</span>`,
              confirmButtonColor:'#e67e22',
              timer:3500,
              showConfirmButton:false,
            })
          }
         else {
          swal.fire({
            icon:'success',
            title:t.admin.routes.success,
            html:`<span style="color:green">${t.admin.routes.updateMsg}</span>`,
            timer:3500,
            showConfirmButton:false,
          })}


          setShowModal(false);
          setNewRoute({
            ID_UNIV:'',
            universitySection: '',
            ID_STATION:'',
            mainStation: '',
            internalStations: [],
            buses: [],
            goSchedules: [],
            backSchedules: []
          });
          setEditingRoute(null);
        }

        if(editRouteResponse.code=='ERR_NETWORK'){
          swal.fire({
            icon:'error',
            title:t.admin.routes.error,
            text:t.admin.routes.errorNetwork,
            confirmButtonColor:'#e67e22',
            timer:3500,
            showConfirmButton:false,
          })
        }
        if(editRouteResponse.code=='ERR_BAD_REQUEST'){
          swal.fire({
            icon:'error',
            title:t.admin.routes.error,
            text:`${editRouteResponse.data.error}`,
            confirmButtonColor:'#e67e22',
            timer:3500,
            showConfirmButton:false,
          })
        }
      }
    })
  
      } else {
       
        swal.fire({
          icon:'warning',
          title:t.admin.routes.confirmation, 
          html:`<span style="color:orangered">${t.admin.routes.confirmAdd}</span>`,
          showCancelButton:true,
          confirmButtonText:`${t.admin.routes.confirm}`,
          cancelButtonText:t.admin.routes.cancel,
          confirmButtonColor:'#e67e22',
        })
        .then(async(res)=>{
          if(res.isConfirmed){
           const addNewRouteResponse = await addNewRoute(newRoute);
            console.log('addNewRouteResponse = ',addNewRouteResponse);
    
            if(addNewRouteResponse.status == 200){
    
                if(addNewRouteResponse.data.message!='Exist'){
                  swal.fire({
                    icon:'success',
                    title:t.admin.routes.success,
                    html:`<span style="color:green">${t.admin.routes.addSuccessMsg}</span>`,
                    confirmButtonColor:'#e67e22',
                    timer:3500,
                    showConfirmButton:false,
                  })
    
                  setShowModal(false);
                  setNewRoute({
                    universitySection: '',
                    mainStation: '',
                    internalStations: [],
                    buses: [],
                    goSchedules: [],
                    backSchedules: []
                  });
                  setEditingRoute(null);
                }
                else {

                  swal.fire({
                    icon:'warning',
                    title:`${t.admin.routes.routeExists}`,
                    html:`<span style="color:red">${newRoute.mainStation} ${t.admin.routes.to} ${newRoute.universitySection}</span>`,
                    confirmButtonColor:'#e67e22',
                    timer:3500,
                    showConfirmButton:false,
                  }) }
            }
    
            if(addNewRouteResponse.code=='ERR_NETWORK'){
              swal.fire({
                icon:'error',
                title:t.admin.routes.error,
                text:t.admin.routes.errorNetwork,
                confirmButtonColor:'#e67e22',
                timer:3500,
                showConfirmButton:false,
              })
            }
            if(addNewRouteResponse.code=='ERR_BAD_REQUEST'){
              swal.fire({
                icon:'error',
                title:t.admin.routes.error,
                text:`${addNewRouteResponse.data.error}`,
                confirmButtonColor:'#e67e22',
                timer:3500,
                showConfirmButton:false,
              })
            }
          }
        })
  
      }
   }

  };

  
  const handleDelete = (routeId) => {
    swal.fire({
      icon:'warning',
      iconColor:'red',
      title:t.admin.routes.confirmation,
      html:`<span style="color:red">${t.admin.routes.confirmDelete}</span>`,
      showCancelButton:true,
      confirmButtonText:`${t.admin.routes.confirm}`,
      cancelButtonText:t.admin.routes.cancel,
      confirmButtonColor:'#e67e22'
    }) 
    .then(async(res)=>{
      if(res.isConfirmed){
    
        const deleteRouteResponse = await deleteRoute(routeId);
        console.log('deleteRouteResponse = ',deleteRouteResponse);

        if(deleteRouteResponse.status == 200){

          swal.fire({
            icon:'success',
            title:t.admin.routes.success,
            html:`<span style="color:green">${t.admin.routes.deleteMsg}</span>`,
            timer:3500,
            showConfirmButton:false,
          })
        }

          if(deleteRouteResponse.code=='ERR_NETWORK'){
            swal.fire({
              icon:'error',
              title:t.admin.routes.error,
              text:t.admin.routes.errorNetwork,
              confirmButtonColor:'#e67e22',
              timer:3500,
              showConfirmButton:false,
            })
          }
          if(deleteRouteResponse.code=='ERR_BAD_REQUEST'){
            swal.fire({
              icon:'error',
              title:t.admin.routes.error,
              text:`${deleteRouteResponse.data.error}`,
              confirmButtonColor:'#e67e22',
              timer:3500,
              showConfirmButton:false,
            })
          }
        

      }
    })
  };

  if(loading) {
    return (
      <LoadingData/>
    )
  }

  if(error) {
    return <LoadingError/>;
  }

  return (
    <div className="routes-management">
      <div className="routes-header">
      <div className="search-box">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder={t.admin.routes.search}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <button className="add-route-btn" onClick={() => setShowModal(true)}>
          <MdAdd /> {t.admin.routes.addRoute}
        </button>
      </div>

      <div className="routes-grid">
        {filteredRoutes.map(route => (
          <div key={route.id} className="route-card">
            <div className="route-card-header">
              <div className="route-info">
                <div className="route-icon">
                  <MdDirectionsBus />
                </div>
                <div className="route-details">
                  <h3>{route.mainStation}</h3>
                  <p className="section">{route.section}</p>
                </div>
              </div>
              <div className="route-actions">
                <button onClick={() => handleEdit(route)} className="edit-btn">
                  <MdEdit />
                </button>
                <button onClick={() => handleDelete(route.id)} className="delete-btn">
                  <MdDelete />
                </button>
              </div>
            </div>

            <div className="route-content">
              <div className="stations">
                <div className="stations-icon">
                  <MdLocationOn />
                </div>
                <div className="stations-list">
                  {route.internalStations.map((station, idx) => (
                    <span key={idx} className="station-chip">{station}</span>
                  ))}
                </div>
              </div>

              <div className="buses">
                <div className="buses-icon">
                  <MdDirectionsBus />
                </div>
                <div className="buses-list">
                  {route.buses.map((bus, idx) => (
                    <span key={idx} className="bus-chip">{bus}</span>
                  ))}
                </div>
              </div>

              <div className="schedules">
                <FaArrowCircleRight className="info-icon" color='#4caf50'/>
                {route.goSchedules.map((time, idx) => (
                  <span key={idx} className="time-chip">{time}</span>
                ))}
              </div>

              <div className="schedules">
                <FaArrowCircleLeft className="info-icon" color='#f44336'/>
                {route.backSchedules.map((time, idx) => (
                  <span key={idx} className="time-chip">{time}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingRoute ? t.admin.routes.editRoute : t.admin.routes.addRoute}</h2>


            <div className="form-group">
              <label>{t.admin.routes.mainStation}</label>
                <select
                  onChange={(e) => setNewRoute(prev => ({ ...prev, ID_STATION: e.target.value,mainStation: getStationName(e.target.value) }))}
                >
                
           {
                              editingRoute ? (
                                <>
                                  <option value={editingRoute.ID_STATION}>{editingRoute.mainStation}</option>
                                {availableStations.filter(station => station.stationName != editingRoute.mainStation).map(station => (
                                  <option key={station.ID} value={station.ID}>{station.stationName}</option>
                                ))}
                                </>
                              ) : (
                               <>
                               <option value="">{t.admin.routes.selectStation}</option>
                                {availableStations.map(station => (
                                  <option key={station.ID} value={station.ID}>{station.stationName}</option>
                                ))}
                               </>
                              )
                            
           }
                </select>
                {errors.mainStation && <span style={{color:'red'}}>{errors.mainStation}</span>}
            </div>


            <div className="form-group">
              <label>{t.admin.routes.universitySection}</label>
              <select
                value={newRoute.ID_UNIV}
                onChange={(e) => setNewRoute(prev => ({ ...prev, ID_UNIV: e.target.value,universitySection: getUniversitySectionName(e.target.value) }))}
              >
{                editingRoute ? (
                      <>
                      <option value={editingRoute.ID_UNIV}>{editingRoute.section}</option>
                {universitySections.filter(section => section.UNIV_NAME != editingRoute.section).map(section => (
                  <option key={section.UNIV_ID} value={section.UNIV_ID}>{section.UNIV_NAME}</option>
                ))}
                      </>
                ) :(
                   <>
                   <option value="">{t.admin.routes.selectSection}</option>
                {universitySections.map(section => (
                  <option key={section.UNIV_ID} value={section.UNIV_ID}>{section.UNIV_NAME}</option>
                ))}
                   </>
                )}

              </select>
              {errors.universitySection && <span style={{color:'red'}}>{errors.universitySection}</span>}
            </div>

            <div className="form-group">
              <label>{t.admin.routes.internalStations}</label>
              <div className="input-with-chips">
                <input
                  type="text"
                  placeholder={t.admin.routes.addStation}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddInternalStation(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <div className="chips-container">
                  {newRoute.internalStations.map((station, idx) => (
                    <span key={idx} className="chip">
                      {station}
                      <button onClick={() => handleRemoveInternalStation(station)}>&times;</button>
                    </span>
                  ))}
                </div>
              </div>
              {errors.internalStations && <span style={{color:'red'}}>{errors.internalStations}</span>}
            </div>

            <div className="form-group">
              <label>{t.admin.routes.buses}</label>
              <div className="input-with-chips">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddBus(e.target.value);
                      
                    }
                  }}
                >
                  <option value="">{t.admin.routes.selectBus}</option>
                  {availableBuses
                    .filter(bus => !newRoute.buses.includes(bus))
                    .map(bus => (
                      <option key={bus.NUMERO_BUS} value={bus.NUMERO_BUS}>BUS - {bus.NUMERO_BUS}</option>
                    ))}
                </select>
                {errors.buses && <span style={{color:'red'}}>{errors.buses}</span>}
                <div className="chips-container">
                  {newRoute.buses.map((bus, idx) => (
                    
                    <span key={idx} className="chip">
                      BUS-{bus}
                      <button onClick={() => handleRemoveBus(bus)}>&times;</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="schedules-section">
              <div className="form-group">
                <label>
                  <FaArrowCircleRight className="schedule-icon" color="#4caf50" />
                  {t.admin.routes.goSchedules}
                </label>
                <div className="schedule-input">
                  <TimePicker
                    format="HH:mm"
                    placeholder={t.admin.routes.selectTime}
                    onChange={handleAddGoSchedule}
                  />
                  <div className="chips-container">
                    {newRoute.goSchedules.map((time, idx) => (
                      <span key={idx} style={{borderRadius:'30px'}} className="chip">
                        {time}
                        <button onClick={() => handleRemoveGoSchedule(time)}>&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
                {errors.goSchedules && <span style={{color:'red'}}>{errors.goSchedules}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaArrowCircleLeft className="schedule-icon" color="#f44336" />
                  {t.admin.routes.backSchedules}
                </label>
                <div className="schedule-input">
                  <TimePicker
                    format="HH:mm"
                    placeholder={t.admin.routes.selectTime}
                    onChange={handleAddComeSchedule}
                  />
                  <div className="chips-container">
                    {newRoute.backSchedules.map((time, idx) => (
                      <span key={idx} style={{borderRadius:'30px'}} className="chip">
                        {time}
                        <button onClick={() => handleRemoveComeSchedule(time)}>&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
                {errors.backSchedules && <span style={{color:'red'}}>{errors.backSchedules}</span>}
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={() => {
                setShowModal(false);
                setEditingRoute(null);
                setNewRoute({
                  universitySection: '',
                  mainStation: '',
                  internalStations: [],
                  buses: [],
                  goSchedules: [],
                  backSchedules: []
                });
                setErrors({});
              }} className="cancel-btn">
                {t.admin.forms.cancel}
              </button>
              <button onClick={handleSubmit} className="submit-btn">
                {editingRoute ? t.admin.forms.edit : t.admin.forms.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutesManagement;

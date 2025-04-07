 /*
 import React, { useState, useEffect } from 'react';
import { MdLocationOn, MdAdd, MdEdit, MdDelete, MdSearch } from 'react-icons/md';
import axios from 'axios';
import './StationsManagement.scss';
import swal from 'sweetalert2';
import { useLanguage } from '../../../../context/LanguageContext';
import { translations } from '../../../../translations/translations';
import LoadingData from '../loadingData/LoadingData.jsx';
import LoadingError from '../loadingError/LoadingError.jsx';

const StationsManagement = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [stations, setStations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors,setErrors] = useState({});
  const [newStation, setNewStation] = useState({
    id: '',
    name: '',
  });

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${apiUrl}/getAllStations`);
        setStations(
          response.data.stations.map(({ ID_ARRET, NOM_ARRET }) => ({
            id: ID_ARRET,
            name: NOM_ARRET
          }))
        );
      } catch (error) {
        setError(error.message);
        
      }
      finally {
        setLoading(false);
      }
    };

      fetchStations();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStations = stations.filter(station => 
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (station) => {
    setEditingStation(station);
    setNewStation({
      id:station.id,
      name:station.name,
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
   // e.preventDefault();

    const validationErrors = {};

    if(!newStation.name.trim()){
      validationErrors.stationName = `${t.admin.validationErrors.stationName}`;
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length ==0){
      if (editingStation) {

      
        swal.fire({
          icon:'warning',
          title:t.admin.stations.confirmation,
          text:`${t.admin.stations.confirmEdit}`,
          showCancelButton:true,
          confirmButtonText:`${t.admin.stations.confirm}`,
          cancelButtonText:`${t.admin.stations.cancel}`,
          confirmButtonColor:'#e67e22'
         }).then((res)=>{
          if(res.isConfirmed){
            axios.post(`${apiUrl}/updateStation`, newStation)
            .then(response => {
              console.log(response.data.message);
              swal.fire({
                icon:'success',
                title:t.admin.stations.success, 
                text:`${t.admin.stations.updateMsg}`, 
                showConfirmButton:false,
                timer:3000,
              });
              setStations(prev => prev.map(station => 
                station.id == editingStation.id ? { ...newStation, id: station.id } : station
              ));
            
        
            })
            .catch(error => {
              swal.fire('Error', `${t.admin.stations.error}`, 'error');
            });  
          
            setShowModal(false);
            setNewStation({
              id:'',
              name: '',
            });
            setEditingStation(null);
          }
          
         })
  
  
  
      
      } else {
  
         swal.fire({
          icon:'warning',
          title:t.admin.stations.confirmation,
          text:`${t.admin.stations.confirmAdd}`,
          showCancelButton:true,
          confirmButtonText:`${t.admin.stations.confirm}`,
          cancelButtonText:`${t.admin.stations.cancel}`,
          confirmButtonColor:'#e67e22'
         }).then((res)=>{
          if(res.isConfirmed){
            axios.post(`${apiUrl}/addStation`, newStation)
            .then(response => {
              console.log(response.data.message);
              
              swal.fire({
                icon:'success',
                title:t.admin.stations.success, 
                text:`${t.admin.stations.successMsg}`, 
                showConfirmButton:false,
                timer:3000,
              });
              const addedStation = { id: response.data.newStationId, name: newStation.name };
              setStations(prev => [...prev,addedStation]);
            })
            .catch(error => {
              swal.fire('Error', `${t.admin.stations.error}`, 'error');
            });  
          
            setShowModal(false);
            setNewStation({
              id:'',
              name: '',
            });
            setEditingStation(null);
          }
          
         })
  
  
      }
  
    }
          
  };



  const handleDelete = (stationId) => {
    swal.fire({
      icon:'warning',
      iconColor:'red',
      title:t.admin.stations.confirmation,
      text:`${t.admin.stations.confirmDelete}`,
      showCancelButton:true,
      confirmButtonText:`${t.admin.stations.confirm}`,
      cancelButtonText:`${t.admin.stations.cancel}`,
      confirmButtonColor:'#e67e22'
     }).then((res)=>{
      if(res.isConfirmed){
        axios.post(`${apiUrl}/deleteStation`,{stationId:stationId})
        .then((res)=>{
          if(res.data.message!='Exist'){
            console.log(res.data.message);
            swal.fire({
              icon:'success',
              title:t.admin.stations.success,
              text:`${t.admin.stations.successMsg}`,
              confirmButtonColor:'#e67e22',
              timer:3500,
              showConfirmButton:false,
            })
            setStations(prev => prev.filter(station => station.id !== stationId));
          }
        })
        .catch(error=>{
          console.log(error);
          if(error.code =='ERR_NETWORK'){
            swal.fire('Error',`${t.admin.stations.errorNetwork}`,'error');
          }
     else if(error.code =='ERR_BAD_REQUEST'){
      swal.fire('Error',`${error.response.data.error}`,'error');
     }
           
        })
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
    <div className="stations-management">
      <div className="stations-header">
        <div className="search-box">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder={t.admin.stations.search}
            value={searchQuery}
            onChange={handleSearch}
          />
          
        </div>
        <button className="add-station-btn" onClick={() => setShowModal(true)}>
          <MdAdd /> {t.admin.stations.addStation}
        </button>
      </div>

      <div className="stations-grid">
        {filteredStations.map((station,index) => (
          <div key={index} className="station-card">
            <div className="station-card-header">
              <div className="station-info">
                <div className="station-icon">
                  <MdLocationOn />
                </div>
                <div className="station-details">
                  <h3>{station.name}</h3>
                </div>
              </div>
              <div className="station-actions">
                <button onClick={() => handleEdit(station)} className="edit-btn">
                  <MdEdit />
                </button>
                <button onClick={() => handleDelete(station.id)} className="delete-btn">
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingStation ? t.admin.stations.editStation : t.admin.stations.addStation}</h2>
            <div className="form-group">
              <label>{t.admin.stations.stationName}</label>
              <input
                type="text"
                value={newStation.name}
                onChange={(e) => setNewStation(prev => ({ ...prev, name: e.target.value }))}
                placeholder={t.admin.stations.enter.stationName}
              />
              {errors.stationName && <span style={{color:'red'}}>{errors.stationName}</span>}
            </div>
            <div className="modal-actions">
              <button onClick={() => {
                setShowModal(false);
                setEditingStation(null);
                setNewStation({
                  id:'',
                  name: '',
                });
                setErrors({});
              }} className="cancel-btn">
                {t.admin.forms.cancel}
              </button>
              <button onClick={handleSubmit} className="submit-btn">
                {editingStation ? t.admin.forms.edit : t.admin.forms.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationsManagement;

 */

import React, { useState } from 'react';
import { MdLocationOn, MdAdd, MdEdit, MdDelete, MdSearch } from 'react-icons/md';
import swal from 'sweetalert2';
import { useLanguage } from '../../../../context/LanguageContext';
import { translations } from '../../../../translations/translations';
import LoadingData from '../loadingData/LoadingData.jsx';
import LoadingError from '../loadingError/LoadingError.jsx';
import { useStations } from '../../../../hooks/useStations.js'

const StationsManagement = () => {
  const { stations, loading, error, addStation, updateStation, deleteStation } = useStations();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const [errors, setErrors] = useState({});
  const [newStation, setNewStation] = useState({ id: '', name: ''})
 
  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (station) => {
    setEditingStation(station);
    setNewStation(station);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    const validationErrors = {};
    if (!newStation.name.trim()) {
      validationErrors.stationName = t.admin.validationErrors.stationName;
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (editingStation) {
        swal.fire({
          icon:'warning',
          title:t.admin.stations.confirmation,
          text:`${t.admin.stations.confirmEdit}`,
          showCancelButton:true,
          confirmButtonText:`${t.admin.stations.confirm}`,
          cancelButtonText:`${t.admin.stations.cancel}`,
          confirmButtonColor:'#e67e22'
         })
         .then(async (res)=>{
          if(res.isConfirmed){
            const updateResponse = await updateStation(newStation);
            console.log("updateResponse = "+updateResponse);
         if(updateResponse.status == 200){
          swal.fire({
            icon:'success',
            title:t.admin.stations.success, 
            text:`${t.admin.stations.updateMsg}`, 
            showConfirmButton:false,
            timer:3000,
          });
         }
                                 
         if(updateResponse.code =='ERR_NETWORK'){
          swal.fire('Error',`${t.admin.stations.errorNetwork}`,'error');
        }
   else if(updateResponse.code =='ERR_BAD_REQUEST'){
    swal.fire('Error',`${updateResponse.response.data.error}`,'error');
   }
   setShowModal(false);
   setNewStation({ id: '', name: '' });
   setEditingStation(null);
          }
         })


      } else {

        swal.fire({
          icon:'warning',
          title:t.admin.stations.confirmation,
          text:`${t.admin.stations.confirmAdd}`,
          showCancelButton:true,
          confirmButtonText:`${t.admin.stations.confirm}`,
          cancelButtonText:`${t.admin.stations.cancel}`,
          confirmButtonColor:'#e67e22'
         }).then(async (res)=>{
          if(res.isConfirmed){

            const addResponse =  await addStation(newStation);
            console.log("addResponse = "+addResponse);
            if(addResponse.status == 200){
             swal.fire({
               icon:'success',
               title:t.admin.stations.success, 
               text:`${t.admin.stations.successMsg}`, 
               showConfirmButton:false,
               timer:3000,
             });
            }
                     
            if(addResponse.code =='ERR_NETWORK'){
             swal.fire('Error',`${t.admin.stations.errorNetwork}`,'error');
           }
      else if(addResponse.code =='ERR_BAD_REQUEST'){
       swal.fire('Error',`${addResponse.response.data.error}`,'error');
      }
     
      setShowModal(false);
      setNewStation({ id: '', name: '' });
      setEditingStation(null);

          }
         })

      }
    }
  };
  

  const handleDelete = async (stationId) => {
    
    swal.fire({
      icon:'warning',
      iconColor:'red',
      title:t.admin.stations.confirmation,
      text:`${t.admin.stations.confirmDelete}`,
      showCancelButton:true,
      confirmButtonText:`${t.admin.stations.confirm}`,
      cancelButtonText:`${t.admin.stations.cancel}`,
      confirmButtonColor:'#e67e22'
     }).then(async (res)=>{
      if(res.isConfirmed){
          const deleteResponse = await deleteStation(stationId);
          console.log("deleteResponse = ",deleteResponse);
          
          if(deleteResponse.status == 200){
            swal.fire({
              icon:'success',
              title:t.admin.stations.success,
              text:`${t.admin.stations.successMsg}`,
              confirmButtonColor:'#e67e22',
              timer:3500,
              showConfirmButton:false,
            })

          }           
         
          if(deleteResponse.code =='ERR_NETWORK'){
            swal.fire('Error',`${t.admin.stations.errorNetwork}`,'error');
          }
     else if(deleteResponse.code =='ERR_BAD_REQUEST'){
      swal.fire('Error',`${deleteResponse.response.data.error}`,'error');
     }
           setShowModal(false);
           setEditingStation(null);

}}
)}

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  if (loading) return <LoadingData />;
  if (error) return <LoadingError />;

  return (
    <div className="stations-management">
      <div className="stations-header">
        <div className="search-box">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder={t.admin.stations.search}
            value={searchQuery}
            onChange={(e) => handleSearch}
          />
        </div>
        <button className="add-station-btn" onClick={() => setShowModal(true)}>
          <MdAdd /> {t.admin.stations.addStation}
        </button>
      </div>

      <div className="stations-grid">
        {filteredStations.map((station) => (
          <div key={station.id} className="station-card">
            <div className="station-card-header">
              <div className="station-info">
                <MdLocationOn />
                <h3>{station.name}</h3>
              </div>
              <div className="station-actions">
                <button onClick={() => handleEdit(station)} className="edit-btn"><MdEdit /></button>
                <button onClick={() => handleDelete(station.id)} className="delete-btn"><MdDelete /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingStation ? t.admin.stations.editStation : t.admin.stations.addStation}</h2>
            <div className="form-group">
              <label>{t.admin.stations.stationName}</label>
              <input
                type="text"
                value={newStation.name}
                onChange={(e) => setNewStation(prev => ({ ...prev, name: e.target.value }))}
                placeholder={t.admin.stations.enter.stationName}
              />
              {errors.stationName && <span style={{color:'red'}}>{errors.stationName}</span>}
            </div>
            <div className="modal-actions">
              <button onClick={() => {
                setShowModal(false);
                setEditingStation(null);
                setNewStation({
                  id:'',
                  name: '',
                });
                setErrors({});
              }} className="cancel-btn">
                {t.admin.forms.cancel}
              </button>
              <button onClick={handleSubmit} className="submit-btn">
                {editingStation ? t.admin.forms.edit : t.admin.forms.save}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );

}


export default StationsManagement;
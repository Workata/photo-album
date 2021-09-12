import {Link} from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from './../contexts/AppContext';
import "../css/ChooseYearLocation.css";
import "../css/General.css";
import { useParams } from "react-router-dom";

export default function ChooseLocation() {

    const {year} = useParams();
    const [availableLocations, setAvailableLocations] = useState([]);
    const {setBackNavPage} = useContext(AppContext);
    

    const fetchLocations = async () => {
        try {
          const response = await fetch(
            `/api/locations/${year}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          const dataLocations = await response.json();
          setAvailableLocations(dataLocations);
          console.log(dataLocations);
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      useEffect(() => {
        setBackNavPage('/years');
        fetchLocations();   //
      }, []);


    return (
      <div id="yearsLocationsContainer" className="center">
        {availableLocations.map((location) => {
            return <Link to={`/${year}/${location}`} className=""> <div className="year-location-box" key={location}>{location}</div> </Link>
        })
        
        }
        <div style={{clear: "both"}}></div>
      </div>
    );
  }
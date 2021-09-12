import {Link} from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from './../contexts/AppContext';
import "../css/ChooseYearLocation.css";
import "../css/General.css";

export default function ChooseYear() {

    const [availableYears, setAvailableYears] = useState([]);
    const {setBackNavPage} = useContext(AppContext);

    const fetchYears = async () => {
        try {
          const response = await fetch(
            `/api/locations/years`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          const dataYears = await response.json();
          setAvailableYears(dataYears)
          console.log(dataYears);
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      useEffect(() => {
        setBackNavPage('/');
        fetchYears();   //
      }, []);


    return (
      <div id="yearsLocationsContainer" className="center">
        {availableYears.map((year) => {
            return <Link to={`/${year}`} className=""> <div className="year-location-box" key={year}>{year}</div> </Link>
        })
        
        }
        <div style={{clear: "both"}}></div>
      </div>
    );
  }
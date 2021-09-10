import {Link} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "../css/ChooseYear.css";
import "../css/General.css";

export default function ChooseYear() {

    const [availableYears, setAvailableYears] = useState([]);

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
        fetchYears();   //
      }, []);


    return (
      <div id="yearsContainer" className="center">
        {availableYears.map((year) => {
            return <Link to={`/years/${year}`} className=""> <div className="year-box" key={year}>{year}</div> </Link>
        })
        
        }
        <div style={{clear: "both"}}></div>
      </div>
    );
  }
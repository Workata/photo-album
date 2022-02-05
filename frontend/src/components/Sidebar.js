import "../css/Sidebar.css";
import {Link} from 'react-router-dom';
import Image from 'material-ui-image'
import React, { useEffect, useState} from "react";

export default function Sidebar(props) {

  const [thumbnails, setThumbnails] = useState([]);
  const [canInsert, setCanInsert] = useState(false);
  let thumbs = []
  
  const fetchThumbnail = async (imgIdToGet) => {
    try {

    const response = await fetch(
      `/api/images/thumbnail/${props.year}/${props.location}/${imgIdToGet}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      const imgData = await response.blob();
      const thumbUrl = URL.createObjectURL(imgData);
      thumbs[imgIdToGet-1] = thumbUrl

    }
    catch (error) {
      console.error('Error: ', error);
    };
};

  const fetchThumbnailsOneByOne = async () => {
    for(var i=1; i <= props.numberOfImages; i++) await fetchThumbnail(i);
    setThumbnails(thumbs);
  };

  useEffect(() => {
    fetchThumbnailsOneByOne();
    if(props.numberOfImages !== 0) setCanInsert(true);
  }, [props.numberOfImages]);

    return (
        <>
            <div id="sidebar">
                {props.year} {">>"} {props.location}

                <div id="thumbnailsContainer"> 
                {
                    canInsert ? ( 
                    thumbnails.map((thumbnail, i) => {
                    return (
                    <Link to={`/${props.year}/${props.location}/${i+1}`} key={`/${props.year}/${props.location}/${i+1}`}> 
                      <div className="thumbnail"> 
                        <Image src={thumbnail} key={i} aspectRatio={4/3} alt="xd"/> 
                      </div> 
                    </Link>
                    )})   
                    ) : (console.log("Not loaded"))  
                }
                </div>
            </div>
        </>
    );
  }
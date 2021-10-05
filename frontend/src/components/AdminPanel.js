import "../css/General.css";
import "../css/AdminPanel.css";
import React, { useEffect, useState} from "react";
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AdminPanel(props) {

    const [landscapeChecked, setLandscapeChecked] = useState(false);            // state used for updating category
    const [carsChecked, setCarsChecked] = useState(false);
    const [floraChecked, setFloraChecked] = useState(false);
    const [birdsChecked, setBirdsChecked] = useState(false);
    const [wildlifeChecked, setWildlifeChecked] = useState(false);
    const [currentImgCategories, setCurrentImgCategories] = useState({'landscape': false, 'cars': false, 'flora': false, 'birds': false, 'wildlife': false})


    const fetchImgCategories = async () => {

        try {
          const response = await fetch(
            `/api/categories/get/${props.year}/${props.location}/${props.imagesNames[props.currentImgId - 1]}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${props.tokenValue}`,
              },
            }
          )
          const res = await response.json();
          console.log(res);
          setCurrentImgCategories(res);
          
    
        } catch (error) {
          console.error("Error: ", error);
        }
      };

    const addToCategory = async (category, image_name) => {
        if (!image_name)
        {
            console.log("Image is undefined");
            return;
        }

        try {
          const response = await fetch(
            `/api/categories/add/${category}/${props.year}/${props.location}/${image_name}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${props.tokenValue}`,
              },
            }
          )
          const res = await response.json();
          console.log("Res: ", res)
          fetchImgCategories();
    
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      const deleteFromCategory = async (category, image_name) => {
        if (!image_name)
        {
            console.log("Image is undefined");
            return;
        }

        try {
          const response = await fetch(
            `/api/categories/delete/${category}/${props.year}/${props.location}/${image_name}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${props.tokenValue}`,
              },
            }
          )
          const res = await response.json();
          console.log("Res: ", res)
          fetchImgCategories();
    
        } catch (error) {
          console.error("Error: ", error);
        }
      };
    
    const updateCategory = (categoryValueBefore, categoryValueAfter, categoryName, imgName) => { 
        if(categoryValueBefore === categoryValueAfter) return;
        if (categoryValueAfter) addToCategory(categoryName, imgName);
        else deleteFromCategory(categoryName, imgName);
    };

    const saveCategories = () => {
        var imgName = props.imagesNames[props.currentImgId - 1]
        updateCategory(currentImgCategories.landscape, landscapeChecked, 'landscape', imgName);
        updateCategory(currentImgCategories.cars, carsChecked, 'cars', imgName);
        updateCategory(currentImgCategories.flora, floraChecked, 'flora', imgName);
        updateCategory(currentImgCategories.birds, birdsChecked, 'birds', imgName);
        updateCategory(currentImgCategories.wildlife, wildlifeChecked, 'wildlife', imgName);
    }

    useEffect(() => {
        if (props.currentImgId) fetchImgCategories();
      }, [props.currentImgId])

      useEffect(() => {
        setLandscapeChecked(currentImgCategories.landscape);
        setCarsChecked(currentImgCategories.cars);
        setFloraChecked(currentImgCategories.flora);
        setBirdsChecked(currentImgCategories.birds);
        setWildlifeChecked(currentImgCategories.wildlife);
      }, [currentImgCategories])

    return (
        <>
            <div id="adminPanelContainer">
                <FormGroup>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                onChange={(event) => { setLandscapeChecked(event.target.checked);}}
                                checked={landscapeChecked}
                            />
                        } 
                        label="Landscape" 
                     />
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                onChange={(event) => {setCarsChecked(event.target.checked)}} 
                                checked={carsChecked}
                            />
                        } 
                        label="Cars" 
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                onChange={(event) => {setFloraChecked(event.target.checked)}}
                                checked={floraChecked}
                            />
                        } 
                        label="Flora" 
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                onChange={(event) => {setBirdsChecked(event.target.checked)}}
                                checked={birdsChecked}
                            />
                        } 
                        label="Birds" 
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                onChange={(event) => {setWildlifeChecked(event.target.checked)}}
                                checked={wildlifeChecked}
                            />
                        } 
                        label="Wildlife" 
                    />
                </FormGroup>

                <Button 
                    variant="contained"
                    size="medium"
                    onClick={saveCategories}
                >
                    Save
                </Button>

            </div>
        </>
    );
  }
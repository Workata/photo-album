import "../css/General.css";
import "../css/AdminPanel.css";
import React, { useEffect, useState} from "react";
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AdminPanel(props) {

    const [landscapeChecked, setLandscapeChecked] = useState(true);
    const [carsChecked, setCarsChecked] = useState(true);
    const [floraChecked, setFloraChecked] = useState(true);
    const [birdsChecked, setBirdsChecked] = useState(true);
    const [wildlifeChecked, setWildlifeChecked] = useState(true);
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
    
        } catch (error) {
          console.error("Error: ", error);
        }
      };
    
    const saveCategories = () => {
        console.log(`save categories: ${props.year} ${props.location} ${props.imagesNames[props.currentImgId - 1]}`);
        console.log(`Landscape: ${landscapeChecked}`);
        console.log(`Cars: ${carsChecked}`);
        console.log(`Flora: ${floraChecked}`);
        console.log(`Birds: ${birdsChecked}`);
        console.log(`Wildlife: ${wildlifeChecked}`);
        addToCategory('landscape', props.imagesNames[props.currentImgId - 1]);
    }

    useEffect(() => {
        if (props.currentImgId) fetchImgCategories();
      }, [props.currentImgId])

    return (
        // Landscape, Cars, Flora, Birds, Wildlife 
        <>
            <div id="adminPanelContainer">
                <FormGroup>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                onChange={(event) => {setLandscapeChecked(event.target.checked)}}
                                checked={currentImgCategories.landscape}
                            />
                        } 
                        label="Landscape" 
                     />
                    <FormControlLabel control={<Checkbox onChange={(event) => {setCarsChecked(event.target.checked)}} defaultChecked />} label="Cars" />
                    <FormControlLabel control={<Checkbox onChange={(event) => {setFloraChecked(event.target.checked)}} defaultChecked />} label="Flora" />
                    <FormControlLabel control={<Checkbox onChange={(event) => {setBirdsChecked(event.target.checked)}} defaultChecked />} label="Birds" />
                    <FormControlLabel control={<Checkbox onChange={(event) => {setWildlifeChecked(event.target.checked)}} defaultChecked />} label="Wildlife" />
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
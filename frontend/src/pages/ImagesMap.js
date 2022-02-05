// react
import React, { useEffect, useState, useContext} from "react";
import { AppContext } from '../contexts/AppContext';

// material ui
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';

// styles
import "../css/General.css";
import "../css/ImagesMap.css";
import formThemeV2 from "../themes/formThemeV2";
import { ThemeProvider } from '@mui/material/styles';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/geom/Circle';

export default function ImagesMap() {
    const {setBackNavPage, tokenValue} = useContext(AppContext);
    const [isAddMarkerDialogOpen, setIsAddMarkerDialogOpen] = useState(false);
    const [isDeleteMarkerDialogOpen, setIsDeleteMarkerDialogOpen] = useState(false);
    const [newUrl, setNewUrl] = useState();
    const [newLatitude, setNewLatitude] = useState();
    const [newLongitude, setNewLongitude] = useState();
    const [availableMarkers, setAvailableMarkers] = useState([]);
    const [dataGridMarkers, setDataGridMarkers] = useState([]);


    // TODO style marker (red pin)(feature.setStyle() ???)
    // var markerStyle = new Style({
    //   image: new Circle({
    //     radius: 7,
    //     fill: new Fill({color: 'black'}),
    //     stroke: new Stroke({
    //       color: [255,0,0], width: 2
    //     })
    //   })
      
    // })

    const markersColumns = [
      {
        field: 'urlField',
        headerName: 'Url',
        width: 280,
        disableClickEventBubbling: true,
      },
      {
        field: 'latitudeField',
        headerName: 'Latitude',
        width: 100,
        disableClickEventBubbling: true,
      },
      {
        field: 'longitudeField',
        headerName: 'Longitude',
        width: 100,
        disableClickEventBubbling: true,
      },
      {
        field: 'deleteField',
        headerName: 'Delete',
        sortable: false,
        width: 70,
        disableClickEventBubbling: true,
        renderCell: (params) => (
          <IconButton>
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];

    const fetchMarkers = async () => {
      try {
        const response = await fetch(
          `/api/map/markers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const dataMarkers = await response.json();
        setAvailableMarkers(dataMarkers);
        console.log(dataMarkers);

        // available markers collection with id for data grid
        const dataMarkersWithId = dataMarkers.map(
          (marker) => ({
            id: JSON.stringify({'latitude': marker.latitude, 'longitude': marker.longitude}),
            urlField: marker.url,
            latitudeField: marker.latitude,
            longitudeField: marker.longitude,
          })
        );
        console.log("Data markers with id: ")
        console.log(dataMarkersWithId);
        setDataGridMarkers(dataMarkersWithId);

      } catch (error) {
        console.error("Error: ", error);
      }
    };

    const addMarker = async () => {
      try {
        // Build formData object.
        let formData = new FormData();
        formData.append('url', newUrl);
        formData.append('latitude', newLatitude);
        formData.append('longitude', newLongitude);

        const response = await fetch(
          `/api/map/create/marker`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
            body: formData
          }
        )
        const res = await response.json();
        console.log(res);
        fetchMarkers();
        handleAddMarkerDialogExit();
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    const deleteMarker = async (coords) => {
      // console.log(`lat: ${coords.latitude}`);
      // console.log(`lon: ${coords.longitude}`);
      try {
        // Build formData object.
        let formData = new FormData();
        formData.append('latitude', coords.latitude);
        formData.append('longitude', coords.longitude);

        const response = await fetch(
          `/api/map/delete/marker`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
            body: formData
          }
        )
        const res = await response.json();
        console.log(res);
        fetchMarkers();
        handleAddMarkerDialogExit();
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    const addMarkersOnMap = (mainMap) => {

      var featuresToAdd = [];

      console.log("Add markers on map:");
      console.log(availableMarkers);

      for(var i=0; i<availableMarkers.length; i++)
      {
        featuresToAdd.push(new Feature({
          name: availableMarkers[i].url,
          geometry: new Point(fromLonLat([availableMarkers[i].longitude, availableMarkers[i].latitude]))
        }))
      }

      // TODO style markers
      //marker1.setStyle(markerStyle);

      // * create layer with features (markers)
      const layer = new VectorLayer({
        source: new VectorSource({
            features: featuresToAdd
        })
    });

      // * add layer with markers and check onClick events
      mainMap.addLayer(layer);
      mainMap.on('click', function(event) {
      mainMap.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
            // TODO maybe replace with react router (and relative links?)
            window.location.replace(feature.getProperties().name); 
        });
    });
    };

    const setupMap = () => {
      const mainMap = new Map({
        target: 'mapContent',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 1
        })
      });

      addMarkersOnMap(mainMap);

    };

    const handleAddMarkerDialogExit = () => {
      setIsAddMarkerDialogOpen(false);
      // TODO handle errors and text fields
    };

    const handleDeleteMarkerDialogExit = () => {
      setIsDeleteMarkerDialogOpen(false);
      // TODO handle errors and text fields
    };

    useEffect(() => {
        setBackNavPage('/');
        fetchMarkers();
      }, []);

      useEffect(() => {
        if(availableMarkers.length !== 0) setupMap();  
      }, [availableMarkers]);

    return (
        <>
          <div id="mapContainer" className="center">
            <div id="mapContent"></div>
          </div>

          { tokenValue &&
            <ThemeProvider theme={formThemeV2}>
              <div id="markerMenu" className="center-vertically">
                <Button 
                  //className={classes.markerButton}
                  variant="contained"
                  size="medium"
                  onClick={() => {setIsAddMarkerDialogOpen(true)}}
                  sx = {{
                    marginTop: 1,
                    marginBottom: 2,
                  }}
                >
                  Add marker
                </Button>

                <Button 
                  //className={classes.markerButton}
                  variant="contained"
                  size="medium"
                  onClick={() => {setIsDeleteMarkerDialogOpen(true)}}
                  sx = {{
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                >
                  Delete marker
                </Button>
              </div>
            </ThemeProvider>
          }

        {/* Add marker */}
        <Dialog
          open={isAddMarkerDialogOpen}
          onClose={handleAddMarkerDialogExit}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <div>
              <div>
                <Typography variant="h6">
                  Add new marker
                </Typography>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="URL"
              type="text"
              fullWidth
              onChange={(event) => {
                setNewUrl(event.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Latitude"
              type="text"
              fullWidth
              onChange={(event) => {
                setNewLatitude(event.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Longitude"
              type="text"
              fullWidth
              onChange={(event) => {
                setNewLongitude(event.target.value);
              }}
            />
            <div>
              <Button
                color="primary"
                variant="contained"
                onClick={addMarker}
              >
                Add marker
              </Button>
            </div>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddMarkerDialogExit} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

        {/* Delete marker */}
        <Dialog
          open={isDeleteMarkerDialogOpen}
          onClose={handleDeleteMarkerDialogExit}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">
            <div>
              <div>
                <Typography variant="h6">
                  Choose marker to delete
                </Typography>
              </div>
            </div>
          </DialogTitle>
          <DialogContent
            // sx = {{
            //   minHeight: 450,
            //   width: 600
            // }}
          >
            <div>
              <DataGrid
                rows={dataGridMarkers}
                columns={markersColumns}
                pageSize={10}
                autoHeight={true}
                disableSelectionOnClick={true}
                onCellClick={(params, event) => {
                  if (params.field === '__check__') return;
                  if (params.field === 'deleteField') {
                    // setCurrentSelectedRow(params.row.id);
                    // TODO dialog window with confirmation
                    const coords = JSON.parse(params.row.id);
                    deleteMarker(coords)
                    // console.log(params.row.id);
                    // setOpenDeleteOwnerConfirmation(true);
                  }
                }}
              />
            </div>

          </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteMarkerDialogExit} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

        </>
    );
  }
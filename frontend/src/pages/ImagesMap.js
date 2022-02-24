// * react
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '../contexts/AppContext';

// * material ui
import {
  TextField,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';

// * images
import backgroundImage from '../images/footer_lodyas.png';

// * openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';

// * openlayers styles
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import RegularShape from 'ol/style/RegularShape';

export default function ImagesMap() {
  const { tokenValue } = useContext(AppContext);
  const [isAddMarkerDialogOpen, setIsAddMarkerDialogOpen] = useState(false);
  const [isDeleteMarkerDialogOpen, setIsDeleteMarkerDialogOpen] = useState(false);
  const [newUrl, setNewUrl] = useState();
  const [newLatitude, setNewLatitude] = useState();
  const [newLongitude, setNewLongitude] = useState();
  const [availableMarkers, setAvailableMarkers] = useState([]); //
  const [dataGridMarkers, setDataGridMarkers] = useState([]);

  // ! workaround for displaying map (w/wo markers)
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapContainsMarkers, setMapContainsMarkers] = useState(null);

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

      if (dataMarkers.length === 0) setMapContainsMarkers(false);
      else setMapContainsMarkers(true)

      setAvailableMarkers(dataMarkers);

      // available markers collection with id for data grid
      const dataMarkersWithId = dataMarkers.map(
        (marker) => ({
          id: JSON.stringify({ 'latitude': marker.latitude, 'longitude': marker.longitude }),
          urlField: marker.url,
          latitudeField: marker.latitude,
          longitudeField: marker.longitude,
        })
      );
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

      handleAddMarkerDialogExit();
      // TODO get rid of this workaround
      // ! force refresh to reload map
      window.location.reload();
      // fetchMarkers();
      

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

      
      handleAddMarkerDialogExit();
      // TODO get rid of this workaround
      // ! force refresh to reload map
      window.location.reload();
      // fetchMarkers();
      
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const addMarkersOnMap = (mainMap) => {
    var featuresToAdd = [];
    // console.log(`Placing markers on map... ${availableMarkers}`);

    for (var i = 0; i < availableMarkers.length; i++) {
      featuresToAdd.push(
        new Feature({
          name: availableMarkers[i].url,
          geometry: new Point(
            fromLonLat([availableMarkers[i].longitude, availableMarkers[i].latitude])
          ),
        })
      )
    }

    // * create marker style
    let markerStyle = new Style({
      image: new RegularShape({
        fill: new Fill({
          color: 'red' // general color
        }),
        // * border
        stroke: new Stroke({
          color: 'black',
          width: 1
        }),
        // * shape
        points: 3,  // 3 - triangle, 4 - rectangle
        //  * size
        radius: 6,
        // * rotation
        // angle: Math.PI / 4 
      }),
    });

    // * add marker style for each marker
    featuresToAdd.forEach((marker) => {marker.setStyle(markerStyle);});

    // * create layer with features (markers)
    const layer = new VectorLayer({
      source: new VectorSource({
        features: featuresToAdd
      })
    });

    // * add layer with markers and check onClick events
    mainMap.addLayer(layer);
    mainMap.on('click', function (event) {
      mainMap.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
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

    setMapLoaded(true);
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
    fetchMarkers();
  }, []);

  useEffect(() => {
    if (mapContainsMarkers === false && mapLoaded !== true) setupMap();
    if (mapContainsMarkers === true &&
      availableMarkers.length !== 0 && mapLoaded !== true) setupMap();
  }, [mapContainsMarkers, availableMarkers]);   // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "1200px",
            height: "800px",
            border: "solid",
            borderRadius: "5px",
          }}
        >
          {/* map content (div id) is a target for setupMap() */}
          <Box
            sx={{
              width: "1200px",
              height: "800px",
              borderRadius: "5%",
            }}
            id="mapContent"
          />
        </Box>

        {tokenValue &&
          <Box
            sx={{
              width: "180px",
              height: "170px",
              borderStyle: "solid",
              borderColor: "white",
              borderRadius: "5%",
              backgroundImage: `url(${backgroundImage})`,
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "50px",
            }}
          >
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => { setIsAddMarkerDialogOpen(true) }}
              sx={{
                marginTop: "30px",
              }}
            >
              Add marker
            </Button>

            <Button
              // color="primary.main"
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => { setIsDeleteMarkerDialogOpen(true) }}
              sx={{
                marginTop: "30px",
              }}
            >
              Delete marker
            </Button>
          </Box>
        }
      </Box>

      {/* Add marker dialog window */}
      <Dialog
        open={isAddMarkerDialogOpen}
        onClose={handleAddMarkerDialogExit}
      >
        <DialogTitle>
          Add new marker
        </DialogTitle>

        <DialogContent>

          <TextField
            margin="dense"
            label="URL"
            type="text"
            fullWidth
            onChange={(event) => {
              setNewUrl(event.target.value);
            }}
          />

          <TextField
            margin="dense"
            label="Latitude"
            type="text"
            fullWidth
            onChange={(event) => {
              setNewLatitude(event.target.value);
            }}
          />

          <TextField
            margin="dense"
            label="Longitude"
            type="text"
            fullWidth
            onChange={(event) => {
              setNewLongitude(event.target.value);
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            onClick={addMarker}
          >
            Add marker
          </Button>

          <Button onClick={handleAddMarkerDialogExit} color="primary">
            Close
          </Button>
        </DialogActions>

      </Dialog>

      {/* Delete marker */}
      <Dialog
        open={isDeleteMarkerDialogOpen}
        onClose={handleDeleteMarkerDialogExit}
        fullWidth
      >
        <DialogTitle>
          Choose marker to delete
        </DialogTitle>

        <DialogContent>
          <Box>
            <DataGrid
              rows={dataGridMarkers}
              columns={markersColumns}
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
          </Box>
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
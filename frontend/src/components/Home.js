import {Link} from 'react-router-dom';
import "../css/General.css";

export default function Home() {

    return (
      <div>
        <Link to="/chooseYear" className="temp">All photos</Link> <br></br>
        <Link to="/chooseCategory" className="temp">Categories</Link> <br></br>
        <Link to="/map" className="temp">Map</Link> <br></br>
        <Link to="/info" className="temp">Info</Link> <br></br>
      </div>
    );
  }
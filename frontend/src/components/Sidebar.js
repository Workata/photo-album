import useStyles from '../styles/SidebarStyles';
import "../css/Sidebar.css";
import {Link} from 'react-router-dom';
import Image from 'material-ui-image'

export default function Sidebar(props) {

    const classes = useStyles();

    const getThumbnails = () => {
        let content = [];
        for (let i = 0; i < props.numberOfImages; i++) {
          content.push(
          <Link to={`/${props.year}/${props.location}/${i+1}`} key={`/${props.year}/${props.location}/${i+1}`}> 
            <div className="thumbnail"> 
              <Image src={props.thumbnails[i]} key={i} aspectRatio={4/3} alt="xd"/> 
            </div> 
          </Link>
          );
        }
        return content;
      };

      const getThumbnails2 = () => {
        let content = [];
        for (let i = 0; i < props.numberOfImages; i++) {
          let thumbUrl = props.fetchThumbnail(i);
          content.push(
          <Link to={`/${props.year}/${props.location}/${i+1}`} key={`/${props.year}/${props.location}/${i+1}`}> 
            <div className="thumbnail"> 
              <Image src={thumbUrl} key={i} aspectRatio={4/3} alt="xd"/> 
            </div> 
          </Link>
          );
        }
        return content;
      };

    return (
        <>
            <div id="sidebar">
                {props.year} {">>"} {props.location}

                <div id="thumbnailsContainer"> 
                {props.canInsertThumbnails ? (
                    //getThumbnails()
                     props.thumbnails.map((thumbnail, i) => {
                    return (
                    <Link to={`/${props.year}/${props.location}/${i+1}`} key={`/${props.year}/${props.location}/${i+1}`}> 
                      <div className="thumbnail"> 
                        <Image src={thumbnail} key={i} aspectRatio={4/3} alt="xd"/> 
                      </div> 
                    </Link>
                    )}) 
                    ) : (console.log("Not loaded")) 
                }
                {/* {
                   props.thumbnails.map((thumbnail, i) => {
                    return (   
                    <Link to={`/${props.year}/${props.location}/${i+1}`} key={`/${props.year}/${props.location}/${i+1}`}> 
                      <div className="thumbnail"> 
                        <Image src={thumbnail} key={i} aspectRatio={4/3} alt="xd"/> 
                      </div> 
                    </Link>
                    )
                  })
                
                } */}
                {/* {
                  getThumbnails2()
                } */}
                </div>
            </div>
        </>
    );
  }
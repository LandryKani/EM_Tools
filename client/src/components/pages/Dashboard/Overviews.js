// import Button from '../../buttons/Button.styled'
import '../../../assets/css/register.css';
import phone3 from '../../../assets/img/phone3.png';
import App_Store_Badge from "../../../assets/img/App Store Badge.png";
import Google_Play_Badge from "../../../assets/img/Google Play Badge.png";
import '../../../assets/css/Admin/dashboard.css'
import BlocData from './BlocData'
import BlocDataActivation from './BlocDataActivation';
import GraphicBarre from './GraphicBarre';
import { Link } from 'react-router-dom';
function Overviews() {
    var valeur1 = 74;
    var valeur2 = 50;
    var Green = "green";
    var Purple = "purple";

    return (
        <div className='container_dashboard containerAdmin'>
            <div className='head_dashoard'>
                {/* <Button
                    title="Upgrade now"
                    variant="link"
                    borderRadius="5px"
                    maxWidth="max-content"
                    height="40px"
                /> */}
            </div>
            <div className='block_info_data display-flex'>
                <BlocData
                    color={Purple}
                    val={valeur1} />
                <BlocData
                    color={Green}
                    val={valeur2} />
                <BlocDataActivation />
            </div>
            <div className='bloc_diagramme_phone display-flex-align-center'>
                <GraphicBarre />
                <div className='bloc_phone'>
                    {/* <div className="image-title display-flex-align-center">
                        <h1>You can also download app for more experience</h1>
                    </div> */}
                    <div className="circle-phone">
                        <div className="phone2 display-flex-center"><img src={phone3} alt="image2" /></div>
                    </div>
                    <div className="reg-share">
                        <div className="get-in-play-store">
                            <Link to="">
                                <img src={App_Store_Badge} alt="img" />
                            </Link>
                        </div>
                        <div className="get-in-appple">
                            <Link to="">
                                <img src={Google_Play_Badge} alt="img" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overviews
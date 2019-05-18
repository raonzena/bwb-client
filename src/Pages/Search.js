import React, {Component} from 'react';
import MapContainer from './MapContainer'
import Geocode from 'react-geocode';

Geocode.setApiKey("AIzaSyDXQtk-kNAiN0LotPao1ZVKxg4D1--hm-8")
Geocode.enableDebug();

class Nav extends Component {
  
  //loadSite함수안에서 쓰일 변수들
  lat=null
  lng=null
  wholeSiteData = null

  constructor(props) {
    super(props);
    this.state = ({
      siteNameForSearch:'',
      lat: null,
      lng: null,
      wholeSiteData: null,
      beforeSite: null,
    })
  }
  
  loadSite = () =>{
    this.setState({
      siteNameForSearch: this.props.searchValue
    })
    //   //장소명을 통해 검색
      Geocode.fromAddress(this.props.searchValue).then(
        response => {
          //아래 response.results[0]가 위치에 대한 모든 정보를 담고 있다.
          
          // console.log(response.results[0], 'Geocode')
          this.wholeSiteData = response.results[0];
          this.lat = response.results[0].geometry.location.lat;
          this.lng = response.results[0].geometry.location.lng;
          this.setState({
            siteNameForSearch: this.props.searchValue,
            lat: this.lat,
            lng: this.lng,
            wholeSiteData: this.wholeSiteData,
            beforeSite: this.props.searchValue,
          })
          
        },
        error => {
          console.error(error);
        }
      );
  }
ㅋ
  //props가 변할 때,
  componentWillMount = () => {
  }
  //제일 처음 한번만 렌더됨.
  componentDidMount = () =>{
    this.loadSite();
  }

  //props가 변할 때,
  componentWillReceiveProps = () =>{
    this.loadSite();
  }
  shouldComponentUpdate = () => {
   return true
  }
  componentWillUpdate = () =>{

  }
  componentDidUpdate = () => {
  }
  
  
  render(){
          //여기서 받는 searchValue가 직접적으로 구글Api로 들어감    
    const {onKeyDown, onChange} = this.props
    return (
    
        <div >
          <div>
            <input type = 'text' placeholder = '본문 - search site2' onKeyDown = {onKeyDown} onChange={onChange}/>
            <button> login </button>
          </div>
          <div className="js-MapContainer MapContaniner">
          {/* 지금여기가 문제가 있어서 다음페이지로 안가는 중 ㅜㅜ */}
            {this.state.lat === this.state.beforeSite ? 
                      <div>loading...</div>      
                      : 
                      <MapContainer siteNameForSearch = {this.state.siteNameForSearch}
                      lat ={this.state.lat} lng={this.state.lng} wholeSiteData={this.state.wholeSiteData}/>}
          </div>
        </div>
    )
  }
}


export default Nav;

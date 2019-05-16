import React, {Component} from 'react';
import FirstPage from './Pages/FirstPage';
import Nav from './Pages/Search';
import HomeButton from './Pages/HomeButton';
import './App.css';

class App extends Component {
  state = ({
    //실제 지도 검색 키워드//
    searchValue: '',
    searchPage: 1,
    isLogin: false,
    user: {id:'', pw:'', nick_name:'', gender:''},
    site_event:false
  })

  //첫 대문에서 키워드 검색시 2번째 페이지로 넘어가기 위한 함수, 이때 작성하였던 키워드는 searchValue에 저장된다.
  handleSearch = (e) => {
    if(e.key === 'Enter'){
      if(this.state.searchPage === 1){
        this.setState({
          searchValue: e.target.value,
          searchPage: 2,
        })
      }else if(this.state.searchPage === 2){        
    //여기에 본문페이지에 검색할 시 여기 함수가 적용됨.
      this.setState({
        searchValue: e.target.value,
      })
      
      }
    }
  }

  //홈버튼 누르면 메인화면으로
  clickHomeButton = (e) => {
    this.setState({
      searchPage: 1,
    })
  } 

  render(){
    
    const { searchPage, searchValue } = this.state;
    return (
      <div className="App">
      <div className="homeButton">
          <HomeButton onClick = {this.clickHomeButton}/>
        </div>
        <div className="square">
          { searchPage === 1 ? <FirstPage onKeyDown = {this.handleSearch} onChange = {this.handleSearch}/> 
                            : <Nav onKeyDown = {this.handleSearch} onChange = {this.handleSearch}
                                      searchValue = {searchValue}/>}
         
        </div>
      </div>
    )
  }
}

export default App;

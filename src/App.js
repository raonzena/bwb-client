import React, {Component} from 'react';
import Search from './Components/Search';
import './App.css';

class App extends Component {
  state = ({
    isLogin: false,
    user: {id:'', pw:'', nick_name:'', gender:''},
  })

  render(){
    return (
      <div className="App">
        <Search />  
      </div>
    )
  }
}

export default App;

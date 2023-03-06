import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyLogo from './components/MyLogo';
import SelectLanguage from './components/SelectLanguage';
import Login from './components/Login';


function App() {
  return (
    <div className='container'>
      <div className='row'><MyLogo /></div>
      <div className='row'><Login /></div>
      <div className='row'><SelectLanguage /></div>
    </div>
  )
}

export default App;

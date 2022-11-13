import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Header } from './components/headers/Header';
function App() {
  return (
    <Router>
      <Header/>
         <Routes>
          <Route exact path="/" component={Home}>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import { FiHome } from 'react-icons/fi';
import '../src/styles/App.css'

function scrollFunction() {
  document.getElementById('content').scrollIntoView({ behavior: "smooth" });
}

function scrollDown() {
  document.getElementById('content').scrollIntoView({ behavior: "smooth" });
}

function App() {
  return (
    <div className='app-main'>
      <Router>
        <div className='header-mainpage'>
          <nav>
            <div className='nav-links'>
              <div className='home-icon'>
                <Link to="/" > <FiHome className='homeicon' /> </Link>
              </div>
              <h1>Creatorverse</h1>
              <div className='spacer'></div>
            </div>
          </nav>
        </div>


        <div className='header-content'>
          <div className='header-left'>
            <div className='add_buttons'>
              <Link to="/" onClick={scrollFunction}>Show Creators</Link>
            </div>
          </div>
          <div className='header-middle'>
            <h3>Share, explore, and connect</h3>
            <p>A platform dedicated to highlighting top content creators, where users can explore and connect with mesmerizing creations effortlessly</p>
          </div>
          <div className='header-right'>
            <div className='add_buttons'>
              <Link to="/add" onClick={scrollDown}>Add Creator</Link>
            </div>
          </div>
        </div>

        <div className="content" id='content'>
          <Routes>
            <Route path="/" element={<ShowCreators />} />
            <Route path="/add" element={<AddCreator />} />
            <Route path="/edit/:id" element={<EditCreator />} />
            <Route path="/:id" element={<ViewCreator />} />
            <Route path="/creators" element={<ShowCreators />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}


export default App;
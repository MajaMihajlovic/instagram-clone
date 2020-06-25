import React, {useEffect, createContext} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import Profile from './routes/Profile';
import SignUp from './routes/SignUp';
import CreatePost from './routes/CreatePost';

const UserContext = createContext();

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
    </BrowserRouter>
  );
}

export default App;

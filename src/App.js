import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.js";
import ExercisesList from "./components/exercises-list.js";
import EditExercise from "./components/edit-exercise.js";
import CreateExercise from "./components/create-exercise.js";
import CreateUser from "./components/create-user.js";
function App() {
  return (
    <Router>
      <div  className="container">
      <Navbar />

      <Routes>
      <Route path="/" exact element={<ExercisesList/>} />
      <Route path="/edit/:id"  element={<EditExercise/>} />
      <Route path="/create"  element={<CreateExercise/>} />
      <Route path="/user"  element={<CreateUser/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;

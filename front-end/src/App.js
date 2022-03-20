import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<h1>Product List</h1>} />
          <Route path='/add' element={<h1>Add Product List</h1>} />
          <Route path='/update' element={<h1>Update Product List</h1>} />
          <Route path='/logout' element={<h1>Logout Product List</h1>} />
          <Route path='/profile' element={<h1>Profile Product List</h1>} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

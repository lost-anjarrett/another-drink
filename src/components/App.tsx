import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddDrinkForm from './AddDrinkForm';
import DrinksList from './DrinksList';
import Dashboard from './Dashboard';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Add a Drink</Link>
                        </li>
                        <li>
                            <Link to="/drinks">Drinks List</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<AddDrinkForm />} />
                    <Route path="/drinks" element={<DrinksList />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

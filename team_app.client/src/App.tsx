import { useEffect } from 'react';
import './App.css';

import Header from './components/Header.tsx';
import Home from './components/Home.tsx';
import Profiles from './components/Profiles.tsx';
import TaskBoard from './components/TaskBoard.tsx';
import Footer from './components/Footer.tsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import allReducers from './reducers/index.tsx';
import { configureStore } from '@reduxjs/toolkit';


/*
interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
*/

function App() {
    //const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        //populateWeatherData();
    }, []);

    /*
    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;
     */

    /*
    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        //setForecasts(data);
        console.log(data);
    }

    populateWeatherData();
    */

    const store = configureStore({ reducer: allReducers });

    return (
        <main className="app">

            <Router>
                <Header />
                <Provider store={store}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Team_Profiles" element={<Profiles />} />
                        <Route path="/Task_Board" element={<TaskBoard />} />
                    </Routes>
                </Provider>
                <Footer />
            </Router>
        </main>
    );

    /*
        <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
    */
     
} 

  
export default App;
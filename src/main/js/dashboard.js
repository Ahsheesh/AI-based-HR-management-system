import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Card from '../../components/Card'; // Using a single, reusable Card component

function App() {
  const [greeting, setGreeting] = useState('Hello, Guest');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  useEffect(() => {
    // This can be used to fetch the user's name from a backend
    // For now, we'll keep it simple.
    // fetch('/api/greeting').then...
    
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="greeting">{greeting}</div>
      <Sidebar />
      
      <main className="main-content-area">
        {/* Cards and their titles are now positioned absolutely via CSS */}
        {/* This exactly matches the layout of your original HTML file. */}
        
        <Card className="current-task-card">
          Current task content goes here
        </Card>
        <div className="title-overlay current-task-title">Current task</div>

        <Card className="attendance-card">
          Attendance data
        </Card>
        <div className="title-overlay attendance-title">Attendance</div>

        <Card className="today-card">
          Today's schedule
        </Card>
        <div className="title-overlay today-title">Today</div>

        <Card className="plans-card">
          Upcoming plans
        </Card>
        <div className="title-overlay plans-title">Plans</div>

        <div className="card time-bar"></div>
      </main>

      {/* The time can be displayed in the sidebar or footer */}
      <div className="time-display">{currentTime}</div>
    </div>
  );
}

export default App;
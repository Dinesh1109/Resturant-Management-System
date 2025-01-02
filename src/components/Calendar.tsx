import { useState } from 'react';

const Calendar = ({ onDateClick }: { onDateClick: (date: string) => void }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to change the month
  const changeMonth = (direction: 'next' | 'prev') => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (direction === 'next') {
        newDate.setMonth(prevDate.getMonth() + 1);
      } else {
        newDate.setMonth(prevDate.getMonth() - 1);
      }
      return newDate;
    });
  };

  // Generate days for the current month
  const generateDays = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days = [];

    // Fill the first empty cells before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Get the month and year for the header
  const getMonthYear = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  // Handle date click
  const handleDateClick = (day: number) => {
    if (day) {
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      onDateClick(formattedDate);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => changeMonth('prev')}>Prev</button>
        <span>{getMonthYear()}</span>
        <button onClick={() => changeMonth('next')}>Next</button>
      </div>
      <div className="calendar-days">
        {generateDays().map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day ? '' : 'empty'} ${day === new Date().getDate() ? 'today' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

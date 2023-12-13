import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/datepicker_styles.css';

const MyDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleChange = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <div style={{ paddingTop: '20px' }}>
            <label style={{ paddingRight: '10px' }}>날짜</label>
            <DatePicker selected={selectedDate} onChange={handleChange} className='customDatePickerClass' />
        </div>
    );
};

export default MyDatePicker;

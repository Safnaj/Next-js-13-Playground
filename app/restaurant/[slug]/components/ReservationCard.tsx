"use client";

import { useState } from "react";
import DataPicker from "react-datepicker";
import { partySize } from "../../../../data";

export default function ReservationCard() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  return (
    <div className='fixed w-[15%] bg-white rounded p-3 shadow'>
      <div className='text-center border-b pb-2 font-bold'>
        <h4 className='mr-7 text-lg'>Make a reservation</h4>
      </div>
      <div className='my-3 flex flex-col'>
        <label htmlFor=''>Party Size</label>
        <select name='' id='' className='py-3 border-b font-light bg-white'>
          {partySize.map((size) => (
            <option value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor=''>Date</label>
          <DataPicker
            selected={selectedDate}
            onChange={handleDateChange}
            className='py-3 border-b font-light text-reg bg-white w-28'
            dateFormat={"MMMM d, "}
            wrapperClassName='w-[48%]'
          />
        </div>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor=''>Time</label>
          <select name='' id='' className='py-3 border-b font-light bg-white'>
            <option value=''>7.30 AM</option>
            <option value=''>9.30 AM</option>
          </select>
        </div>
      </div>
      <div className='mt-5'>
        <button className='bg-red-600 rounded w-full px-4 text-white font-bold h-16'>
          Find Time
        </button>
      </div>
    </div>
  );
}

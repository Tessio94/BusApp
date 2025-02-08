"use client";

import { useState } from "react";

type tripObj = {
  bus_name: string;
  origin: string;
  destination: string;
  doj: string;
  total_seats: number;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
  bookedSeats: Array<string>;
};

const SeatPlan: React.FC<tripObj> = ({
  bus_name,
  origin,
  destination,
  doj,
  total_seats,
  stoppages,
  fare,
  start_time,
  bookedSeats,
}) => {
  let right = [];
  let left = [];

  if (total_seats == 48) {
    let halfSeats = total_seats / 2;
    right = [...Array(halfSeats).keys()].map((i) => i + 1);
    left = Array.from(
      { length: halfSeats },
      (_, index) => halfSeats + index + 1,
    );
  } else {
    let halfSeats = 24;
    right = [...Array(halfSeats).keys()].map((i) => i + 1);
    left = Array.from({ length: 12 }, (_, index) => halfSeats + index + 1);
  }

  // functionality to select seats
  const [selectedSeatArr, setSelectedSeatArr] = useState<string[]>([]);
  const [passengerVisibility, setPassengerVisiblity] = useState(false);
  const handlePassengerVisible = () => {
    setPassengerVisiblity((passengerVisibility) => !passengerVisibility);
  };
  const handleSeatClick = (seatNumber: string) => {
    // check if the seat is already booked
    if (bookedSeats.includes(seatNumber)) {
      return;
    }
    // check if the seat is already selected
    const isSelected = selectedSeatArr.includes(seatNumber);

    // if selected remove from array, otherwise add to array
    setSelectedSeatArr((prevArr) =>
      !isSelected ? [...prevArr, seatNumber] : [...prevArr],
    );
  };

  return (
    <main className="fixed left-[50%] top-[50%] flex h-auto w-[80%] translate-x-[-50%] translate-y-[-50%] bg-gray-300 shadow-lg shadow-black">
      <div
        id="bus"
        className="m-20 flex h-fit border-2 border-l-8 border-black bg-white"
      >
        <div id="driver" className="w-12 border-r-4 border-x-black bg-white">
          <div className="mx-2 my-5 h-6 w-6 rounded-full border-2 border-black"></div>
        </div>
        <div id="seats" className="grid grid-rows-2 gap-y-4 p-4">
          <div
            id="right"
            className="grid h-[50%] w-[100%] grid-cols-12 gap-x-1"
          >
            {right.map((seatNumb, index) => {
              return (
                <div
                  className="flex h-[2rem] w-[2rem] items-center justify-center border-4 border-l-2 border-black hover:cursor-pointer hover:bg-orange-600"
                  key={index}
                >
                  {seatNumb}
                </div>
              );
            })}
          </div>
          <div id="left" className="grid h-[50%] w-[100%] grid-cols-12 gap-x-1">
            {left.map((seatNumb, index) => {
              return (
                <div
                  className="flex h-[2rem] w-[2rem] items-center justify-center border-4 border-l-2 border-black hover:cursor-pointer hover:bg-orange-600"
                  key={index}
                >
                  {seatNumb}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SeatPlan;

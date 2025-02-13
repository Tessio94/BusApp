"use client";

import clsx from "clsx";
import { useState } from "react";
import PassengerDetails from "./passengerDetails";

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
    let rows = 4;
    let cols = 12;

    let seatOrder = Array.from(
      { length: rows * cols },
      (_, index) => index + 1,
    );

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (row === 0) {
          right.push(seatOrder[rows * col]);
        } else if (row === 1) {
          right.push(seatOrder[rows * col + 1]);
        } else if (row === 2) {
          left.push(seatOrder[rows * col + 2]);
        } else {
          left.push(seatOrder[rows * col + 3]);
        }
      }
    }
  } else {
    let rows = 3;
    let cols = 12;

    let seatOrder = Array.from(
      { length: rows * cols },
      (_, index) => index + 1,
    );

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (row === 0) {
          right.push(seatOrder[rows * col]);
        } else if (row === 1) {
          right.push(seatOrder[rows * col + 1]);
        } else {
          left.push(seatOrder[rows * col + 2]);
        }
      }
    }
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
      !isSelected
        ? [...prevArr, seatNumber]
        : prevArr.filter((seat) => seat !== seatNumber),
    );
  };

  const clearSelection = () => {
    setSelectedSeatArr([]);
  };

  return (
    <>
      <main className="fixed left-[50%] top-[50%] flex h-auto w-[80%] translate-x-[-50%] translate-y-[-50%] bg-gray-300 shadow-lg shadow-black">
        <div
          id="bus"
          className="m-20 flex h-fit border-2 border-l-8 border-black bg-white"
        >
          <div id="driver" className="w-12 border-r-4 border-x-black bg-white">
            <div className="mx-2 mt-24 h-6 w-6 rounded-full border-2 border-black"></div>
          </div>
          <div id="seats" className="grid grid-rows-2 gap-y-4 p-4">
            <div
              id="right"
              className="grid h-[50%] w-[100%] grid-cols-12 gap-x-1"
            >
              {right.map((seatNumb, index) => {
                const isBooked = bookedSeats.includes(String(seatNumb));

                const isSelected = selectedSeatArr.includes(String(seatNumb));

                return (
                  <div
                    className={clsx(
                      "flex h-[2rem] w-[2rem] items-center justify-center border-4 border-l-2 border-black hover:cursor-pointer hover:bg-orange-600",
                      {
                        "bg-indigo-500": isBooked,
                        "bg-green-600": isSelected && !isBooked,
                      },
                    )}
                    key={index}
                    onClick={() => handleSeatClick(String(seatNumb))}
                  >
                    {seatNumb}
                  </div>
                );
              })}
            </div>
            <div
              id="left"
              className="grid h-[50%] w-[100%] grid-cols-12 gap-x-1"
            >
              {left.map((seatNumb, index) => {
                const isBooked = bookedSeats.includes(String(seatNumb));

                const isSelected = selectedSeatArr.includes(String(seatNumb));

                return (
                  <div
                    className={clsx(
                      "flex h-[2rem] w-[2rem] items-center justify-center border-4 border-l-2 border-black hover:cursor-pointer hover:bg-orange-600",
                      {
                        "bg-indigo-500": isBooked,
                        "bg-green-600": isSelected && !isBooked,
                      },
                    )}
                    key={index}
                    onClick={() => handleSeatClick(String(seatNumb))}
                  >
                    {seatNumb}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          id="station"
          className="m-12 w-[30%] space-y-2 bg-white p-8 shadow-lg shadow-black"
        >
          <p className="my-4 font-bold">{bus_name}</p>
          <p>
            Boarding Point: <span className="font-semibold">{origin}</span>
          </p>
          <p>
            Drop off Point: <span className="font-semibold">{destination}</span>
          </p>
          <hr />
          <div>
            <p className="font-semibold">
              Seats:
              <br />
              {selectedSeatArr.map((seatNum, index) => {
                return (
                  <span className="font-semibold" key={seatNum}>
                    {index === selectedSeatArr.length - 1
                      ? seatNum
                      : seatNum + ","}
                  </span>
                );
              })}
            </p>
            <br />
            <button
              onClick={clearSelection}
              className="w-[90%] bg-red-600 p-2 text-white transition-all hover:cursor-pointer hover:bg-orange-900"
            >
              CLEAR SELECTION
            </button>
            <br />
            {selectedSeatArr.length !== 0 ? (
              <button
                onClick={handlePassengerVisible}
                className="hover:bg-indigo-70 w-[90%] bg-indigo-600 p-2 text-white transition-all hover:cursor-pointer"
              >
                CONTINUE
              </button>
            ) : (
              <button></button>
            )}
          </div>
        </div>
      </main>
      {passengerVisibility && (
        <div>
          <button
            onClick={handlePassengerVisible}
            className="fixed right-10 top-0 z-30 m-3 bg-indigo-500 bg-red-500 p-1 font-bold text-white hover:cursor-pointer"
          >
            X
          </button>
          <PassengerDetails
            busName={bus_name}
            origin={origin}
            destination={destination}
            doj={doj}
            stoppages={stoppages}
            start_time={start_time}
            seatNos={selectedSeatArr}
            fare={fare}
          />
        </div>
      )}
    </>
  );
};

export default SeatPlan;

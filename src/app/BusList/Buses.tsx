"use client";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import SeatPlan from "./SeatPlan";

type busArr = {
  bus_name: string;
  details: string;
  total_seats: number;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
  service: "day" | "night";
  origin: string;
  destination: string;
  doj: string;
  bookedSeats: Array<string>;
  routes: string;
  total_fare: number;
  estimated_arrival: string;
  duration: string;
  arrival_date: string;
};

type props = { buses: busArr[] };

const Buses: React.FC<props> = ({ buses }) => {
  const { doj } = buses[0];
  const parsedDate = parseISO(doj);
  const formated_date = format(parsedDate, "dd/MM/yyyy");

  const [totalFare, setTotalFare] = useState(0);
  const [totalSeats, setTotalSeats] = useState(0);
  const [busName, setBusName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [seatVisibility, setSeatVisiblity] = useState(false);
  const [stops, setStops] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  const stopArr = buses[0].stoppages;
  const start = stopArr.indexOf(buses[0].origin);
  const end = stopArr.indexOf(buses[0].destination);
  const stop = stopArr.slice(start, end);

  const handleFare = (
    total_fare: number,
    bus_name: string,
    startTime: string,
    total_seats: number,
    booked_seats: string[],
  ) => {
    setBookedSeats(booked_seats);
    setTotalFare(total_fare);
    setTotalSeats(total_seats);
    setBusName(bus_name);
    setStartTime(startTime);
    setStops(stop);
    handleSeatVisible();
  };

  const handleSeatVisible = () => {
    setSeatVisiblity((seatVisibility) => !seatVisibility);
  };

  return (
    <section id="busList" className="mx-10 flex">
      <div className="w-max-[80%] mx-auto">
        {buses.map((bus, index) => {
          return (
            <div
              key={index}
              id="card"
              className="font-md font-md my-4 grid w-[100%] grid-cols-6 gap-4 border-2 border-gray-600 p-4"
            >
              <div>
                <p className="text-lg font-bold">{bus.bus_name}</p>
                <p>{bus.details}</p>
              </div>
              <div>
                <p className="font-semibold text-indigo-700">Start</p>
                <p className="text-lg font-bold">{bus.start_time} hrs</p>
                <p className="text-lg font-bold">{formated_date}</p>
                <p className="font-semibold text-indigo-700">{bus.origin}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-indigo-600">Duration</p>
                <p className="text-lg font-bold">{bus.duration}</p>
              </div>
              <div>
                <p className="font-semibold text-indigo-700">Arrival</p>
                <p className="text-lg font-bold">{bus.estimated_arrival}</p>
                <p className="text-lg font-bold">{bus.arrival_date}</p>
                <p className="font-semibold text-indigo-700">
                  {bus.destination}
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">EUR {bus.total_fare}</p>
              </div>
              <div>
                <p className="mb-4 font-semibold">
                  {bus.total_seats} Total seats
                </p>
                <button
                  className="rounded-lg bg-indigo-700 p-4 text-white transition-all hover:bg-indigo-500"
                  onClick={() =>
                    handleFare(
                      bus.total_fare,
                      bus.bus_name,
                      bus.start_time,
                      bus.total_seats,
                      bus.bookedSeats,
                    )
                  }
                >
                  VIEW SEATS
                </button>
              </div>
              <div>
                {seatVisibility && (
                  <div>
                    <SeatPlan
                      origin={bus.origin}
                      destination={bus.destination}
                      doj={bus.doj}
                      stoppages={stops}
                      bus_name={busName}
                      total_seats={totalSeats}
                      fare={totalFare}
                      bookedSeats={bookedSeats}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {seatVisibility && <button onClick={handleSeatVisible}>X</button>}
      </div>
    </section>
  );
};

export default Buses;

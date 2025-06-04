import Link from "next/link";
import { pool } from "../../../utils/dbConnect";
import { addHours, format, parseISO } from "date-fns";
import Buses from "./Buses";

export default async function BusList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { from: origin, to: destination, date: doj } = await searchParams;

  const data = await pool.query(
    `SELECT * FROM buses WHERE stoppages @> ARRAY[$1, $2]::TEXT[] AND array_position(stoppages, $1) < array_position(stoppages, $2);`,
    [origin, destination],
  );
  const buses = data.rows;

  const route_name = buses[0].routes;

  if (typeof doj !== "string") {
    throw new Error("Invalid date format");
  }
  const parsedDate = parseISO(doj);
  const formated_date = format(parsedDate, "dd/MM/yyyy");

  const distance = await pool.query(
    `WITH stop_data AS (
      SELECT 
        route_name,
        ROW_NUMBER() OVER () AS stop_index,
        (stop_data).name AS stop_name,
        (stop_data).distance_from_last AS distance_from_last
      FROM bus_routes,
      UNNEST(distance) AS stop_data
    )
    SELECT  SUM(distance_from_last) AS total_distance
      FROM stop_data
      WHERE stop_index > (
        SELECT stop_index
          FROM stop_data
          WHERE stop_name = $1
          AND route_name = $3
          LIMIT 1
      ) AND stop_index <= (
        SELECT stop_index
          FROM stop_data
          WHERE stop_name = $2
          AND route_name = $3
          LIMIT 1
      )
      AND route_name = $3
   `,
    [origin, destination, route_name],
  );
  const total_distance = distance.rows[0].total_distance;

  // calculate distance of passenger pickup spot from bus origin
  const distance_origin = await pool.query(
    `
    WITH stop_data AS (
      SELECT 
        route_name,
        ROW_NUMBER() OVER () AS stop_index,
        (stop_data).name AS stop_name,
        (stop_data).distance_from_last AS distance_from_last
      FROM bus_routes,
      UNNEST(distance) AS stop_data
    )
    SELECT  SUM(distance_from_last) AS distance_from_start
      FROM stop_data
      WHERE stop_index > 1
      AND stop_index <= (
      SELECT stop_index
      FROM stop_data
      WHERE stop_name = $1
      AND route_name = $2
      LIMIT 1
      )
      AND route_name = $2
   `,
    [origin, route_name],
  );
  const distance_from_start = distance_origin.rows[0].distance_from_start;

  const stopArr = buses[0].stoppages;

  const start = stopArr.indexOf(origin);
  const end = stopArr.indexOf(destination) + 1;
  const stop = stopArr.slice(start, end);

  for (const bus of buses) {
    const total_fare = parseFloat(bus.fare) * total_distance;

    const travel_time_hrs = total_distance / bus.speed;
    const hours = Math.floor(travel_time_hrs);
    const minutes = Math.round((travel_time_hrs - hours) * 60);
    const formatted_duration = `${hours}h ${minutes}m`;

    const start_time = new Date(`${doj}T${bus.start_time}`);
    const time_to_origin_hrs = distance_from_start / bus.speed;
    const departure_time = addHours(start_time, time_to_origin_hrs);
    const duration_ms = travel_time_hrs * 60 * 60 * 1000;
    const arrivalDate = new Date(departure_time.getTime() + duration_ms);

    const estimated_arrival_time = addHours(departure_time, travel_time_hrs);
    const formatted_departure_time = format(departure_time, "HH:mm:ss");
    const formatted_arrival_time = format(estimated_arrival_time, "HH:mm:ss");
    const formatted_arrival_date = format(arrivalDate, "dd/MM/yyyy");

    bus.total_fare = total_fare.toFixed(2);
    bus.start_time = formatted_departure_time;
    bus.estimated_arrival = formatted_arrival_time;
    bus.estimated_date = formatted_arrival_date;
    bus.duration = formatted_duration;
    bus.origin = origin;
    bus.destination = destination;
    bus.doj = doj;
    bus.stop = stop;

    // fetch booked seats
    const bookedSeats = await pool.query(
      `SELECT seat_no FROM journey WHERE bus_name = $1 AND doj = $2 AND stoppages && $3`,
      [bus.bus_name, doj, stopArr],
    );

    bus.booked_seats = bookedSeats.rows.map((row) => row.seat_no);
  }

  return buses.length === 0 ? (
    <main>
      <p className="mx-10 my-4">
        <strong>Home</strong> &gt; Bus Tickets
      </p>
      <p className="mx-10 my-4 font-semibold">
        {origin} - &gt; {destination} - &gt; {formated_date}
        <Link href="/">
          <button className="mx-5 rounded-md bg-indigo-500 p-1 text-white transition-all hover:bg-indigo-400">
            Modify
          </button>
        </Link>
      </p>
      <div className="flex h-screen w-full justify-center align-middle">
        <p className="m-20 text-center text-2xl font-bold">
          THERE ARE NO AVAILABLE BUSES
        </p>
      </div>
    </main>
  ) : (
    <main>
      <p className="mx-10 my-4">
        <strong>Home</strong> &gt; Bus Tickets
      </p>
      <p className="mx-10 my-4 font-semibold">
        {buses[0].origin} - &gt; {buses[0].destination} - &gt; {formated_date}
        <Link href="/">
          <button className="mx-5 rounded-md bg-indigo-500 p-1 text-white transition-all hover:bg-indigo-400">
            Modify
          </button>
        </Link>
      </p>
      <Buses buses={buses} />
    </main>
  );
}

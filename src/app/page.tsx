"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function Home() {
  const router = useRouter();

  const stoppages: string[] = [
    "Zadar",
    "Šibenik",
    "Trogir",
    "Split",
    "Makarska",
    "Ploče",
    "Ston",
    "Dubrovnik",
    "Gospić",
    "Otočac",
    "Karlovac",
    "Zagreb",
  ];
  // origin state
  const [places, setPlaces] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [filteredOrigins, setFilteredOrigins] = useState<string[]>([]);
  const [originSuggestion, setOriginSuggestion] = useState<boolean>(false);
  // destination state
  const [destination, setDestination] = useState<string>("");
  const [stops, setStops] = useState<string>("");
  const [filteredDestination, setFilteredDestination] = useState<string[]>([]);
  const [destinationSuggestion, setDestinationSuggestion] =
    useState<boolean>(false);

  const [doj, setDoj] = useState<string>("");

  // set origin functionality
  const handleSearchOrigin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginSuggestion(true);

    const query: string = e.target.value;
    setPlaces(query);

    const filteredResult: string[] = stoppages.filter((stopp) =>
      stopp.toLowerCase().startsWith(query.toLowerCase()),
    );
    setFilteredOrigins(filteredResult);
  };

  const getOrigin = (stopp: string) => {
    setPlaces(stopp);
    setOrigin((prevOrigin) => {
      if (prevOrigin !== stopp) {
        return stopp;
      } else {
        return prevOrigin;
      }
    });
    setOriginSuggestion(false);
  };

  // set destination functionality
  const handleSearchDestination = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestinationSuggestion(true);

    const query: string = e.target.value;
    setStops(query);

    const filteredResult: string[] = stoppages.filter((stopp) =>
      stopp.toLowerCase().startsWith(query.toLowerCase()),
    );
    setFilteredDestination(filteredResult);
  };

  const getDestination = (stopp: string) => {
    setStops(stopp);
    setDestination((prevDestination) => {
      if (prevDestination !== stopp) {
        return stopp;
      } else {
        return prevDestination;
      }
    });
    setDestinationSuggestion(false);
  };

  const today = new Date().toISOString().split("T")[0];

  const searchBuses = () => {
    try {
      router.push(`/BusList?from=${origin}&to=${destination}&date=${doj}`);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleFormSubmit = function (e) {
    e.preventDefault();
    searchBuses();
  };

  return (
    <main className="h-screen bg-[url('/autobus_cro.jpg')] bg-cover bg-center">
      <div
        id="main"
        className="flex h-screen w-full items-center justify-center"
      >
        <form
          action=""
          method="post"
          className="flex min-w-[85%] flex-col items-stretch xl:min-w-full xl:flex-row xl:justify-center"
          onSubmit={handleFormSubmit}
        >
          <div id="origin" className="relative">
            <input
              type="text"
              name="from"
              className={clsx(
                "font-lg h-20 w-full rounded-tl-xl rounded-tr-xl border-2 border-gray-500 p-[2.7rem] font-bold outline-none xl:rounded-l-xl xl:rounded-tr-none",
                { "xl:rounded-bl-none": places && originSuggestion },
              )}
              placeholder="From"
              autoComplete="off"
              value={places}
              onChange={handleSearchOrigin}
            />
            {places && originSuggestion && (
              <div className="absolute z-50 w-full overflow-hidden rounded-b-xl border-2 border-gray-500 bg-slate-300 xl:bg-white">
                <ul id="fromList">
                  {filteredOrigins.map((stopp, index) => (
                    <li
                      key={index}
                      className="px-5 py-2 font-bold text-gray-700 transition-all hover:cursor-pointer hover:bg-slate-300"
                      onClick={() => getOrigin(stopp)}
                    >
                      {stopp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div id="destination" className="relative">
            <input
              type="text"
              name="to"
              className="font-lg h-20 w-full border-2 border-gray-500 p-[2.7rem] font-bold outline-none"
              placeholder="To"
              autoComplete="off"
              value={stops}
              onChange={handleSearchDestination}
            />
            {stops && destinationSuggestion && (
              <div className="absolute z-50 w-full overflow-hidden rounded-b-xl border-2 border-gray-500 bg-slate-300 xl:bg-white">
                <ul id="toList">
                  {filteredDestination.map((stopp, index) => (
                    <li
                      key={index}
                      className="px-5 py-2 font-bold text-gray-700 transition-all hover:cursor-pointer hover:bg-slate-300"
                      onClick={() => getDestination(stopp)}
                    >
                      {stopp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <input
            type="date"
            name="doj"
            min={today}
            className="font-lg h-20 w-full border-2 border-gray-500 p-[2.7rem] font-bold outline-none xl:w-fit"
            autoComplete="off"
            onChange={(e) => setDoj(e.target.value)}
          />
          <button
            type="submit"
            className="h-22 text-md w-full rounded-bl-xl rounded-br-xl bg-slate-500 px-5 py-5 font-bold text-white transition-all hover:bg-slate-400 xl:w-fit xl:rounded-r-xl xl:rounded-bl-none"
          >
            SEARCH BUSES
          </button>
        </form>
      </div>
    </main>
  );
}

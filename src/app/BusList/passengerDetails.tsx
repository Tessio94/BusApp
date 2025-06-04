"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type passengerObj = {
  busName: string;
  origin: string;
  destination: string;
  doj: string;
  total_seats?: number;
  stoppages: Array<string>;
  start_time: string;
  fare: number;
  seatNos: Array<string>;
};

type passengerFormData = {
  busName: string;
  origin: string;
  destination: string;
  doj: string;
  passenger_name: string;
  seat_no: string;
  mobile_no: string;
  email: string;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
};

const PassengerDetails: React.FC<passengerObj> = ({
  busName,
  origin,
  destination,
  doj,
  stoppages,
  start_time,
  fare,
  seatNos,
}) => {
  const [formData, setFormData] = useState<passengerFormData[]>(
    seatNos.map((seatNo: string) => ({
      busName,
      origin,
      destination,
      doj,
      passenger_name: "",
      seat_no: seatNo,
      mobile_no: "",
      email: "",
      stoppages,
      start_time,
      fare,
    })),
  );

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) =>
      prevFormData.map((item, i) =>
        i === index ? { ...item, [name]: value } : item,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/bookSeat", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const bookingIds = response.data.bookingId;
      router.push(`/Payments/${bookingIds.join(",")}`);

      alert("Seat Booked");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed right-0 top-0 z-10 h-[100%] w-[30vw] space-y-4 overflow-auto bg-white px-8 py-5 shadow-lg shadow-black">
        <h2 className="text-xl font-bold">{busName}</h2>
        <h2 className="text-xl font-bold">PassengerDetails</h2>
        <div className="space-y-2">
          <h4 className="text-md flex items-center font-semibold">
            Passenger Information
          </h4>
          <form onSubmit={handleSubmit}>
            {seatNos?.map((items: string, index: number) => {
              return (
                <div key={index} className="py-2">
                  <div className="space-y-2">
                    <p className="mb-2 font-bold">
                      Passenger{" "}
                      <span className="text-xl font-bold text-indigo-800">
                        {index + 1}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Seat No. :{" "}
                      <span className="text-xl font-bold text-indigo-800">
                        <input
                          type="text"
                          name="seat_no"
                          value={formData[index].seat_no}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </span>
                    </p>
                    <label htmlFor={`Name-${index}`} className="font-semibold">
                      Name <br />
                      <input
                        type="text"
                        name="passenger_name"
                        onChange={(e) => handleInputChange(e, index)}
                        id={`Name-${index}`}
                        className="w-[90%] border-2 border-gray-500 p-2 outline-none"
                        required
                      />
                    </label>
                    <br />
                  </div>
                  <h4 className="flex items-center font-semibold">
                    Contact Details
                  </h4>
                  <label htmlFor={`Email-${index}`} className="font-semibold">
                    Email <br />
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => handleInputChange(e, index)}
                      id={`Email-${index}`}
                      className="w-[90%] border-2 border-gray-500 p-2 outline-none"
                      required
                    />
                  </label>
                  <br />
                  <label htmlFor={`Phone-${index}`} className="font-semibold">
                    Phone <br />
                    <input
                      type="phone"
                      name="mobile_no"
                      onChange={(e) => handleInputChange(e, index)}
                      id={`Phone-${index}`}
                      className="w-[90%] border-2 border-gray-500 p-2 outline-none"
                      required
                    />
                  </label>
                </div>
              );
            })}
            <hr />
            <p className="py-2">
              <strong>Total Amount: EUR {fare * seatNos.length}</strong>
            </p>
            <button
              type="submit"
              className="bg-indigo-600 p-2 text-white transition-all hover:cursor-pointer hover:bg-indigo-800"
            >
              PROCEED TO PAY
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PassengerDetails;

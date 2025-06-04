import { pool } from "@/../utils/dbConnect";
import PaymentForm from "./PaymentForm";

type journey = {
  id: number;
  bus_name: string;
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
  paymentid: string;
  payment_status: boolean;
};

interface Params {
  bookingId: string;
}

export default async function Payments({ params }: { params: Params }) {
  const { bookingId } = params;
  const bookingIds = decodeURIComponent(bookingId).split(",");

  const result: journey[] = await Promise.all(
    // map over the bookingids and send a query to the db for each bookingId
    bookingIds.map(async (i) => {
      const res = await pool.query<journey>(
        `SELECT * FROM journey WHERE id = $1`,
        [i],
      );
      return res.rows[0]; // each response will be separately stored in the result array
    }),
  );
  // the result array will then be send as props to a Payment Form component
  console.log(result);

  return <PaymentForm formData={result} bookingIds={bookingIds} />;
}

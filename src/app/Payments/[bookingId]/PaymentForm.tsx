"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// this array will also contain values for payment id that will be created by stripe on the successfull completion of the payments
type passengerData = {
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
  paymentid: string; // will be generated by srtipe
  payment_status: boolean; // will be false initially and will be true once payment is confirmed
};

const STRIPE_PUBLIC_KEY =
  "pk_test_51QtFmaD7tfK6fCQAlm9kIO16qke2CI0o9dd3XAVvsWPkrBGdg1fLWY4WnsICSOvrlxp6IA4GAUdQM5IKoeFWUZLV00n3gFKJlf";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

type props = { formData: passengerData[]; bookingIds: Array<string> };

const PaymentForm: React.FC<props> = ({ formData, bookingIds }: props) => {
  void formData;
  void bookingIds;

  return (
    <main className="m-1o m-10 mx-auto max-w-6xl border p-10 text-center">
      <div className="flex">
        <div className="payment-options w-[60%] p-10">
          <h1 className="mb-5 text-xl font-bold">Make Payment</h1>
          <div className="my-10">
            <Elements stripe={stripePromise} />
          </div>
        </div>
        <div className="payment-info m-10 w-[40%]"></div>
      </div>
    </main>
  );
};

export default PaymentForm;

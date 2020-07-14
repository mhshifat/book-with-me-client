import moment, * as Moment from "moment";
import { extendMoment } from "moment-range";
import React, { useEffect, useRef, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import { Rental } from "../../../../../api/rentals";
import ApiErrors from "../../../../common/ApiErrors";
import { IRental } from "../../../Home/components/RentalList/index";
import "./styles.scss";

interface Props {
  rental: IRental | null;
}

const momentRange = extendMoment(Moment);
const RentalBooking: React.FC<Props> = ({ rental }) => {
  const [totalNights, setTotalNights] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookedOutDates, setBookedOutDates] = useState<any[]>([]);
  const [apiErrors, setApiErrors] = useState(null);
  const [proposedBooking, setProposedBooking] = useState<{
    startDate: string | null;
    endDate: string | null;
    guests: string;
  }>({
    startDate: null,
    endDate: null,
    guests: "",
  });
  const datesRef: any = useRef(null);

  useEffect(() => {
    rental &&
      Rental.getBookings(rental._id)
        .then((res) => {
          setBookedOutDates(res);
        })
        .catch((errors) => console.log(errors));
  }, [rental]);

  const handleBooking = () => {
    const newBooking = {
      rentalId: rental?._id,
      startAt: proposedBooking.startDate,
      endAt: proposedBooking.endDate,
      guests: Number(proposedBooking.guests),
      nights: totalNights,
      price: totalPrice,
    };
    Rental.createBooking(newBooking)
      .then((res) => {
        setApiErrors(null);
        setIsModalOpen(false);
        setTotalPrice(0);
        setTotalPrice(0);
        setProposedBooking({
          endDate: null,
          startDate: null,
          guests: "",
        });
        setBookedOutDates([...bookedOutDates, res]);
        toast.success(
          "You have booked this rental for " + datesRef.current.value
        );
        datesRef.current.value = null;
      })
      .catch((errors) => setApiErrors(errors));
  };

  return (
    <div className="booking">
      <h3 className="booking-price">
        $ {rental?.dailyPrice}{" "}
        <span className="booking-per-night">per night</span>
      </h3>
      <hr></hr>
      <div className="form-group">
        <label htmlFor="dates">Dates</label>
        <div>
          <DateRangePicker
            isInvalidDate={(date) => {
              let isBookedOut = false;

              bookedOutDates.forEach((booking: any) => {
                const range = momentRange.range(
                  moment(booking.startAt),
                  moment(booking.endAt)
                );
                if (range.contains(moment(date))) isBookedOut = true;
              });

              return date < moment() || isBookedOut;
            }}
            containerStyles={{
              width: "100%",
            }}
            opens="left"
            onApply={(_, picker) => {
              // @ts-ignore
              datesRef.current.value =
                moment(picker.startDate).format("YYYY/MM/DD") +
                " to " +
                moment(picker.endDate).format("YYYY/MM/DD");
              setProposedBooking({
                ...proposedBooking,
                startDate: picker.startDate,
                endDate: picker.endDate,
              });
            }}
          >
            <input
              ref={datesRef}
              type="text"
              className="form-control"
              onChange={() => {}}
            />
          </DateRangePicker>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="guests">Guests</label>
        <input
          value={proposedBooking.guests}
          type="number"
          className="form-control"
          id="guests"
          aria-describedby="guests"
          onChange={(e) => {
            setProposedBooking({
              ...proposedBooking,
              guests: e.target.value,
            });
          }}
        />
      </div>
      <button
        onClick={() => {
          const nights: any = momentRange
            // @ts-ignore
            .range(proposedBooking.startDate, proposedBooking.endDate)
            .diff("days");
          const totalPrice: any =
            parseInt(nights, 12) *
            (rental?.dailyPrice || 0) *
            parseInt(proposedBooking.guests, 12);
          setTotalPrice(totalPrice);
          setTotalNights(nights);
          setIsModalOpen(true);
        }}
        disabled={
          !proposedBooking.startDate ||
          !proposedBooking.endDate ||
          !proposedBooking.guests
        }
        className="btn btn-bwm-main btn-block"
      >
        Reserve place now
      </button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        center
        classNames={{ modal: "booking-modal" }}
      >
        <h4
          className="modal-title title"
          style={{
            paddingTop: "30px",
          }}
        >
          Confirm Booking
        </h4>
        <p className="modal-subtitle">
          {datesRef.current ? datesRef.current.value : ""}
        </p>
        <div className="modal-body">
          <p>
            <em>{totalNights}</em> Nights /
          </p>
          <p>
            <em>{rental?.dailyPrice}</em> per night
          </p>
          <p>Guests: {proposedBooking.guests}</p>
          <p>
            Price: <em>${totalPrice}</em>
          </p>
        </div>
        <div className="modal-footer">
          <button onClick={handleBooking} type="button" className="btn btn-bwm">
            Confirm
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="btn btn-bwm"
          >
            Cancel
          </button>
          <ApiErrors errors={apiErrors || []} />
        </div>
      </Modal>
      <hr />
      <p className="booking-note-title">
        People are interested into this house
      </p>
      <p className="booking-note-text">
        More than 500 people checked this rental in last month.
      </p>
    </div>
  );
};

export default RentalBooking;

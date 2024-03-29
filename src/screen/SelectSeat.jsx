import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Modal from "react-bootstrap/Modal";
import Container from "@mui/material/Container";
import PlaneImage from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/PlaneImage_1.png";
import PlaneImage_Mobile from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/PlaneImage_Mobile.png";
import PlaneImage_Ipad from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/PlaneImage_Ipad.png";
import EconomySeat from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/Economy_Seats.png";
import BusinessSeat from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/Business_Seats.png";
import { format } from "date-fns";
import { FaCircle, FaCheck } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import "../components/CssFolder/SelectSeat.css";
import { TailSpin } from "react-loader-spinner";
import { setSelectSeat, setLoading, setShowModel, setSelectedUpgradeClass } from "../redux/slices/booking/bookingslices.jsx";
import { NavLink } from "react-router-dom";

const Navbar = React.lazy(() => import("../components/JsxFolder/Navbar.jsx"));

const SelectSeat = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    useEffect(() => {
        dispatch(setLoading(true));

        const loadingTimeout = setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, [dispatch]);

    const Business_seatCount1 = 4;
    const Business_Numrows1 = 5;

    const Business_seatCount2 = 4;
    const Business_Numrows2 = 4;

    const Economy_seatCount = 6;
    const Economy_Numrows_container_1 = 8;
    const Economy_Numrows_container_2 = 5;
    const Economy_Numrows_container_3 = 10;

    const passengerCount = state.booking.selectedNoOfTravellers.Totalcount;

    const disabledSeats = [
        "Seat 1B(1)1",
        "Seat 1B(1)2",
        "Seat 1E3",
        "Seat 1E5",
        "Seat 1E8",
        "Seat 2B(1)2",
        "Seat 2B(1)3",
        "Seat 2E2",
        "Seat 2E5",
        "Seat 2B(2)2",
        "Seat 2E1",
        "Seat 3B(1)0",
        "Seat 3E1",
        "Seat 3E2",
        "Seat 3E3",
        "Seat 3E5",
        "Seat 3B(2)0",
        "Seat 3B(2)1",
        "Seat 4E0",
        "Seat 4E1",
        "Seat 4E3",
        "Seat 5E4",
        "Seat 6E2",
        "Seat 6E5",
        "Seat 7E3",
        "Seat 7E4",
        "Seat 7E6",
        "Seat 7E8",
        "Seat 8E0",
        "Seat 8E1",
        "Seat 8E7",
        "Seat 9E2",
        "Seat 9E5",
        "Seat 9E8",
        "Seat 10E0",
        "Seat 10E1",
        "Seat 10E5",
        "Seat 11E4",
        "Seat 12E1",
        "Seat 12E4",
        "Seat 13E1",
        "Seat 13E5",
        "Seat 14E3",
        "Seat 14E5",
        "Seat 15E6",
        "Seat 16E0",
        "Seat 16E2",
        "Seat 16E3",
        "Seat 17E0",
        "Seat 17E2",
        "Seat 18E1",
        "Seat 18E6",
        "Seat 19E2",
        "Seat 19E3",
        "Seat 20E1",
        "Seat 20E2",
        "Seat 21E3",
        "Seat 21E4",
        "Seat 22E0",
        "Seat 22E5",
        "Seat 23E2",
        "Seat 23E6",
    ];

    const Passengers_name = () => {
        let passengerForm = state.booking.passengerForm;
        let firstName, morePassengers;

        if (passengerForm && passengerForm.length !== 0) {
            firstName = passengerForm[0]?.firstName || "--";
            // lastName = passengerForm[0]?.lastName || "--";
            morePassengers = passengerForm.length > 1 ? ` & more ${passengerForm.length - 1} passenger` : "";

            return `${firstName}${" "}${morePassengers}`;
        } else {
            return "--";
        }
    };

    // useEffect(() => {
    //     dispatch(Passenger_seat(state.booking.selectSeat));
    // }, [dispatch, state.booking.selectSeat]);

    const Passenger_seat = () => {
        const getSeatInfo = (seatType) => {
            const selectedSeat = state.booking.selectSeat?.[seatType];

            if (selectedSeat && selectedSeat.length !== 0) {
                const seat = selectedSeat[0] || "--";
                const morePassengers = selectedSeat.length > 1 ? ` & more ${selectedSeat.length - 1} passenger` : "";
                return `${seat}${morePassengers}`;
            }

            return null;
        };

        const businessSeatInfo = getSeatInfo("Business");
        const economySeatInfo = getSeatInfo("Economy");

        return businessSeatInfo || economySeatInfo || "--";
    };

    const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const renderSeats = (rowNumber, seatCount, className, seatClass, seatIdPrefix) => {
        const seats = [];
        const rowId = `${rowNumber + 1}`;

        for (let i = 0; i < seatCount; i++) {
            const seatId = `Seat ${rowNumber + 1}${seatIdPrefix}${i}`;
            const isDisabled = disabledSeats.includes(seatId);
            const selectedSeats = state.booking.selectSeat[seatClass] || [];
            const isSelected = selectedSeats.includes(seatId);

            seats.push(
                <React.Fragment key={i}>
                    <div className={`${className} ${seatClass} ${isSelected ? `selected${capitalizeFirstLetter(seatClass)}Seat` : isDisabled ? "disabledSeat" : ""}`} onClick={() => !isDisabled && handleSelectSeat(seatId, seatClass)}></div>

                    {i + 1 === (seatCount / 2 || seatCount / 3) ? <div className="row_value">{rowNumber + 1}</div> : null}
                </React.Fragment>
            );
        }

        return <div className={`row_count ${rowId}`}>{seats}</div>;
    };

    const renderBusinessSeats1 = () => {
        const Business_rows = [];

        for (let i = 0; i < Business_Numrows1; i++) {
            Business_rows.push(renderSeats(i, Business_seatCount1, "Business_seat1", "Business", "B(1)"));
        }

        return Business_rows;
    };

    const renderBusinessSeats2 = () => {
        const Business_rows = [];

        for (let i = 0; i < Business_Numrows2; i++) {
            Business_rows.push(renderSeats(i, Business_seatCount2, "Business_seat2", "Business", "B(2)"));
        }

        return Business_rows;
    };

    const renderEconomySeats = (countRow, Economy_Numsrows) => {
        const Economy_rows = [];

        for (let i = 0; i < Economy_Numsrows; i++) {
            Economy_rows.push(renderSeats(countRow + i, Economy_seatCount, "Economy_seat", "Economy", "E"));
        }
        return Economy_rows;
    };

    const handleSelectSeat = (seatId, seatClass) => {
        const selectedSeats = [...state.booking.selectSeat[seatClass]];
        const otherClass = seatClass === "Business" ? "Economy" : "Business";

        if (selectedSeats.length >= state.booking.selectedNoOfTravellers.Totalcount && !selectedSeats.includes(seatId)) {
            alert(`You can only select up to ${state.booking.selectedNoOfTravellers.Totalcount} seats.`);
            return;
        }

        const updatedSelectSeat = {
            ...state.booking.selectSeat,
            [otherClass]: [],
            [seatClass]: selectedSeats.includes(seatId) ? selectedSeats.filter((selectedSeat) => selectedSeat !== seatId) : [...selectedSeats, seatId],
            business_seat: seatClass === "Business" && !selectedSeats.includes(seatId),
            economy_seat: seatClass === "Economy" && !selectedSeats.includes(seatId),
        };
        dispatch(setSelectedUpgradeClass(seatClass));

        dispatch(setSelectSeat(updatedSelectSeat));
        if (state.booking.selectedTravelClass !== "Business" && seatClass === "Business") {
            dispatch(setShowModel(true));
        }
    };
    console.log(state.booking.selectSeat);
    console.log(state.booking.showModel);
    const handleCanelButton = () => {
        const updatedSelectSeat = {
            ...state.booking.selectSeat,
            Business: [],
            business_seat: false,
        };

        dispatch(setSelectSeat(updatedSelectSeat));
        dispatch(setShowModel(false));
    };

    const handleUpgradeButton = () => {
        // dispatch(setSelectedTravelClass(state.booking.selectedTravelClass));
        dispatch(setShowModel(false));
    };

    // business_seat: seatClass === "Business" && !selectedSeats.includes(seatId),

    console.log(state.booking.selectSeat);
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
            </Suspense>
            <section className="Screen_Container font-sans">
                <Container maxWidth="lg">
                    {state.booking.loading ? (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                            <TailSpin visible={true} height="60" width="60" color="#605dec" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" />
                        </div>
                    ) : (
                        <main className="plane_seat_container">
                            <section className="Plane_container">
                                <section className="PlaneImage">
                                    <img src={PlaneImage} alt="PlaneImage" />
                                </section>
                                <section className="PlaneImage_Mobile">
                                    <img src={PlaneImage_Mobile} alt="PlaneImage" />
                                </section>
                                <section className="PlaneImage_Ipad">
                                    <img src={PlaneImage_Ipad} alt="PlaneImage" />
                                </section>
                                <section className="Business_Seat_container">{renderBusinessSeats1()}</section>
                                <section className="Premium_Seat_container">{renderBusinessSeats2()}</section>
                                <section className="Economy_Seat_container_1">{renderEconomySeats(0, Economy_Numrows_container_1)}</section>
                                <section className="Economy_Seat_container_2">{renderEconomySeats(8, Economy_Numrows_container_2)}</section>
                                <section className="Economy_Seat_container_3">{renderEconomySeats(13, Economy_Numrows_container_3)}</section>
                            </section>
                            <section className="Seat_container">
                                <section className="booked_container">
                                    <div className="Departure_Arrival_status_container">
                                        <div>
                                            <div className="departure_airport_name">{state.booking.departureAirport?.iata || "BOM"}</div>
                                            <div className="departure_airport_city">
                                                {state.booking.departureAirport?.city || "Mumbai"}, {state.booking.departureAirport?.country}
                                            </div>
                                        </div>
                                        <div>
                                            <FaArrowRightLong className="direction" />
                                        </div>
                                        <div>
                                            <div className="departure_airport_name">{state.booking.arrivalAirport?.iata || "DEL"}</div>
                                            <div className="departure_airport_city">
                                                {state.booking.arrivalAirport?.city || "New Delhi"}, {state.booking.arrivalAirport?.country}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flight_times_mobile">
                                        <div className="Date_status_container">
                                            <span>{format(state.booking.currentDate, "MMM")} </span>
                                            <span>{format(state.booking.currentDate, "dd ")}</span>
                                            <span>|</span>
                                            <span> {state.booking.flightDetail?.departure || "--"}</span>
                                            <div className="departure_airport_city">Departing</div>
                                        </div>
                                        <div className="Date_status_container">
                                            <span>{format(state.booking.currentDate, "MMM")} </span>
                                            <span>{state.booking.flightDetail?.date}</span>
                                            <span>|</span>
                                            <span> {state.booking.flightDetail?.arrival || "--"}</span>
                                            <div className="departure_airport_city">Arriving</div>
                                        </div>
                                    </div>
                                </section>
                                <section className="seats_info">
                                    <section className="Economy_Seats_container">
                                        <div>
                                            <img src={EconomySeat} className="Seat-size" alt="EconomySeat" />
                                        </div>
                                        <section className="economy_info">
                                            <div className={`className ${state.booking.selectSeat.economy_seat ? "selected_economy" : ""}`}>Economy</div>
                                            <div className="economy_detail">Comfortable seating, meal service, attentive crew for your journey.</div>
                                            <div className="economy_bar_line"></div>
                                            {["Built-in entertainment system", "Complimentary snacks and drinks", "Complimentary snacks and drinks"].map((info, index) => (
                                                <div className="economy_info_list" key={index}>
                                                    <FaCircle className="economy_info_icon" />
                                                    <div key={index} className="economy_info_list_value">
                                                        {info}
                                                    </div>
                                                </div>
                                            ))}
                                        </section>
                                    </section>
                                    <section className="Business_Seats_container">
                                        <div>
                                            <img src={BusinessSeat} className="Seat-size" alt="BusinessSeat" />
                                        </div>
                                        <section className="business_info">
                                            <div className={`className ${state.booking.selectSeat.business_seat ? "selected_business" : ""}`}>Business Class</div>
                                            <div className="business_detail">Rest and recharge during your flight with extended leg room, personalized service, and a multi-course meal service.</div>
                                            <div className="business_bar_line"></div>
                                            {["Extended leg room", "Priority boarding", "Personalized service", "Enhanced food and drink service", "Seats that recline 40% more than economy"].map((info, index) => (
                                                <div className="business_info_list" key={index}>
                                                    <FaCheck className="business_info_icon" />
                                                    <div className="business_info_list_value">{info}</div>
                                                </div>
                                            ))}
                                        </section>
                                    </section>
                                </section>
                                <section className="processed_next">
                                    <div className="passengers_info_N_seat">
                                        <div className="Total_Passenger">
                                            <div className="user_related_label">Total Passenger {passengerCount}</div>
                                            <div className="passenger_name">{Passengers_name()}</div>
                                        </div>
                                        <div className="seat_number">
                                            <div className="user_related_label">Seat number</div>
                                            <div className="Seat_number">{Passenger_seat()}</div>
                                        </div>
                                    </div>
                                    <div className="Payment_button_container">
                                        <NavLink className="Payment_button text-white" to="/Payment">
                                            Payment method
                                        </NavLink>
                                    </div>
                                </section>
                            </section>
                            <section>
                                <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={state.booking.showModel} onHide={handleCanelButton}>
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            <h4 className="Upgrade_label m-0 ">Upgrade Seat</h4>
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p className="upgrade_seat_info m-0">
                                            Upgrade your seat for just ₹5000 and experience the luxury of 45% more legroom. Our upgraded seats also recline 40% more than economy, ensuring a more comfortable and enjoyable journey for you.
                                        </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="outline" onClick={handleCanelButton}>
                                            Close
                                        </Button>
                                        <Button className="text-justify bg-amber-400 hover:bg-amber-300 active:bg-amber-200 upgrade" onClick={handleUpgradeButton}>
                                            Upgrade
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </section>
                        </main>
                    )}
                </Container>
            </section>
        </>
    );
};
export default SelectSeat;

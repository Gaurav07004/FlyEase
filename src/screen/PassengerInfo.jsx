import React, { Suspense, useEffect, useState } from "react";
import "../components/CssFolder/PassengerInfo.css";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa6";
import bags from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/bags.png";
import { Calendar } from "react-calendar";
import { NavLink } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { format } from "date-fns";
import { setSelectedBags, setLoading, setDob, setCalendar, setPassengerForm, setPassengerEmergency, setSaveInfoButton, setPassengerDetailButton } from "../redux/slices/booking/bookingslices.jsx";

const Navbar = React.lazy(() => import("../components/JsxFolder/Navbar.jsx"));
const PaymentBreakdown = React.lazy(() => import("../components/JsxFolder/PaymentBreakdown.jsx"));
const Footer = React.lazy(() => import("../components/JsxFolder/Footer.jsx"));

function PassengerInfo() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const passengerCount = state.booking.selectedNoOfTravellers.Totalcount;
    const [isDateSelected, setIsDateSelected] = useState(false);

    useEffect(() => {
        dispatch(setLoading(true));
        const loadingTimeout = setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
        return () => clearTimeout(loadingTimeout);
    }, [dispatch]);

    useEffect(() => {
        if (state.booking.passengerForm.length !== passengerCount) {
            const passengerForms = Array.from({ length: passengerCount }, (_, index) => createPassengerForm(index + 1));
            dispatch(setPassengerForm(passengerForms));
        }
    }, [dispatch, passengerCount, state.booking.passengerForm.length]);

    const createPassengerForm = (passengerNumber) => {
        return {
            firstName: "",
            middleName: "",
            lastName: "",
            dob: "",
            email: "",
            phoneNumber: "",
            address: "",
            passengerNumber: passengerNumber,
        };
    };

    const handleChange = (e, passengerIndex) => {
        const { name, value } = e.target;
        const updatedPassengerForms = [...state.booking.passengerForm];
        updatedPassengerForms[passengerIndex] = {
            ...updatedPassengerForms[passengerIndex],
            [name]: value,
        };
    };

    console.log("passengers", state.booking.passengerForm.length);

    const handleEmergencyChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            setPassengerEmergency({
                ...state.booking.passengerEmergency,
                [name]: value,
            })
        );
    };

    const HandleChangecount = (count) => {
        const currentCount = state.booking.selectedBags.count;
        let updatedCount = currentCount + count;
        if (updatedCount < 1) {
            return updatedCount;
        } else if (updatedCount > 20) {
            return updatedCount;
        }

        dispatch(
            setSelectedBags({
                ...state.booking.selectedBags,
                count: updatedCount,
            })
        );
    };

    const handleButtonClick = () => {
        dispatch(setPassengerDetailButton(!state.booking.passengerDetailButton));
        dispatch(setSaveInfoButton(!state.booking.saveInfoButton));
    };

    const fieldPlaceholders = {
        firstName: "First Name*",
        lastName: "Last Name*",
        dob: "Date of Birth*",
        middleName: "Middle Name*",
        email: "Email address*",
        phoneNumber: "Phone Number*",
    };


    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
            </Suspense>
            <Container maxWidth="lg">
                {state.booking.loading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        <TailSpin visible={true} height="60" width="60" color="#605dec" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" />
                    </div>
                ) : (
                    <main className="screen_split">
                        <section className="user_container font-sans">
                            <p className=" font-bold tracking-wider text-lg pt-3 text-amber-400 Passenger_info_label">Passenger information</p>
                            <p className="user_related_info">Enter the required information for each traveler and be sure that it exactly matches the government-issued ID presented at the airport.</p>
                            <section className="passenger_info_form">
                                {state.booking.passengerForm.map((passengerForm, index) => (
                                    <div key={index}>
                                        <p className="Passenger_no mt-4">Passenger {passengerForm.passengerNumber}</p>
                                        <div className="Name_info">
                                            {["firstName", "middleName", "lastName", "email", "phoneNumber"].map((field) => (
                                                <input
                                                    key={field}
                                                    type={field === "email" ? "email" : "text"}
                                                    name={field}
                                                    value={state.booking.passengerForm[index][field]}
                                                    onChange={(e) => handleChange(e, index)}
                                                    className="name"
                                                    placeholder={fieldPlaceholders[field] || `${field.charAt(0).toUpperCase()}${field.slice(1)}*`}
                                                />
                                            ))}
                                            <div className="DOB_container" onClick={() => dispatch(setCalendar(!state.booking.showCalendar))}>
                                                <span>
                                                    {isDateSelected ? format(state.booking.dateOfBirth, "dd/MM/yyyy") : "Date of Birth*"}
                                                </span>
                                            </div>
                                            {state.booking.showCalendar && (
                                                <article className="Calendar_Section">
                                                    <Calendar
                                                        value={state.booking.dateOfBirth}
                                                        maxDate={new Date()}
                                                        onChange={(date) => {
                                                            dispatch(setDob(date, index));
                                                            setIsDateSelected(true);
                                                        }}
                                                    />
                                                </article>
                                            )}
                                        </div>
                                        <div className="Another_info">
                                            {["address"].map((field) => (
                                                <input
                                                    key={field}
                                                    type="text"
                                                    name={field}
                                                    value={state.booking.passengerForm[index][field]}
                                                    onChange={(e) => handleChange(e, index)}
                                                    className="otherInfo"
                                                    placeholder={`${field === "address" ? "Residential address" : fieldPlaceholders[field] || `${field.charAt(0).toUpperCase()}${field.slice(1)}*`}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <p className="Passenger_no mt-4">Emergency contact information</p>
                                <div className="Another_info_about_Emergency">
                                    {["firstName", "middleName", "phoneNumber", "email"].map((field) => (
                                        <input
                                            key={field}
                                            type={field === "email" ? "email" : "text"}
                                            name={field}
                                            value={state.booking.passengerEmergency[field]}
                                            onChange={handleEmergencyChange}
                                            className="otherInfo"
                                            placeholder={fieldPlaceholders[field] || `${field.charAt(0).toUpperCase()}${field.slice(1)}*`}
                                        />
                                    ))}
                                </div>
                                <p className="Passenger_no mt-4">Bag information</p>
                                <p className="user_related_info mb-4">
                                    Each passenger is allowed one free carry-on bag and one personal item. The first checked bag for each passenger is also free. Second bag check fees are waived for loyalty program members.
                                </p>
                                <div className="check_bag_info">
                                    <div>
                                        <p className="Passenger_no">Passenger {passengerCount}</p>
                                        <p className="class_name">{state.booking.selectedTravelClass}</p>
                                    </div>
                                    <div>
                                        <p className="Passenger_no">Checked bags</p>
                                        <div className="Check_bags_count">
                                            <FaMinus className="text-amber-500 minus" onClick={() => HandleChangecount(-1)} />
                                            <p className="class_name m-0">{state.booking.selectedBags.count}</p>
                                            <FaPlus className="text-amber-500 plus" onClick={() => HandleChangecount(1)} />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {!state.booking.passengerDetailButton && (
                                <div className="button_save_and_close">
                                    <button className="Save_and_close" onClick={handleButtonClick}>
                                        Save and close
                                    </button>
                                </div>
                            )}
                            {state.booking.passengerDetailButton && (
                                <div className="button_next_to_seat">
                                    <button className="Save_and_close" onClick={handleButtonClick}>
                                        <NavLink className="passenger_info text-white" to="/SelectSeat">
                                            Select Seat
                                        </NavLink>
                                    </button>
                                </div>
                            )}
                        </section>
                        <section className="second_container p-2">
                            <div className="price_container">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <PaymentBreakdown />
                                </Suspense>
                            </div>
                            <div className="bags_info">
                                <img src={bags} className="Bags" alt={bags} />
                            </div>
                        </section>
                    </main>
                )}
            </Container>
            <Suspense fallback={<div>Loading...</div>}>
                <Footer />
            </Suspense>
        </main>
    );
}

export default PassengerInfo;

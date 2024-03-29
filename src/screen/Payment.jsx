import React, { Suspense, useEffect } from "react";
import Container from "@mui/material/Container";
import { Button } from "@/components/ui/button"
import Modal from "react-bootstrap/Modal";
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from "react-redux";
import { FaCreditCard, FaGoogle } from "react-icons/fa6";
import QRcode from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/Paytm_QRcode.png";
import kotak from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/kotak.webp";
import "../components/CssFolder/Payment.css";
import { setPaymentMethod, setLoading, setOfferContainer, setCardDetail, setCardError } from "../redux/slices/booking/bookingslices.jsx";
import { TailSpin } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";
import FareTypeData from "../components/JsonFolder/FareTypeData.json";

const Navbar = React.lazy(() => import("../components/JsxFolder/Navbar.jsx"));
const PaymentBreakdown = React.lazy(() => import("../components/JsxFolder/PaymentBreakdown.jsx"));
const Footer = React.lazy(() => import("../components/JsxFolder/Footer.jsx"));

function Payment() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setLoading(true));

        const loadingTimeout = setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, [dispatch]);

    const handlePaymentMethod = (Method) => {
        dispatch(setPaymentMethod(Method));
    };

    const handleOffer = () => {
        dispatch(setOfferContainer(!state.booking.offerContainer));
    };

    const handleCardDetail = (e) => {
        const { name, value } = e.target;

        const formatCardNumber = (input) => {
            return input
                .replace(/\D/g, "")
                .substr(0, 16)
                .replace(/(\d{4})/g, "$1 ")
                .trim();
        };

        const formatCardName = (input) => {
            return input.replace(/[^A-Za-z ]/g, "").substr(0, 20);
        };

        const formatExpireDate = (input) => {
            return input
                .replace(/\D/g, "")
                .substr(0, 4)
                .replace(/(\d{2})(\d{2})/, "$1/$2")
                .trim();
        };

        const formatCCV = (input) => {
            return input.replace(/\D/g, "").substr(0, 3);
        };

        const formatters = {
            cardNumber: formatCardNumber,
            cardName: formatCardName,
            expiredate: formatExpireDate,
            ccv: formatCCV,
        };

        dispatch(
            setCardDetail({
                ...state.booking.cardDetail,
                [name]: formatters[name] ? formatters[name](value) : value,
            })
        );

        dispatch(
            setCardError({
                ...state.booking.cardError,
                [name]: "",
            })
        );
    };

    const handleSubmit = () => {
        const newErrors = {};
        const { cardDetail } = state.booking;

        const validateAlphabets = (field) => {
            if (!cardDetail[field]) {
                newErrors[field] = `Please Provide the Cardholder Name`;
            } else if (cardDetail[field].length <= 10) {
                newErrors[field] = `Please Provide the Full Cardholder Name`;
            }
        };

        const validateNumeric = (field, fieldName, length) => {
            if (!cardDetail[field]) {
                newErrors[field] = `Please Provide the ${fieldName}`;
            } else if (cardDetail[field].length !== length) {
                newErrors[field] = `Please Provide the Correct ${fieldName}`;
            }
        };

        validateAlphabets("cardName", "Name on card");
        validateNumeric("cardNumber", "Card number", 19);
        validateNumeric("expiredate", "Expiration date", 5);
        validateNumeric("ccv", "CCV", 3);

        dispatch(setCardError(newErrors));

        if (Object.keys(newErrors).length === 0) {
            navigate("/ConfirmBooking");
        }
    };

    const fieldPlaceholders = {
        cardName: "Name on card",
        cardNumber: "Card number",
        expiredate: "Expiration date",
        ccv: "CCV",
    };
    
    const cancel_model = () => {
        return (
            <section>
                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={state.booking.offerContainer} onClose={handleOffer}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter"><h4 className="Upgrade_label pb-0">Cancellation Policy</h4></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pb-0">
                        {FareTypeData.Cancellation_condition.map((condition, index) => (
                            <div key={index} className="Offer">
                                <div className="cancel_points pt-1 pb-1">{condition.OfferName}</div>
                                <div className="cancel_point_detail">{condition.OfferDetail}</div>
                            </div>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="text-justify bg-amber-400 hover:bg-amber-300 active:bg-amber-200 upgrade" onClick={handleOffer}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </section>
        )
    }

    //console.log("card", state.booking.cardDetail);
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
                        <section className="user_container font-sans p-2">
                            {Object.keys(state.booking.cardError).length !== 0 && (
                                <Alert variant="danger" >
                                <Alert.Heading className="warning_label">Warning!</Alert.Heading>
                                <p className="warning_message m-0">
                                    Please ensure that the credit card information is accurate and complete. Double-check the details entered, including the card number, name on the card, expiration date, and CCV.
                                </p>
                                </Alert>
                            )}
                            <p className=" font-bold tracking-wider text-lg text-amber-400 payment_label">Payment method</p>
                            <p className="user_related_info">Select a payment method below. FlyEase processes your payment securely with end-to-end encryption.</p>
                            <section className="Payment_tabs">
                                {["Credit Card","Google Pay"].map((Method, index) => (
                                    <button key={index} className={`Payment_method ${state.booking.paymentMethod === Method ? "Active_method" : ""}`} onClick={() => handlePaymentMethod(Method)}>
                                        {Method === "Google Pay" ? <FaGoogle /> : <FaCreditCard />}
                                        {Method}
                                    </button>
                                ))}
                            </section>
                            <section className={`Payment_detail`}>
                                <div className="label_name">{state.booking.paymentMethod} details</div>
                                <section className={`Input_section ${state.booking.paymentMethod === "Credit Card" ? "" : "disable"}`}>
                                    <div className="Payment_info">
                                        <section className={`Input_section ${state.booking.paymentMethod === "Credit Card" ? "" : "disable"}`}>
                                            <div className="Payment_info">
                                                {["cardName", "cardNumber"].map((field) => (
                                                    <>
                                                        <input
                                                            key={field}
                                                            type="text"
                                                            name={field}
                                                            value={state.booking.cardDetail[field]}
                                                            onChange={handleCardDetail}
                                                            autoComplete="off"
                                                            className={`name ${state.booking.cardError[field] ? "error" : ""} mb-4`}
                                                            placeholder={fieldPlaceholders[field] || `${field.charAt(0).toUpperCase()}${field.slice(1)}*`}
                                                        />
                                                    </>
                                                ))}
                                            </div>
                                            <div className="private_info">
                                                {["expiredate", "ccv"].map((field) => (
                                                    <>
                                                        <input
                                                            key={field}
                                                            type={field}
                                                            name={field}
                                                            autoComplete="off"
                                                            value={state.booking.cardDetail[field]}
                                                            onChange={handleCardDetail}
                                                            className={`name ${state.booking.cardError[field] ? "error" : ""} mb-4`}
                                                            placeholder={fieldPlaceholders[field] || `${field.charAt(0).toUpperCase()}${field.slice(1)}*`}
                                                        />
                                                    </>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </section>
                                <section className={`Input_section ${state.booking.paymentMethod === "Credit Card" ? "disable" : ""}`}>
                                    <Alert variant="danger" >
                                        <Alert.Heading className="warning_label">Warning!</Alert.Heading>
                                        <p className="warning_message m-0">
                                            Apologies for the inconvenience, our Scan n Pay server is temporarily unavailable; please use credit card details for transactions.
                                        </p>
                                    </Alert>
                                    <div className="Bank_detail">
                                        <div className="Icon_container">
                                            <img src={kotak} className="Icon" alt="kotak" />
                                        </div>
                                        <div>
                                            <div className="label_name pt-1 pb-1">Kotak Mahindra bank 8388</div>
                                        </div>
                                    </div>
                                    <div className="QRcode">
                                        <img src={QRcode} alt="QRcode" />
                                    </div>
                                    <div className="Gpay_info ">Scan to pay with any UPI app</div>
                                </section>
                            </section>
                            <section className="Cancellation_Policy">
                                <div className="label_name">Cancellation policy</div>
                                <p className="user_related_info">
                                    This flight has a flexible cancellation policy. If you cancel or change your flight up to 30 days before the departure date, you are eligible for a free refund. All flights booked on FlyEase are backed by
                                    our satisfaction guarantee, however cancellation policies vary by airline. See the full{" "}
                                    <b onClick={() => { handleOffer()}} className="text-amber-400 cursor-pointer">
                                        cancellation policy
                                    </b>{" "}
                                    for this flight.
                                </p>
                            </section>
                            <section>{cancel_model()}</section>
                            <NavLink className="Back_to_Seat" to="/SelectSeat">
                                Back to Seat
                            </NavLink>
                            <button className="Confirm_And_Pay" type="button" onClick={handleSubmit}>
                                Confirm and Pay
                            </button>
                        </section>
                        <section className="second_container p-2">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <PaymentBreakdown />
                                </Suspense>
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

export default Payment;

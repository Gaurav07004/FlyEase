import { useRef, useEffect } from "react";
import signIn from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/book.png";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { CiLock, CiMail, CiUnlock } from "react-icons/ci";
//import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import { Button, Modal } from "keep-react";
import { Button } from "@/components/ui/button";
//import { Key } from "phosphor-react";
import "../CssFolder/SignIn.css";
import { setConditionCheck, setShowPasswordModal, setShowPassword, setLoading, setPassengerLogin } from "../../redux/slices/booking/bookingslices.jsx";
import { NavLink, useNavigate } from "react-router-dom";
//import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import Countdown from "react-countdown";

function SignUp() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const sliderRef = useRef();

    const handleCondition = () => {
        dispatch(setConditionCheck(!state.booking.conditionCheck));
    };

    const handleShowPassword = () => {
        dispatch(setShowPassword("text"));
    };

    const handleHidePassword = () => {
        dispatch(setShowPassword("password"));
    };

    const cancelModal = () => {
        dispatch(setShowPasswordModal(!state.booking.showPasswordModal));
    };

    // const settings = {
    //     dots: false,
    //     infinite: false,
    //     speed: 400,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     lazyLoad: true,
    // };

    // const OTP = () => {
    //     const inputs = Array.from({ length: 6 }, (_, index) => (
    //         <input
    //             key={index}
    //             className="OTP_field text-center text-2xl rounded-lg m-0"
    //             type="text"
    //             maxLength={1}
    //         />
    //     ));

    //     return (
    //         <>
    //             <div className="flex justify-between mt-11 OTP_container">
    //                 {inputs}
    //             </div>
    //             <Countdown className="float-right mt-6 text-metal-500 text-center text-base timer" date={Date.now() + 2 * 60 * 1000} />
    //         </>
    //     );
    // };

    // const forgetPassword = () => {
    //     return (
    //         <Modal icon={<Key size={28} color="#f8467a" />} size="md" show={state.booking.showPasswordModal} onClose={cancelModal} className="Modal">
    //             <Slider ref={sliderRef} {...settings}>
    //                 {[
    //                     { forget_label: "Forget Password", heading: "We will send reset instructions to you without any concerns." },
    //                     { forget_label: "Check your email", heading: "We sent a one-time password (OTP) to gauravsingh07004@gmail.com." },
    //                     { forget_label: "Set new password", heading: "Your new password must be different to previously used password." },
    //                     { forget_label: "Password reset", heading: "Your password has been successfully reset." },
    //                 ].map((modalInfo, index) => (
    //                     <div key={index}>
    //                         <Modal.Header className="text-center forget_label">{modalInfo.forget_label}</Modal.Header>
    //                         <Modal.Body className="forget_body">
    //                             <p className="text-metal-500 text-center">{modalInfo.heading}</p>
    //                             <div className="input-with-icon">
    //                                 {modalInfo.forget_label === "Forget Password" && (
    //                                     <>
    //                                     <CiMail className="icon mt-0" />
    //                                     <input className="forget_Password_field rounded-lg" type="email" placeholder="Enter your email address" />
    //                                     </>
    //                                 )}
    //                                 {modalInfo.forget_label === "Check your email" && <OTP />}
    //                                 {modalInfo.forget_label === "Set new password" && (
    //                                     <>
    //                                     {state.booking.showPassword === "password" ? <CiLock className="icon" onClick={handleShowPassword} /> : <CiUnlock className="icon" onClick={handleHidePassword} />}
    //                                     <input className="forget_Password_field rounded-lg" type={state.booking.showPassword} placeholder="New Password" />
    //                                     </>
    //                                 )}
    //                                 {modalInfo.forget_label === "Password reset" && (
    //                                     <IoIosCheckmarkCircleOutline className="checkMark text-green-500" />
    //                                 )}
    //                                 </div>
    //                         </Modal.Body>
    //                         <Modal.Footer className="Reset_button_container">
    //                             {modalInfo.forget_label !== "Forget Password" ? (
    //                                 <Button type="outlineGray" onClick={() => sliderRef.current.slickPrev()} className="w-1/2 back">
    //                                     Back
    //                                 </Button>
    //                             ) : (
    //                                 ""
    //                             )}
    //                             <Button type="primary" onClick={() => sliderRef.current.slickNext()} className="text-justify Reset_button py-0 px-0">
    //                                 Reset Password
    //                             </Button>
    //                         </Modal.Footer>
    //                     </div>
    //                 ))}
    //             </Slider>
    //         </Modal>
    //     );
    // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            setPassengerLogin({
                ...state.booking.passengerLogin,
                [name]: value,
            })
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(state.booking.passengerLogin),
            });

            if (response.ok) {
                alert("Login Successfully!");
                navigate("/")
            } else {
                alert("Invalid Credentials");
                console.log("Invalid Credentials");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    console.log(state.booking.passengerLogin)

    useEffect(() => {
        dispatch(setLoading(true));

        const loadingTimeout = setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, [dispatch]);
    return (
        <main className="SignIn_container">
            <Container maxWidth="lg">
                {state.booking.loading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", marginTop: "-5%" }}>
                        <TailSpin visible={true} height="60" width="60" color="#605dec" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" />
                    </div>
                ) : (
                    <main className="SignIn_modal">
                        <section className="signIn_image_container">
                            <img src={signIn} alt="signIn" className="Image_signIn" />
                        </section>
                        <section className="signIn_form_container">
                            <h1 className="font-bold text-3xl" style={{ color: "#f8467a" }}>
                                Sign In
                            </h1>
                            <p className="text-zinc-400 text-sm font-semibold m-0 ">
                                Not a member?{" "}
                                <NavLink className="text-orange-500 cursor-pointer no-underline" to="/SignUp">
                                    Sign up
                                </NavLink>
                            </p>
                            <div className="plugin_desktop">
                                <Button variant="outline" className="Button">
                                    <FcGoogle className="text-2xl plugin_icon" /> <span className="ml-1 plugin_type">login with Google</span>
                                </Button>
                                <Button variant="outline" className="Button">
                                    <FaFacebook className="text-2xl plugin_icon text-blue-500" /> <span className="ml-1 plugin_type">login with Facebook</span>
                                </Button>
                            </div>
                            <div className="plugin_Mobile">
                                <Button variant="outline" className="Button">
                                    <FcGoogle className="text-2xl plugin_icon" />
                                    <span className="ml-1 plugin_type">Google</span>
                                </Button>
                                <Button variant="outline" className="Button">
                                    <FaFacebook className="text-2xl plugin_icon text-blue-500" /> <span className="ml-1 plugin_type">Facebook</span>
                                </Button>
                            </div>
                            <p className="font-semibold text-zinc-500 text-sm text-center -ml-4 Separate1">OR</p>
                            <form className="signin-form" onSubmit={handleSubmit}>
                                <div className="input-with-icon">
                                    <CiMail className="icon" />
                                    <input className="user_field" type="text" name="email" placeholder="Email or Phone Number" required autoComplete="off" value={state.booking.passengerLogin.email} onChange={handleInputChange} />
                                </div>
                                <div className="input-with-icon flex items-center">
                                    {state.booking.showPassword === "password" ? <CiLock className="icon" onClick={handleShowPassword} /> : <CiUnlock className="icon" onClick={handleHidePassword} />}
                                    <input className="user_field" type={state.booking.showPassword} name="password" placeholder="Password" required autoComplete="off" value={state.booking.passengerLogin.password} onChange={handleInputChange} />
                                </div>
                                <div className="flex text-center justify-between ">
                                    <p className={`text-zinc-400 text-sm condition1 ${state.booking.conditionCheck ? "activeItem" : ""}`} onClick={handleCondition}>
                                        Remember me
                                    </p>
                                    <p className="text-zinc-400 text-sm forget_Password cursor-pointer " onClick={cancelModal}>
                                        Forget password ?
                                    </p>
                                </div>
                                <Button className="Sign_In_Button bg-inherit py-4">Sign In</Button>
                            </form>
                            {/* <section>{forgetPassword()}</section> */}
                        </section>
                    </main>
                )}
            </Container>
        </main>
    );
}

export default SignUp;

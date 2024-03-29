import { useEffect } from "react";
import signUp from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/signUp_1.png";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import "../CssFolder/SignUp.css";
import { TailSpin } from "react-loader-spinner";
import { setConditionCheck, setLoading, setPassengerRegistration } from "../../redux/slices/booking/bookingslices.jsx";
import { NavLink, useNavigate } from "react-router-dom";


function SignUp() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCondition = () => {
        dispatch(setConditionCheck(!state.booking.conditionCheck));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            setPassengerRegistration({
                ...state.booking.passengerRegistration,
                [name]: value,
            })
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(state.booking.passengerRegistration),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || "Something went wrong");
            }

            const data = await response.json();
            console.log("Response data:", data);
            alert("Register Successfully!");

            navigate("/");
        } catch (error) {
            console.error("Error:", error.message);
        }
    };



    console.log(state.booking.passengerRegistration);

    useEffect(() => {
        dispatch(setLoading(true));

        const loadingTimeout = setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, [dispatch]);

    return (
        <main className="SignUp_container ">
            <Container maxWidth="lg">
                {state.booking.loading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", marginTop: "-5%" }}>
                        <TailSpin visible={true} height="60" width="60" color="#605dec" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="" />
                    </div>
                ) : (
                    <main className="SignUp_modal">
                        <section className="signUp_image_container">
                            <img src={signUp} alt="signUp" className="Image" />
                        </section>
                        <section className="signUp_form_container">
                            <h1 className="font-bold text-amber-400 text-3xl header">Sign Up</h1>
                            <p className="text-zinc-400 text-sm font-semibold m-0">
                                Already a member?{" "}
                                <NavLink className="text-orange-500 cursor-pointer no-underline" to="/SignIn">
                                    Sign in
                                </NavLink>
                            </p>
                            <div className="plugin_desktop">
                                <Button variant="outline" className="Button py-4">
                                    <FcGoogle className="text-2xl plugin_icon" /> <span className="ml-1 plugin_type">Sign up with Google</span>
                                </Button>
                                <Button variant="outline" className="Button py-4">
                                    <FaFacebook className="text-2xl plugin_icon text-blue-500" /> <span className="ml-1 plugin_type">Sign up with Facebook</span>
                                </Button>
                            </div>
                            <div className="plugin_Mobile">
                                <Button variant="outline" className="Button">
                                    <FcGoogle className="text-2xl plugin_icon" /><span className="ml-1 plugin_type">Google</span>
                                </Button>
                                <Button variant="outline" className="Button">
                                    <FaFacebook className="text-2xl text-blue-500" /> <span className="ml-1 plugin_type">Facebook</span>
                                </Button>
                            </div>
                            <p className="font-semibold text-zinc-500 text-sm text-center Separate">OR</p>
                            <form className="signup-form" onSubmit={handleSubmit}>
                                <div className="input-with-icon">
                                    <CiUser className="icon" />
                                    <input className="user_field" type="text" name="username" placeholder="Full Name" required autoComplete="off" value={state.booking.passengerRegistration.username} onChange={handleInputChange} />
                                </div>
                                <div className="input-with-icon">
                                    <CiMail className="icon" />
                                    <input className="user_field" type="text" name="email" placeholder="Email or Phone Number" required autoComplete="off" value={state.booking.passengerRegistration.email} onChange={handleInputChange} />
                                </div>
                                <div className="input-with-icon">
                                    <CiLock className="icon" />
                                    <input className="password_field" type="password" name="password" placeholder="Password" required autoComplete="off" value={state.booking.passengerRegistration.password} onChange={handleInputChange} />
                                </div>
                                <label htmlFor="check1" className={`text-zinc-400 text-sm condition ${state.booking.conditionCheck ? "activeItem" : ""}`} onClick={handleCondition}>
                                    I agree to the <span className="terms-and-conditions">terms and conditions</span>
                                </label>
                                {/* <Button size="md" type="submit" className="create_Account bg-amber-400 hover:bg-amber-300 active:bg-amber-200 py-2 text-white">
                                    Create Account
                                </Button> */}
                                <Button className="create_Account py-4  bg-amber-400 hover:bg-amber-300 active:bg-amber-200 text-white">Create Account</Button>
                            </form>
                        </section>
                    </main>
                )}
            </Container>
        </main>
    );
}

export default SignUp;

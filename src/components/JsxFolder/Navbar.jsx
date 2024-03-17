import { Link as ScrollLink } from "react-scroll";
import signUp from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/signUp_1.png";
import NewLogo from "D:/Development/Web-development/ReactJs/flyease/client/src/assets/NewLogo.png";
import "../CssFolder/Navbar.css";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FiUser, FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { RiCustomerService2Fill, RiDashboardLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { LuSendToBack } from "react-icons/lu";
import { BsSuitcase2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setShowProfileModal, setShowSideNavbar } from "../../redux/slices/booking/bookingslices.jsx";

function Navbar() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const handleOpenModal = () => {
        dispatch(setShowProfileModal(!state.booking.showProfileModal));
    };

    const handleSideNavbar = () => {
        dispatch(setShowSideNavbar(!state.booking.showSideNavbar));
    };

    return (
        <>
            <nav className={`navbar`}>
                <div>
                    <NavLink to="/" className="logo">
                        <img src={NewLogo} alt="logo" className="w-36 h-auto"/>
                    </NavLink>
                </div>
                <div className="menu">
                    <ul>
                        <li>
                            <ScrollLink to="home" spy={true} smooth={true} duration={250}>
                                <NavLink to="/">Home</NavLink>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="AboutUs" spy={true} smooth={true} duration={250}>
                                <NavLink to="/">About Us</NavLink>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="Service" spy={true} smooth={true} duration={250}>
                                <NavLink to="/">Service</NavLink>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="contact" spy={true} smooth={true} duration={250}>
                                <NavLink to="/">Contact</NavLink>
                            </ScrollLink>
                        </li>
                    </ul>
                    {/* <Avatar shape="circle" className="Profile_Image" size="lg" img={signUp} onClick={handleOpenModal} /> */}
                    <Avatar onClick={handleOpenModal} className="Profile_Image">
                        <AvatarImage src={signUp} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="Hamburger">
                    <div className="Hamburger_icon" onClick={handleSideNavbar}>
                        <GiHamburgerMenu />
                    </div>
                    {state.booking.showSideNavbar && (
                        <div className="Hamburger_menu">
                            <div className="Profile_status">
                                <Avatar onClick={handleOpenModal} className="Profile_Image">
                                    <AvatarImage src={signUp} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <div className="User_name">Gaurav Singh</div>
                                    <div className="User_status">gauravsingh07004@gmail.com</div>
                                </div>
                                <div className={`text-2xl text-amber-400 close`} onClick={handleSideNavbar}><IoClose/></div>
                            </div>
                            <div className="mt-4">
                                <div className="hover:bg-amber-100 rounded-lg">
                                    <ScrollLink to="home" spy={true} smooth={true} duration={250} className="flex gap-4 items-center sidebar_menu">
                                        <RxDashboard className="text-2xl" />
                                        <NavLink to="/" className="no-underline text-metal-600">Dashboard</NavLink>
                                    </ScrollLink>
                                </div>
                                <div className="hover:bg-amber-100 rounded-lg">
                                    <ScrollLink to="AboutUs" spy={true} smooth={true} duration={250} className="flex gap-4 items-center sidebar_menu">
                                        <RiDashboardLine className="text-2xl" />
                                        <NavLink to="/" className="no-underline text-metal-600">About Us</NavLink>
                                    </ScrollLink>
                                </div>
                                <div className="hover:bg-amber-100 rounded-lg">
                                    <ScrollLink to="Service" spy={true} smooth={true} duration={250} className="flex gap-4 items-center sidebar_menu">
                                        <LuSendToBack className="text-2xl" />
                                        <NavLink to="/" className="no-underline text-metal-600">Service</NavLink>
                                    </ScrollLink>
                                </div>
                                <div className="hover:bg-amber-100 rounded-lg">
                                    <ScrollLink to="contact" spy={true} smooth={true} duration={250} className="flex gap-4 items-center sidebar_menu">
                                        <RiCustomerService2Fill className="text-2xl"  />
                                        <NavLink to="/" className="no-underline text-metal-600">Contact</NavLink>
                                    </ScrollLink>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
            {state.booking.showProfileModal && (
                <div className="Profile_slider">
                    <p className="text-xs text-zinc-700">You are viewing your personal profile gauravsingh07004@gmail.com</p>
                    {[
                        { Icon: <FiUser />, title: "My Profile", description: "Manage your profile, traveller details, login details and password.", swtich: "Profile" },
                        { Icon: <BsSuitcase2 />, title: "My Trips", description: "See booking details, Print e-ticket, Cancel Booking, Check Refund Status & more.", swtich: "MyTrips" },
                        { Icon: <FiLogOut />, title: "Log Out", description: "Click here to log out of your account.", swtich: "SignIn" },
                    ].map((level, index) => (
                        <NavLink className="profile_section" key={index} to={`/${level.swtich}`}>
                            <div className="text-2xl mt-1 text-zinc-500">{level.Icon}</div>
                            <div className="navLinkContent">
                                <p className="mb-1 text-black font-semibold text-lg">{level.title}</p>
                                <p className="mb-1 text-zinc-500 text-xs">{level.description}</p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            )}
        </>
    );
}

export default Navbar;

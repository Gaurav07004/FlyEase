import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
//import AirplaneAnimation from "../assets/AirplaneAnimation.gif"
import "../CssFolder/Flight.css";
import { setDepartureAirlineResult, setDepartureLogoResult, setDepartureFlight, setDepartureAirline, setFlightDetail, fetchAirlineData } from "../../redux/slices/booking/bookingslices.jsx";

const Flight = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    //     const fetchAirlineData = useCallback(async () => {
    //         try {
    //             const airlineResponse = await fetch(`https://airlabs.co/api/v9/routes?dep_iata=${departureAirport.iata}&arr_iata=${arrivalAirport.iata}&api_key=7eca91c2-3cd2-4cf1-b3e1-823f570f56f8`);

    //             if (!airlineResponse.ok) {
    //                 console.error(`HTTP error! Status: ${airlineResponse.status}, Response:`, await airlineResponse.text());
    //                 throw new Error(`HTTP error! Status: ${airlineResponse.status}`);
    //             }

    //             const airlineJson = await airlineResponse.json();
    //             const airlineData = airlineJson.response || [];

    //             // Extract unique airline IATA codes
    //             const uniqueAirlineIATAs = Array.from(new Set(airlineData.map((airline) => airline.airline_iata)));

    //             // Fetch airline logos concurrently
    //             const logoPromises = uniqueAirlineIATAs.map((iata) =>
    //                 fetch(`https://api.api-ninjas.com/v1/airlines?iata=${iata}`, {
    //                     headers: { "X-Api-Key": API_KEY },
    //                 })
    //                     .then((response) => {
    //                         if (!response.ok) {
    //                             console.error(`HTTP error! Status: ${response.status}, Response:`, response.text());
    //                             throw new Error(`HTTP error! Status: ${response.status}`);
    //                         }
    //                         return response.json();
    //                     })
    //                     .then((json) => json.filter((airlinelogo) => airlinelogo && airlinelogo.iata)[0])
    //                     .catch((error) => {
    //                         console.error("Error fetching airport data:", error);
    //                         return null;
    //                     })
    //             );

    //             const logoResults = await Promise.allSettled(logoPromises);
    //             const successfulLogos = logoResults.filter((result) => result.status === "fulfilled").map((result) => result.value);

    //             dispatch(setDepartureAirlineResult(airlineData));
    //             dispatch(setDepartureLogoResult(successfulLogos));
    //         } catch (error) {
    //             console.error("Error fetching airline data:", error);
    //         }
    //     }, [departureAirport, arrivalAirport, dispatch]);

    //       useEffect(() => {
    //     fetchAirlineData();
    //   }, [fetchAirlineData]);

//    const fetch_Airline_Data = useCallback(async () => {
//         try {
//             let departureIata = state.booking.departureAirport?.iata || "BOM";
//             let arrivalIata = state.booking.arrivalAirport?.iata || "DEL";
//             const airlineAction = await dispatch(fetchAirlineData({
//                 input_1: departureIata,
//                 input_2: arrivalIata,
//                 selected_Date: state.booking.currentDate
//             }));
//             console.log("departureIata",departureIata, "arrivalIata",arrivalIata)
//             console.log("departureIata2",state.booking.departureAirport?.iata, "arrivalIata2",state.booking.arrivalAirport?.iata)
//             const { filteredAirlineData, logoPromises } = airlineAction.payload;

//             const resolvedLogos = await Promise.all(logoPromises);

//             dispatch(setDepartureAirlineResult(filteredAirlineData));
//             dispatch(setDepartureLogoResult(resolvedLogos));
//         } catch (error) {
//             console.error("Error fetching airline data:", error);
//         }
//     }, [state.booking.departureAirport?.iata, state.booking.arrivalAirport?.iata, state.booking.currentDate, dispatch]);
const fetch_Airline_Data = useCallback(async () => {
    try {
        let departureIata = state.booking.departureAirport.length > 0 ? state.booking.departureAirport[0].iata : "BOM";
        let arrivalIata = state.booking.arrivalAirport.length > 0 ? state.booking.arrivalAirport[0].iata : "DEL";

        const airlineAction = await dispatch(fetchAirlineData({
            input_1: departureIata,
            input_2: arrivalIata,
            selected_Date: state.booking.currentDate
        }));

        console.log("departureIata", departureIata, "arrivalIata", arrivalIata);
        console.log("departureIata2", state.booking.departureAirport.length > 0 ? state.booking.departureAirport[0].iata : null, "arrivalIata2", state.booking.arrivalAirport.length > 0 ? state.booking.arrivalAirport[0].iata : null);

        const { filteredAirlineData, logoPromises } = airlineAction.payload;

        const resolvedLogos = await Promise.all(logoPromises);

        dispatch(setDepartureAirlineResult(filteredAirlineData));
        dispatch(setDepartureLogoResult(resolvedLogos));
    } catch (error) {
        console.error("Error fetching airline data:", error);
    }
}, [state.booking.departureAirport, state.booking.arrivalAirport, state.booking.currentDate, dispatch]);
    useEffect(() => {
        fetch_Airline_Data();
    }, [fetch_Airline_Data]);

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":");
        const period = hours >= 12 ? "PM" : "AM";

        return `${hours}:${minutes} ${period}`;
    };

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const formattedHours = hours < 10 ? `0${hours}h` : `${hours}h`;
        const formattedMinutes = minutes < 10 ? `0${minutes}m` : `${minutes}m`;

        return `${formattedHours} ${formattedMinutes}`;
    };

    const price = (duration, Dept_timezone, Arr_timezone) => {
        let price = 0;

        if (duration >= 600 && Dept_timezone !== Arr_timezone) {
            price = Math.floor(Math.random() * (80000 - 5000 + 1)) + 5000;
        } else if (duration > 120 && Dept_timezone !== Arr_timezone) {
            price = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
        } else if (duration <= 120 && Dept_timezone !== Arr_timezone) {
            price = Math.floor(Math.random() * (8000 - 5000 + 1)) + 5000;
        } else if (Dept_timezone === Arr_timezone && duration >= 120) {
            price = Math.floor(Math.random() * (8000 - 5000 + 1)) + 5000;
        } else if (duration <= 180 && Dept_timezone === Arr_timezone) {
            price = Math.floor(Math.random() * (8000 - 5000 + 1)) + 5000;
        } else {
            price = Math.floor(Math.random() * (80000 - 5000 + 1)) + 5000;
        }
        return price;
    };

    
    const Subprice = (price, Taxes) => {
        let Subprice = 0;
        Subprice = price - Taxes;
        
        return Subprice;
    };

    const taxes = () => {
        let Taxes = 1057;
        // Taxes += Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
        return Taxes;
    };

    const stop = (country) => {
        let stop;

        if (country >= 150) stop = "1 Stop";
        else stop = "Non Stop";
        return stop;
    };
    const getOrdinalSuffix = (date) => {
    if (date >= 11 && date <= 13) {
        return 'th';
    }

    switch (date % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};

const date_value = (Dept_country, Arr_country) => {
    let date = state.booking.currentDate.getDate();

    if (Dept_country !== Arr_country) {
        date += 1;
    }

    const suffix = getOrdinalSuffix(date);

    const formattedDate = `${date}${suffix}`;

    return formattedDate;
};

    const handleFlightClick = (airline, airlinelogo) => {
        const calculatedPrice = price(airline.duration, state.booking.departureAirport.country, state.booking.arrivalAirport.country);
        const calculatedTaxes = taxes();
        const calculatedSubPrice = Subprice(calculatedPrice, calculatedTaxes);
        const formattedDuration = toHoursAndMinutes(airline.duration);
        const formattedDepartureTime = formatTime(airline.dep_time);
        const formattedArrivalTime = formatTime(airline.arr_time);
        const calculatedStop = stop(airline.duration);
        const calculatedDate = date_value( state.booking.departureAirport.country, state.booking.arrivalAirport.country);

        dispatch(
            setFlightDetail({
                date: calculatedDate,
                price: calculatedPrice,
                Subprice: calculatedSubPrice,
                Taxes: calculatedTaxes,
                departure: formattedDepartureTime,
                arrival: formattedArrivalTime,
                stop: calculatedStop,
                time: formattedDuration,
            })
        );
        dispatch(setDepartureAirline(airlinelogo));
        dispatch(setDepartureFlight(airline));
    };

    // useEffect(() => {
    //     dispatch(setFlightLoading(true));

    //     const loadingTimeout = setTimeout(() => {
    //         dispatch(setFlightLoading(false));
    //     }, 3000);

    //     return () => clearTimeout(loadingTimeout);
    // }, [dispatch]);
    // console.log("date", flightDetail.date);
    // console.log("Flight", departureFlight);
    // console.log("Airline", flightHours);
    return (
        <main className="flightpanel font-sans">
            <p className="text-zinc-600 font-bold tracking-wider text-sl m-2 pt-6 pr-8 pb-0 pl-2">
                Choose a <span className="text-amber-400">Departing</span> Flight
            </p>
            <section className="flightDeal">
                
                    {state.booking.departureAirlineResult.map((airline) => (
                        <React.Fragment key={airline.airline_iata}>
                            {state.booking.departureLogoResult.map(
                                (airlinelogo) =>
                                    airlinelogo.logo_url &&
                                    airlinelogo.iata === airline.airline_iata && (
                                        <div className="Departure_info" key={airlinelogo.iata} onClick={() => handleFlightClick(airline, airlinelogo)}>
                                            <div>
                                                <img src={airlinelogo.logo_url} alt="logo" className="airlinelogo" />
                                            </div>
                                            <div className="airlineInfo">
                                                <div className="duration">{toHoursAndMinutes(airline.duration)}</div>
                                                <div className="Departure_airline">{airlinelogo.name}</div>
                                            </div>
                                            <div className="Departure_arrival_time">
                                                {formatTime(airline.dep_time)} - {formatTime(airline.arr_time)}
                                            </div>
                                                <div className="stopInfo">{stop(airline.duration)}</div>
                                            <div className="Departure_price">₹ {price(airline.duration, state.booking.departureAirport.country, state.booking.arrivalAirport.country)}</div>
                                        </div>
                                    )
                            )}
                        </React.Fragment>
                    ))}
            
            </section>
        </main>
    );
};

export default Flight;

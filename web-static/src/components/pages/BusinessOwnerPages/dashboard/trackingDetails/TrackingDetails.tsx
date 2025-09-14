import {faUser } from "@fortawesome/free-regular-svg-icons";
import { faGift, faLocation, faLocationArrow, faLocationCrosshairs, faLocationPin, faLocationPinLock, faMapLocation, faMapMarker, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation} from "react-router-dom";


export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-4 flex flex-col gap-4 bg-white rounded-lg shadow-md mt-4">
            {children}
        </div>

    )
}

export default function TrackingDetails() {
  const location = useLocation();
  const trackingData = location.state.state.state;
  const productName = trackingData.product_name.split(',')
  console.log(trackingData)

  return (
    <div className="p-4">
      <Container>
        <section>
            <h1 className="text-2xl font-bold mb-0">Tracking Details</h1>
            <p className="ml-5">Manage tracking assignment and delivery status</p>
        </section>
      </Container>  
      <Container>
        <section>
            <div className="flex gap-4">
                <div className="w-1/2 p-4">
                    <h2 className="text-xl font-bold mb-2">{trackingData.parcel_number}</h2>

                    <p>Customer</p>
                    <div className="flex gap-2 mb-1">
                        <FontAwesomeIcon icon={faUser} style={{fontSize: "0.8rem", marginTop: "3px"}} />
                        <p className="mb-1 text-[1rem]">{trackingData.customer_email}</p>
                    </div>
                    {
                        trackingData.country === "Nigeria" ? (
                            <p className="mb-4 ml-6">+234{trackingData.customer_phone}</p>
                        ) : 
                        (
                            <p className="mb-4 ml-6">+233{trackingData.customer_phone}</p>
                        )
                    }
                </div>

                <div className="w-1/2 p-10">

                    <div className="w-full flex justify-end">
                        <p className="assignment-status text-[0.6rem] font-bold text-right bg-yellow-200 rounded-md p-1.5">Pending Assignment</p>
                    </div>
                    <div>
                        <p className="mb-1">Package Details</p>
                        {
                            productName.length > 1 ? (
                                <div><FontAwesomeIcon icon={faGift} /> {productName[0].charAt(0).toUpperCase() + productName[0].slice(1).toLowerCase().trim()} - {productName[1].charAt(1).toUpperCase() + productName[1].slice(2).toLowerCase()}</div>
                            ) : (
                                <div><FontAwesomeIcon icon={faGift} /> {productName[0].charAt(0).toUpperCase().trim()}</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
      </Container>
      <Container>
        <section>
            <h2 className="text-xl font-bold mb-2"> <FontAwesomeIcon icon={faLocationPinLock} /> Delivery Address</h2>
            <p className="mb-1 ml-5">{trackingData.shipping_address}</p>
            <p className="mb-1 ml-5">{trackingData.country}</p>
        </section>
      </Container>
    </div>
  );
}
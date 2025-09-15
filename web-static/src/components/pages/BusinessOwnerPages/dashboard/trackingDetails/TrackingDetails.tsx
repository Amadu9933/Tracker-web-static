import {faUser } from "@fortawesome/free-regular-svg-icons";
import { faBus, faGift, faLocation, faLocationArrow, faLocationCrosshairs, faLocationPin, faLocationPinLock, faMapLocation, faMapMarker, faMapPin, faVanShuttle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation} from "react-router-dom";
import { ArrowLeft, User, MapPin, Clock, CheckCircle, Package, Truck} from 'lucide-react';
import { useState } from "react";
import Dialog from "@components/common/dialog";



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
  const [trackingStatus, setTrackingStatus] = useState('pending'); // 'pending' or 'assigned'
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rider, setRider] = useState('');

  // Open dialog box
  const handleAssignClick = () => setIsDialogOpen(true); 
  const handleOffDialog = () => setIsDialogOpen(false);
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
                <div className="w-1/2">
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
                            {
                                trackingStatus === 'pending' ? (
                                    <p className="assignment-status text-[0.6rem] font-bold text-right bg-yellow-200 rounded-full p-1.5">
                                        Pending Assignment
                                    </p>
                                ) : (
                                    <p className="assignment-status text-[0.6rem] text-black font-bold text-right bg-green-400 rounded-full p-1.5">
                                        Assigned
                                    </p>
                                )
                            }
                    </div>
                    <div>
                        <p className="mb-1">Package Details</p>
                        {
                            productName.length > 1 ? (
                                <div className="flex items-center gap-2"><Package className="h-4 w-4" /> {productName[0].charAt(0).toUpperCase() + productName[0].slice(1).toLowerCase().trim()} - {productName[1].charAt(1).toUpperCase() + productName[1].slice(2).toLowerCase()}</div>
                            ) : (
                                <div className="flex items-center gap-2"><Package className="h-4 w-4" /> {productName[0].charAt(0).toUpperCase().trim()}</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
      </Container>
      <Container>
        <section>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><MapPin /> Delivery Address</h2>
            <p className="mb-1 ml-5">{
                trackingData.shipping_address
                }</p>
            <p className="mb-1 ml-5">{trackingData.country}</p>
        </section>
      </Container>
      <Container>
        <section> 
            <h2 className="text-xl font-bold mb-0 flex gap-2"> <Truck /> Rider Assignment</h2>
            {
                isDialogOpen && <Dialog handleAssignClick={() => {
                    alert('Assigned');
                    setTrackingStatus('assigned');
                    setIsDialogOpen(false);
                }}
                parcel_number={trackingData.parcel_number}
                handleOffDialog={handleOffDialog}
                handleSetTrackingStatus={setTrackingStatus}
                handleSetRider={setRider}
                />
            }
            {
                trackingStatus === 'assigned' ? (
                    <>
                        <p>Delivery has been assigned to {rider}</p>
                        <div className="w-full h-[5rem] flex justify-center align-center">
                            <CheckCircle size={80} className="text-green-500"/>
                        </div>
                    </>
                ) : (
                    <>
                        <p>Assign this delivery to an available rider below</p>
                        <button className="mt-4 w-full bg-[#FF833C] text-white px-4 py-2 rounded hover:bg-[#f9772bff] transition duration-300 flex items-center justify-center gap-2" onClick={handleAssignClick}><User className="h-4 w-4"/> Assign Rider</button>
                    </>
                )
            }             
            </section>
      </Container>
    </div>
  );
}
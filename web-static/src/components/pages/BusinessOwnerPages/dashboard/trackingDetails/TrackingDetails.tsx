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
  const [trackingStatus, setTrackingStatus] = useState('pending'); // 'pending' or 'assigned'
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rider, setRider] = useState('');
  const [edit, setEdit] = useState(false);
  const [user_data, setUserData] = useState({
    email: trackingData.customer_email,
    phone: trackingData.customer_phone,
    address: trackingData.shipping_address,
    country: trackingData.country,
    product_name: trackingData.product_name
  })

const productName = user_data.product_name.split(',')
  // Open dialog box
  const handleAssignClick = () => setIsDialogOpen(true); 
  const handleOffDialog = () => setIsDialogOpen(false);

  const handleShippingUpdate = async () => {
        setEdit(!edit);

    }

  return (
    <div className="p-4">
      <Container>
        <section className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold mb-0">Tracking Details</h1>
                <p className="ml-5">Manage tracking assignment and delivery status</p>
            </div>
            <div>
                {
                    trackingStatus === 'pending' && (
                        <div className="flex gap-4">
                            <button style={{display: edit? 'none' : "block"}} className="mt-2 w-full bg-[#ff833c] text-white text-[0.9rem] border-2 border-[#ff833c] shadow-2xl px-4 rounded-xl hover:bg-[#ff833c] hover:border-2 hover:border-[#dddddd] transition duration-300 flex items-center justify-center gap-2" onClick={() => setEdit(!edit)}>Edit</button>
                            {
                                edit && (
                                    <button className="mt-2 w-full bg-[#ff833c] text-white text-[0.9rem] border-2 border-[#ff833c] shadow-2xl px-4 rounded-xl hover:bg-[#ff833c] hover:border-2 hover:border-[#dddddd] transition duration-300 flex items-center justify-center gap-2" onClick={() => handleShippingUpdate()}>Update</button>
                                )
                            }
                        </div>
                    )

                }
            </div>
        </section>
      </Container>  
      <Container>
        <section>
            <div className="flex gap-4">
                <div className="w-1/2">
                    <h2 className="text-xl font-bold mb-2">{trackingData.parcel_number}</h2>

                    <p className="mb-2">Customer</p>
                    <div className="flex gap-2 mb-1">
                        <FontAwesomeIcon icon={faUser} style={{fontSize: "0.8rem", marginTop: "3px"}} />
                        {
                            edit && trackingStatus === 'pending' ? (
                             
                                <div className="flex flex-col w-30">
                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <input type="text" id="email" style={{border: "1px solid #FF833C", height: "8px"}} className="border border-red-300 placeholder:pl-0 rounded mb-2" required placeholder="johndoe@example.com" value={user_data.email} onChange={(e)=>setUserData({...user_data, email: e.target.value})} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="">Phone Number:</label>
                                        <input type="text" id="phone" style={{border: "1px solid #FF833C", height: "8px"}} className="placeholder:pl-0 rounded mb-2 w-full" required placeholder="7037676797" maxLength={10} value={user_data.phone} onChange={(e)=>setUserData({...user_data, phone: e.target.value})} />
                                    </div>
                                </div>
                            ) : (
                                
                                <div>
                                    <p className="mb-1 text-[1rem]">{user_data.email}</p>
                                    {
                                        trackingData.country === "Nigeria" ? (
                                            <p className="mb-4 ml-0">+234{user_data.phone}</p>
                                        ) : (
                                            <p className="mb-4 ml-0">+233{user_data.phone}</p>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
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
                            edit && trackingStatus === 'pending' ? (
                                <div className="flex flex-col items-start gap-2">
                                    <input type="text" id="product_name" style={{border: "1px solid #FF833C", height: "8px"}} className="border border-gray-300 placeholder:pl-0 rounded mb-2 w-full" required placeholder="Electronics, Clothes" value={user_data.product_name} onChange={(e)=>setUserData({...user_data, product_name: e.target.value})} />
                                </div>
                            ) : (
                             productName.length > 1 ? (
                                <div className="flex items-center gap-2"><Package className="h-4 w-4" /> {productName[0].charAt(0).toUpperCase() + productName[0].slice(1).toLowerCase().trim()} - {productName[1].charAt(1).toUpperCase() + productName[1].slice(2).toLowerCase()}...</div>
                            ) : (
                                <div className="flex items-center gap-2"><Package className="h-4 w-4" /> {productName[0].charAt(0).toUpperCase().trim() + productName[0].slice(1)}</div>
                            )   
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
            {
                edit && trackingStatus === 'pending' ?
            (
                <div className="flex w-full gap-4">
                    <div className="w-1/2 flex flex-col">
                        <label htmlFor="address" className="">Address:</label>
                        <input type="text" id="address" style={{border: "1px solid #FF833C", height: "8px"}} className="border border-gray-300 placeholder:pl-0 rounded mb-2 w-full" required placeholder="123 Allen Avenue Ikeja Lagos" value={user_data.address} onChange={(e)=>setUserData({...user_data, address: e.target.value})} />
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <label htmlFor="country" className="">Country:</label>
                        <input type="text" id="country" style={{border: "1px solid #FF833C", height: "8px"}} className="border border-gray-300 placeholder:pl-0 rounded mb-2 w-full" required placeholder="Nigeria" value={user_data.country} onChange={(e)=>setUserData({...user_data, country: e.target.value})} />
                    </div>
                </div>
            )
            :
            (
            <>
                <p className="mb-1 ml-5">{
                    user_data.address
                    }</p>
                <p className="mb-1 ml-5">{user_data.country}</p>
            </>
            )
        }
        </section>
      </Container>
      <div style={{display: edit === true? "none" : "block"}}>
        <Container>
            <section> 
                <h2 className="text-xl font-bold mb-0 flex gap-2"> <Truck /> Rider Assignment</h2>
                {
                    isDialogOpen && <Dialog
                    parcel_number={trackingData.parcel_number}
                    handleOffDialog={handleOffDialog}
                    handleSetTrackingStatus={setTrackingStatus}
                    handleSetRider={setRider}
                    />
                }
                {
                    trackingStatus === 'assigned' ? (
                        <div className="w-full">
                            <p>Delivery has been assigned</p>
                            <div className="w-full h-[5rem] flex justify-center align-center">
                                <CheckCircle size={80} className="text-green-500"/>
                            </div>
                            <h3 className="text-center font-medium mt-2"> Assignee: {rider} </h3>
                        </div>
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
    </div>
  );
}
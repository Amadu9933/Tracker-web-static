// src/pages/BusinessOwnerPages/user/Profile.tsx

import { ArrowLeft, CheckCircle, Edit } from "lucide-react";
import { Container } from "../trackingDetails/TrackingDetails";
import { useEffect, useState } from "react";
import axiosInstance from "/src/api/axiosInstance";

const UserProfile = () => {

    const [userData, setUserData] = useState({
        business_name: "",
        business_owner_uuid: "",
        service: "",
        user: {
            name: "",
            phone_number: "",
            avatar: "",
            email: "",
            address: "",
            updated_on: "",

        }
    });
    const [updated, setUpdated] = useState<boolean>(false);

    const userId = localStorage.userId;

    useEffect(() => {
        axiosInstance.get(`/business-owners/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.access}`
                }
            }
        )
        .then(res => {
            console.log(res.data);
            setUserData(res.data)
        }).catch((err: any) => {
            alert(err?.response?.data?.detail);
            console.log(localStorage.access)
        });
    }, [updated])

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between w-full">
                <div className="flex">
                    <div className="flex flex-col justify-center items-center mr-[1rem]">
                        <div className="border border-grey-400 p-[0.5rem] rounded cursor-pointer">
                            <ArrowLeft className="w-6 h-6"/>
                        </div>
                    </div>
                    <div>
                        <h6 className="font-bold text-[2rem]">Profile</h6>
                        <p>Manage your account information</p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button type='button' className="flex justify-center items-center text-white py-[0.2rem] gap-2 px-[1.5rem] border border-gray-500 rounded-full bg-[#FF833C]">
                        <Edit size={16}/>
                        Edit
                    </button>
                </div>
            </div>
            <section className="mt-10">
                <Container>
                    <h6 className="font-medium flex gap-2">Personal Information <CheckCircle className="text-green-500" /></h6>
                    <div className="flex justify-center items-center gap-10 mt-8">
                        <div className="w-[10rem] h-[10rem] flex justify-center items-center">
                            {/* Handles the image */}
                            {
                               userData?.user?.avatar? (
                                <img
                                    src={userData.user.avatar}
                                    alt="profile picture"
                                    className="border rounded-full w-[150px] h-[150px]"
                                />
                               ) : (
                                <img
                                    src={"/src/assets/dummy-profile-pic.png"}
                                    alt="avatar"
                                    className="border rounded-full w-[150px] h-[150px]"
                                />
                               )
                            }
                        </div>
                        <div>
                            {/* Handles the FullName, Phone and Email */} 
                            <div className="flex gap-5">
                                <div className="flex flex-col">
                                    <label className="mb-1 font-medium">Full Name</label>
                                    <div className="border border-gray-300 p-2 rounded-md w-[20rem]">
                                        <p className="">{
                                            userData?.user?.name.split('👌')[0]
                                            }</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 font-medium">Email Address</label>
                                    <div className="border border-gray-300 p-2 rounded-md w-[20rem]">
                                        <p className="">{userData?.user?.email || ''}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label className="mb-1 font-medium">Phone Number</label>
                                <div className="border border-gray-300 p-2 rounded-md w-full">
                                    <p className="">+234{userData?.user?.phone_number || ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <section className="mt-5">
                <Container>
                    <h6 className="font-medium flex">Business Information</h6>
                    <div className="w-full flex justify-start gap-10 mt-2">
                        <div className="w-full">
                            {/* Handles the FullName, Phone and Email */} 
                            <div className="flex gap-5 w-full">
                                <div className="flex flex-col">
                                    <label className="mb-1 font-medium">Business Name</label>
                                    <div className="border border-gray-300 p-2 rounded-md w-[30rem]">
                                        <p className="">{userData?.business_name || ""}</p>
                                        {/* <input type='text' value='ABC Logistics' style={{height: "0.5rem"}}/> */}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 font-medium">Service Type</label>
                                    <div className="border border-gray-300 p-2 rounded-md w-[29rem]">
                                        <p className="">{userData?.service || ""}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label className="mb-1 font-medium">Business Address</label>
                                <div className="border border-gray-300 p-2 rounded-md w-[60rem]">
                                    <address>{userData?.user?.address || ''}</address>
                                </div>
                                <div className="w-[10rem] mt-5">
                                    <label className="mb-1 font-medium">Account Type</label>
                                    <div className="">
                                        <p className="border border-red-300 w-[4rem] px-[0.3rem] py-[0.1rem] text-center font-small border rounded-full bg-orange-400 text-white text-[0.6rem]">premium</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <section className='mt-5'>
                <Container>
                    <div className='w-full'>
                        <h6 className="font-medium flex mb-5">Account Information</h6>
                            <div className="flex w-full">
                                <div className="flex flex-col w-1/2">
                                    <label className="mb-1 font-medium">Last Updated</label>
                                    <div className="border border-gray-300 p-2 rounded-md w-[20rem] bg-gray-200">
                                        <p className="">{userData.user?.updated_on || '#No Recent Update'}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <label className="mb-1 font-medium">Profile ID</label>
                                    <div className="border border-gray-300 p-2 rounded-md w-[20rem] bg-gray-200">
                                        <p className="">#{userData.business_owner_uuid || ''}</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default UserProfile;


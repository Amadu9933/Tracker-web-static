// src/pages/BusinessOwnerPages/user/Profile.tsx

import { ArrowLeft, Camera, CheckCircle, Edit, Loader } from "lucide-react";
import { Container } from "../trackingDetails/TrackingDetails";
import { useEffect, useState } from "react";
import axiosInstance from "@api/axiosInstance";
import title from "@components/utils/title";

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
            country: "",
            account_type: "",
            updated_on: "",
            subscription_type: ""

        }
    });

    const [updated, setUpdated] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [tempAvatar, setTempAvatar] = useState("");
    const [loader, setLoader] = useState(false);
    // const [status, setStatus] = useState<string>('')
    type MsgState = "red" | "green";
    const [showMsg, setShowMsg] = useState<{
        status: boolean;
        msg: string;
        state: MsgState;
    }>({
        status: false,
        msg: "",
        state: "green"
    })

    const userId = localStorage.userId;

    const validatePhone = (phone: string) => {
        const pattern = /^[0-9]{10}$/;

        return pattern.test(phone)
    }

    function handleUpdateClick() {
        const validate = validatePhone(userData.user.phone_number);
        if (validate) {
            const formData = new FormData()

            formData.append('name', (userData.user.name || '').split('👌')[0]);
            formData.append('phone_number', userData.user.phone_number);
            formData.append('address', userData.user.address)
            formData.append('avatar', userData.user.avatar)

            axiosInstance.patch(`/business-owners/${userId}/`,
                formData,
                {
                    timeout: 15000,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.access}`,
                    },
                }
            ).then((_res: any) => {
                setCanEdit(!canEdit);
                setUpdated(!updated);
                setLoader(!loader)
                setShowMsg({
                    ...showMsg,
                    msg: "Updated successfully ✅",
                    status: true,
                    state: 'green'
                })
                setTimeout(() => {
                    setShowMsg({
                        ...showMsg,
                        status: false,
                        state: 'green'
                    });
                    window.location.reload()
                }, 3000)

            }).catch((err: any) => {
                setShowMsg({
                    ...showMsg,
                    msg: err.response?.data?.error,
                    status: true,
                    state: 'red'
                })
                setTimeout(() => {
                    setShowMsg({
                        ...showMsg,
                        status: false,
                        state: 'green'
                    });
                }, 6000)
                setUserData(
                    {
                        ...userData,
                        user: {
                            ...userData.user,
                            phone_number: userData.user.phone_number
                        }
                    }
                )
            })
        } else {
            setShowMsg({
                ...showMsg,
                msg: "Invalid phone number",
                status: true,
                state: 'red'
            })
            setTimeout(() => {
                setShowMsg({
                    ...showMsg,
                    status: false,
                    state: 'red'
                });
            }, 3000)
        }

    }

    const handleAvatarUpload = (e: any) => {
        const avatar = e.target.files[0]
        console.log(avatar);

        if (!avatar.type.startsWith('image/')) {
            setShowMsg({
                ...showMsg,
                msg: "Please upload a valid image",
                status: true,
                state: 'red'
            })

            setTimeout(() => {
                setShowMsg({
                    ...showMsg,
                    status: false,
                    state: 'red'
                })
            }, 6000)
            return;
        }


        if (avatar) {
            const avatarUrl = URL.createObjectURL(avatar);
            setTempAvatar(avatarUrl);
            setUserData(
                {
                    ...userData,
                    user: {
                        ...userData.user,
                        avatar: avatar
                    }
                }
            )
        }
    }

    useEffect(() => {
        axiosInstance.get(`/business-owners/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.access}`
                }
            }
        )
            .then((res: any) => {
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
                        <div className="border border-grey-400 p-[0.5rem] rounded cursor-pointer"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </div>
                    </div>
                    <div>
                        <h6 className="font-bold text-[2rem]">Profile</h6>
                        <p>Manage your account information</p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    {
                        canEdit ? (
                            <button type='button' className="flex justify-center items-center text-white py-[0.2rem] gap-2 px-[1.5rem] border border-gray-500 rounded-full bg-[#FF833C]"
                                onClick={handleUpdateClick}
                            >
                                <Edit size={14} />
                                Save
                            </button>
                        ) : (
                            <button type='button' className="flex justify-center items-center text-white py-[0.2rem] gap-2 px-[1.5rem] border border-gray-500 rounded-full bg-[#FF833C]"
                                onClick={() => { setCanEdit(!canEdit) }}
                            >
                                <Edit size={14} />

                                {
                                    loader ? (
                                        <Loader className="w-5 h-5 animate-spin text-gray-500" />
                                    ) : (
                                        "Edit"
                                    )
                                }
                            </button>
                        )
                    }

                </div>
            </div>
            <section className="mt-10">
                <Container>
                    <div className="flex justify-between">
                        <h6 className="font-medium flex gap-2">Personal Information <CheckCircle className="text-green-500" /></h6>
                    </div>
                    <div className="flex justify-center items-center gap-10 mt-8">
                        <div className=" relative w-[10rem] h-[10rem] flex justify-center items-center">
                            {/* Handles the image */}
                            {
                                canEdit && (
                                    <div>
                                        <label
                                            htmlFor="avatar"
                                            className="absolute bg-[#FF833C] top-5 right-15 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100 transition"
                                        ><Camera size={12} /></label>
                                        <input
                                            type="file"
                                            className="hidden"
                                            id="avatar"
                                            onChange={(e) => handleAvatarUpload(e)} />
                                    </div>
                                )
                            }
                            {
                                userData?.user?.avatar ? (
                                    <img
                                        src={canEdit ? tempAvatar ? tempAvatar : `${userData.user.avatar}?v=${Date.now()}` : `${userData.user.avatar}?v=${Date.now()}`}
                                        alt="avatar"
                                        className="border rounded-full w-[150px] h-[150px] border border-orange-400 shadow-2xl"
                                    />
                                ) : (
                                    <img
                                        src={canEdit ? tempAvatar ? tempAvatar : "/src/assets/dummy-profile-pic.png" : "/src/assets/dummy-profile-pic.png"}
                                        alt="avatar"
                                        className="border rounded-full w-[150px] h-[150px] border border-orange-400 shadow-2xl"
                                    />
                                )
                            }
                        </div>
                        <div>
                            {/* Handles the FullName, Phone and Email */}
                            <div className="flex gap-5">
                                <div className="flex flex-col">
                                    <label className="mb-1 font-medium">Full Name</label>
                                    {
                                        canEdit ? (
                                            <div className="border border-orange-400 p-1 rounded-md w-[20rem]">
                                                <input
                                                    type="text"
                                                    className="focus:border-blue-500 focus:outline-none"
                                                    value={(userData?.user?.name || '').split('👌')[0]}
                                                    style={{ padding: "0px", height: "30px", margin: "0px", border: "1px solid white" }}
                                                    onChange={(e) => { setUserData({ ...userData, user: { ...userData.user, name: e.target.value } }) }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="border-l-4 cursor-default border-orange-400 bo bg-gray-200 p-2 rounded-md w-[20rem]">
                                                <p className="pl-[0.8rem]">{
                                                    (userData?.user?.name || '').split('👌')[0]
                                                }</p>
                                            </div>
                                        )
                                    }

                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 font-medium">Email Address</label>
                                    <div className="border-l-4 bg-gray-200 cursor-default border-orange-400 py-2 pl-[0.9rem] rounded-md w-[20rem]">
                                        <p className="">{userData?.user?.email || ''}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label className="mb-1 font-medium">Phone Number</label>
                                    {
                                        canEdit ? (
                                            <div className="border border-orange-400 p-2 pl-[0.3rem] h-[2.8rem] rounded-md w-full">
                                                <input
                                                    type="text"
                                                    className="border border-gray-300 focus:border-blue-500 focus:outline-none"
                                                    onChange={(e) => { setUserData({ ...userData, user: { ...userData.user, phone_number: e.target.value } }) }}
                                                    value={userData?.user?.phone_number} style={{ padding: "0px", margin: "0px", height: "1.5rem", border: "1px solid white" }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="border-l-4 border-orange-400 bg-gray-200 p-2 pl-[0.3rem] h-[2.8rem] cursor-default rounded-md w-full">
                                                <p className="">{userData.user?.country?.toLowerCase() === 'nigeria'? `+234-${userData?.user?.phone_number}`: `+233-${userData?.user?.phone_number}`}</p>
                                            </div>
                                        )
                                    }
                                <div className="w-full h-[3rem]  mt-1 flex justify-center">
                                    <p className={`text-${showMsg.state}-500 text-[0.8rem]`} style={{ display: showMsg.status ? 'inline' : 'none' }}>{showMsg.msg}</p>
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
                                    <div className="border-l-4 border-orange-400 cursor-default bg-gray-200 p-2 rounded-md w-[30rem]">
                                        <p className="">{userData?.business_name || ""}</p>
                                        {/* <input type='text' value='ABC Logistics' style={{height: "0.5rem"}}/> */}
                                    </div>
                                </div>
                                <div className="flex flex-col cursor-default">
                                    <label className="mb-1 font-medium">Service Type</label>
                                    <div className="border-l-4 border-orange-400 bg-gray-200 p-2 rounded-md w-[29rem]">
                                        <p className="">{userData?.service || ""}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col mt-6'>
                                <label className="mb-1 font-medium">Business Address</label>
                                
                                    {
                                        canEdit ? (
                                            <div className="border border-orange-400 p-2 rounded-md w-[60rem]">
                                                <input
                                                    type="text"
                                                    className="focus:border-white focus:outline-none"
                                                    onChange={(e) => { setUserData({ ...userData, user: { ...userData.user, address: e.target.value } }) }}
                                                    value={userData?.user?.address} style={{ margin: "0px", padding: "0 0px", height: "1.2rem", border: "1px solid white" }}
                                                />
                                            </div>
                                        )
                                            :
                                            (
                                                <div className="border-l-4 border-orange-400 bg-gray-200 p-2 cursor-default rounded-md w-[60rem]">
                                                    <address>{userData?.user?.address || ''}</address>
                                                </div>
                                            )
                                    }
                                
                                <div className="w-[10rem] mt-5">
                                    <label className="mb-1 font-medium">Account Type</label>
                                    <div className="">
                                        <p className="border border-red-300 w-[4rem] px-[0.3rem] py-[0.1rem] text-center font-small border rounded-full bg-orange-400 text-white text-[0.6rem]">{title(userData.user.subscription_type)}</p>
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
                                <div className="border-l-4 border-orange-400 cursor-default bg-gray-200 p-2 rounded-md w-[20rem] bg-gray-200">
                                    <p className="">{userData.user?.updated_on || '#No Recent Update'}</p>
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2 cursor-default">
                                <label className="mb-1 font-medium">Profile ID</label>
                                <div className="border-l-4 border-orange-400 bg-gray-200 p-2 rounded-md w-[20rem] bg-gray-200">
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


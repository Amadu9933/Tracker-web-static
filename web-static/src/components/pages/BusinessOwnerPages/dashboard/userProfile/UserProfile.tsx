// src/pages/BusinessOwnerPages/user/Profile.tsx

import { Camera, CheckCircle, Edit, Loader } from "lucide-react";
import { Container } from "../trackingDetails/TrackingDetails";
import { useEffect, useState } from "react";
import axiosInstance from "@api/axiosInstance";
import title from "@components/utils/title";

const UserProfile = () => {

    const [userData, setUserData] = useState({
        business_name: "",
        business_owner_uuid: "",
        service: "",
        subscription_type: "",
        user: {
            name: "",
            phone_number: "",
            avatar: "",
            email: "",
            address: "",
            country: "",
            account_type: "",
            updated_on: ""
        }
    });

    const [updated, setUpdated] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [tempAvatar, setTempAvatar] = useState("");
    const [loader, setLoader] = useState(false);
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
                setShowMsg({ ...showMsg, msg: "Updated successfully ✅", status: true, state: 'green' })
                setTimeout(() => {
                    setShowMsg({ ...showMsg, status: false, state: 'green' });
                    window.location.reload()
                }, 3000)
            }).catch((err: any) => {
                setShowMsg({ ...showMsg, msg: err.response?.data?.error, status: true, state: 'red' })
                setTimeout(() => {
                    setShowMsg({ ...showMsg, status: false, state: 'green' });
                }, 6000)
                setUserData({ ...userData, user: { ...userData.user, phone_number: userData.user.phone_number } })
            })
        } else {
            setShowMsg({ ...showMsg, msg: "Invalid phone number", status: true, state: 'red' })
            setTimeout(() => {
                setShowMsg({ ...showMsg, status: false, state: 'red' });
            }, 3000)
        }
    }

    const handleAvatarUpload = (e: any) => {
        const avatar = e.target.files[0]
        if (!avatar.type.startsWith('image/')) {
            setShowMsg({ ...showMsg, msg: "Please upload a valid image", status: true, state: 'red' })
            setTimeout(() => { setShowMsg({ ...showMsg, status: false, state: 'red' }) }, 6000)
            return;
        }
        if (avatar) {
            const avatarUrl = URL.createObjectURL(avatar);
            setTempAvatar(avatarUrl);
            setUserData({ ...userData, user: { ...userData.user, avatar: avatar } })
        }
    }

    useEffect(() => {
        axiosInstance.get(`/business-owners/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.access}` }
        })
            .then((res: any) => { setUserData(res.data) })
            .catch(() => {
                alert('Unable to load your profile details. Please refresh and try again.');
            });
    }, [updated])

    const messageTextClass = showMsg.state === 'red'
        ? 'text-red-500 dark:text-red-400'
        : 'text-green-500 dark:text-green-400';

    const editWrapper = "rounded-2xl min-h-[3rem] flex items-center w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 shadow-sm";
    const editInput = "w-full h-12 px-4 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none";

    const readonlyWrapper = "rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 min-h-[3rem] flex items-center cursor-default w-full shadow-sm";
    const readonlyText = "text-slate-900 dark:text-slate-100";

    const sectionTitle = "font-semibold text-xl text-slate-900 dark:text-slate-100";
    const sectionSubtitle = "text-sm text-slate-500 dark:text-slate-400";
    const actionButton = "inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600";
    const sectionCard = "rounded-[32px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-sm p-6";

    return (
        <div className="flex flex-col w-full text-gray-900 dark:text-gray-100">
            <div className={sectionCard}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h6 className={sectionTitle}>Profile</h6>
                        <p className={sectionSubtitle}>Manage your account details clearly and update information with confidence.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button type='button' className={actionButton} onClick={() => setCanEdit(!canEdit)}>
                            <Edit size={16} />
                            {canEdit ? 'Cancel' : 'Edit Profile'}
                        </button>
                        {canEdit && (
                            <button type='button' className={actionButton} onClick={handleUpdateClick}>
                                <Edit size={16} />
                                {loader ? <Loader className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <section className="mt-8">
                <Container>
                    <div className="space-y-6">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h6 className={sectionTitle}>Personal Information</h6>
                                <p className={sectionSubtitle}>Your details are secure and can be updated anytime.</p>
                            </div>
                            <CheckCircle className="h-6 w-6 text-emerald-500" />
                        </div>

                        <div className="flex flex-col items-center gap-8">
                            <div className="relative inline-flex h-[11rem] w-[11rem] items-center justify-center rounded-full border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900 shadow-lg">
                                {canEdit && (
                                    <>
                                        <input type="file" className="hidden" id="avatar" onChange={(e) => handleAvatarUpload(e)} />
                                        <label htmlFor="avatar" className="absolute -bottom-3 right-0 inline-flex cursor-pointer items-center rounded-full bg-slate-900 px-3 py-3 text-xs font-semibold text-white shadow-lg transition hover:bg-slate-800">
                                            <Camera size={14} className="" />

                                        </label>
                                    </>
                                )}
                                <img
                                    src={userData?.user?.avatar ? (canEdit ? tempAvatar ? tempAvatar : `${userData.user.avatar}?v=${Date.now()}` : `${userData.user.avatar}?v=${Date.now()}`) : "/src/assets/dummy-profile-pic.png"}
                                    alt="avatar"
                                    className="rounded-full w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] border border-orange-400 shadow-2xl"
                                />
                            </div>

                            <div className="w-full max-w-3xl">
                                <div className="grid gap-5">
                                    <div className="flex flex-col">
                                        <label className="mb-1 font-medium">Full Name</label>
                                        {canEdit ? (
                                            <div className={editWrapper}>
                                                <input type="text" className={editInput}
                                                    value={(userData?.user?.name || '').split('👌')[0]}
                                                    onChange={(e) => { setUserData({ ...userData, user: { ...userData.user, name: e.target.value } }) }}
                                                />
                                            </div>
                                        ) : (
                                            <div className={readonlyWrapper}>
                                                <p className={readonlyText}>{(userData?.user?.name || '').split('👌')[0]}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 font-medium">Email Address</label>
                                        <div className={readonlyWrapper}>
                                            <p className={readonlyText}>{userData?.user?.email || ''}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 font-medium">Phone Number</label>
                                        {canEdit ? (
                                            <div className={editWrapper}>
                                                <input type="text" className={editInput}
                                                    onChange={(e) => { setUserData({ ...userData, user: { ...userData.user, phone_number: e.target.value } }) }}
                                                    value={userData?.user?.phone_number}
                                                />
                                            </div>
                                        ) : (
                                            <div className={readonlyWrapper}>
                                                {userData.user?.country?.toLowerCase() === 'nigeria' && (
                                                    <p className={readonlyText}>{`+234-${userData?.user?.phone_number}`}</p>
                                                )}
                                                {userData.user?.country?.toLowerCase() === 'ghana' && (
                                                    <p className={readonlyText}>{`+233-${userData?.user?.phone_number}`}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-center">
                                    <p className={`${messageTextClass} text-sm`} style={{ display: showMsg.status ? 'inline' : 'none' }}>{showMsg.msg}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Business Information */}
            <section className="mt-5">
                <Container>
                    <div className="flex flex-col gap-2">
                        <h6 className={sectionTitle}>Business Information</h6>
                        <p className={sectionSubtitle}>Details about your business profile and account plan.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-5 mt-4">
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Business Name</label>
                            <div className={readonlyWrapper}>
                                <p className={readonlyText}>{userData?.business_name || ""}</p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Service Type</label>
                            <div className={readonlyWrapper}>
                                <p className={readonlyText}>{userData?.service || ""}</p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Business Address</label>
                            {
                                canEdit ? (
                                    <div className={editWrapper}>
                                        <input type="text" className={editInput}
                                            onChange={(e) => { setUserData({ ...userData, user: { ...userData.user, address: e.target.value } }) }}
                                            value={userData?.user?.address}
                                        />
                                    </div>
                                ) : (
                                    <div className={readonlyWrapper}>
                                        <address className={readonlyText}>{userData?.user?.address || ''}</address>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div className="mt-5 max-w-xs">
                        <label className="mb-1 font-medium">Account Type</label>
                        <div>
                            <p className="inline-flex items-center justify-center rounded-full bg-orange-400 px-3 py-1 text-[0.75rem] font-semibold text-white">{title(userData.subscription_type)}</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Account Information */}
            <section className='mt-5'>
                <Container>
                    <div className='w-full'>
                        <div className="flex flex-col gap-2 mb-5">
                            <h6 className={sectionTitle}>Account Information</h6>
                            <p className={sectionSubtitle}>System details for this profile and recent activity.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">Last Updated</label>
                                <div className={readonlyWrapper}>
                                    <p className={`text-sm ${readonlyText}`}>{userData.user?.updated_on || '#No Recent Update'}</p>
                                </div>
                            </div>
                            <div className="flex flex-col cursor-default">
                                <label className="mb-1 font-medium">Profile ID</label>
                                <div className={readonlyWrapper}>
                                    <p className={readonlyText}>#{userData.business_owner_uuid || ''}</p>
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
import Overview from "./Overview";
import ParcelChart from "./Chart";
import CreateWallet from "./CreateWallet";
const DashboardMain = () => {
    return (
        <div className="w-full">
            <div className="w-full">
                <Overview />
            </div>
            <div className="flex h-[300px]  justify-between gap-4 mt-12">
                <div className="flex-1 h-[300px] ">
                    <ParcelChart />
                </div>
                <div className="flex-1 flex">
                    <CreateWallet />
                </div>
            </div>
        </div>
    );
};

export default DashboardMain;

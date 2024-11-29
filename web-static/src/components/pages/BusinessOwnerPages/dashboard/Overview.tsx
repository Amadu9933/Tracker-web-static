import { ParaglidingOutlined } from "@mui/icons-material";

const Overview = () => {
    return (
        <div className="w-full   ">
            <div className="flex justify-between mt-8 pb-4 px-2 ">
                <p>Overview</p>
                <div>Date</div>
            </div>
            <div className="flex full  h-36 bg-slate-600 rounded-md  text-white">
                <div className="flex-1 text-center flex justify-center px-16 pt-12   ">
                    <div className="text-primary pr-3">
                        <div className="bg-primary/25 p-1 rounded-[50%] ">
                            <ParaglidingOutlined sx={{ width: 24, height: 24 }} />
                        </div>
                    </div>

                    <div className="text-left">
                        <p className="text-[18px] font-medium text-[#D1E8FA]">Total ID's Generated</p>
                        <p className="text-2xl">120</p>
                    </div>
                </div>

                <div className="flex-1 text-center flex justify-center border-x border-gray-500 px-16 pt-12   ">
                    <div className="text-primary pr-3">
                        <div className="bg-primary/25 p-1 rounded-[50%] ">
                            <ParaglidingOutlined sx={{ width: 24, height: 24 }} />
                        </div>
                    </div>

                    <div className="text-left">
                        <p className="text-[18px] font-medium text-[#D1E8FA]">Total ID's Generated</p>
                        <p className="text-2xl">120</p>
                    </div>
                </div>
                <div className="flex-1 text-center flex justify-center px-16 pt-12   ">
                    <div className="text-primary pr-3">
                        <div className="bg-primary/25 p-1 rounded-[50%] ">
                            <ParaglidingOutlined sx={{ width: 24, height: 24 }} />
                        </div>
                    </div>

                    <div className="text-left">
                        <p className="text-[18px] font-medium text-[#D1E8FA]">Total ID's Generated</p>
                        <p className="text-2xl">120</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;

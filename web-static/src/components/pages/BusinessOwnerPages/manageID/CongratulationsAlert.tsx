import Copy from './asset/Copy-icon.png';

const CongratulationsAlert: React.FC = () => {
    return (
        <div className=" border-red-900 border max-w-3xl h-[469px] ml-[250px] rounded-lg shadow-lg">
            < div className="pt-28" >

                <p className="font-medium text-xl leading-5 text-secondary mb-3">Congratulations!</p>
                <p className=' text-sm  text-[#48463A] leading-5 mb-5'>Tracking number has been generated</p>
                <div className='flex justify-center items-center gap-5 mb-5'><p className="text-primary font-medium text-lg">N3858678564S</p><img src={Copy} alt="" /></div>
                <button className='bg-primary w-36 px-5 py-3 leading-6 gap-2 rounded-lg  hover:bg-orange-500'>Activate</button>

            </div >
        </div >
    );
};

export default CongratulationsAlert;

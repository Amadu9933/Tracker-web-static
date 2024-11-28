import { creditCard } from './assets/Assets'

const CreateWallet = () => {
    return (

        <div className="w-[85%] h-full ml-24 rounded-[6%] bg-cyan-50 shadow-md text-left ">
            <div className='ml-5 pt-6'>
                <h1 className="text-lg font-medium">Reach your delivery goals faster</h1>
                <p className="text-[#8B93AEF0] mt-3 mb-7">Use your trackerr card to pay for <br /> deliveries and receive 10% discount on all <br /> deliveries made with trackerr app.</p>
                <button className="border-2 border-primary   text-primary  px-4 py-b-1 rounded-md">
                    <span className="mr-1 text-[24px]"> + </span> <span className="text-lg">Create Wallet</span>
                </button>

                <div className='absolute  -mt-5'>
                    <img src={creditCard} alt="Credit card" className='h-[95.278px]  w-[175px] ml-[14rem] rounded-md' />

                </div>
            </div>
        </div>

    );
};

export default CreateWallet;
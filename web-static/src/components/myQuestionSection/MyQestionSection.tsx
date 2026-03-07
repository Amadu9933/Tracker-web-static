import Robot from '@components/common/reusable/robot';

const QuestionSection = () => {
  return (
    <section className="py-10 px-5 sm:px-8 md:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl ">
        <div className="flex  items-center  justify-center md:flex-row flex-col gap-10 text-center md:text-center">
          {/* Text block */}
          <div className="w-full md:w-1/2">
            <h2 className=" font-medium text-3xl sm:text-4xl md:text-[32px] leading-tight tracking-normal mb-4 text-secondary">
              Have A Question ?
            </h2>
            <p className="font-poppins font-normal text-lg sm:text-xl md:text-[20px] leading-relaxed md:leading-[36px] tracking-normal text-[#585858] mb-6">
              Check out the FAQ section for already answered questions that will give you clarity or reach out to our contact centre via email:
              <span className='text-primary'>helptrackerr@gmail.com</span>  or call 00235545 for enquiry.
            </p>
          </div>

          {/* Robot */}
          <div className=" flex-shrink-0  transition-transform duration-300 hover:scale-105 active:scale-100">
            <Robot className="w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionSection;
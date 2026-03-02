import Robot from '@components/common/reusable/robot';

const QuestionSection = () => {
  return (
    <section className="py-10 px-5 sm:px-8 md:py-14 lg:py-16 bg-slate-50/70">
      <div className="mx-auto max-w-6xl ">
        <div className="flex  items-center  justify-center md:flex-row flex-col gap-10">
          {/* Text block */}
          <div className="text-center md:text-center">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#354755] mb-5 md:mb-6">
              Have A Question?
            </h2>

            <div className="space-y-3 text-base sm:text-lg leading-relaxed text-[#5F6670]">
              <p>
                Check out the <span className="font-medium">FAQ section</span> for already answered questions
                <br className="hidden sm:inline" /> that will give you clarity
              </p>

              <p>
                or reach out to our contact centre via{' '}
                <a
                  href="mailto:helptrackerr@gmail.com"
                  className="font-medium text-[#FF833C] underline-offset-2 hover:underline"
                >
                  helptrackerr@gmail.com
                </a>{' '}
                <span className="text-gray-400">or</span>{' '}
                <a
                  href="tel:00235545"
                  className="font-medium text-[#FF833C] hover:underline"
                >
                  00235545
                </a>{' '}
                for enquiry.
              </p>
            </div>
          </div>

          {/* Robot */}
          <div className="flex-shrink-0  transition-transform duration-300 hover:scale-105 active:scale-100">
            <Robot className="w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionSection;
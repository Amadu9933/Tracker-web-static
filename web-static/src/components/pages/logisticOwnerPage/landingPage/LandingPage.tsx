import { Footer, Mybutton } from "@components/common";

import "./landingPage.css"
import { SecondaryButton } from "@components/common/buttons/Mybutton";
// import MyQuestionSection from "@components/myQuestionSection/MyQestionSection";
import GearIcon from "@components/common/reusable/gearIcon";
import  QuestionSection  from "@components/myQuestionSection/MyQestionSection";
import { useNavigate } from "react-router-dom";


const LogisticSolution: React.FC = () => {

  const navigate = useNavigate()

  return <div className="logistics-ctn">
    <section className="logistics-img-ctn">
      <div className="logistic-info-desc-ctn">
        <div className="overlay"></div>
        <div className="content">
            <h1 className="h-info-desc font-lora font-bold text-[64px] leading-[72px] tracking-[-0.02em]">Do you own a bike or a logistics business?</h1>
            <div className="p-info-desc-ctn">
              <p className="p-info-desc font-poppins font-normal text-[20px] leading-[36px] tracking-normal">Earn more money and reach more business owners in need of your services by partnering with Trackerr.</p>
            </div>
            <Mybutton
              label="Get Started"
              onClick={()=> {navigate('/sign-up')}}
            />
        </div>
      </div>
        <div className="grid grid-cols-6 gap-[6px] opacity-70 ellipse-ctn" >
            {[...Array(42)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 bg-white rounded-full" />
            ))}
        </div>
    </section>
    <section className="spacer">
      <div className="flex section2-details-ctn">
        <div className="section2-details-div flex-col-center">
          <div className="info-ctn">
            <h3 className="font-lora font-medium text-[36px] leading-[100%] tracking-normal">
              Optimize. Connect. Grow.
            </h3>
            <p className="font-poppins font-normal text-[32px] leading-[48px] tracking-normal">
              Transform Your Logistics Workflow with Trackerr and connect you with business owners in need of logistics solutions.
            </p>
            <SecondaryButton
              label="Partner with us"
              // onClick={()=> {}}
            />
          </div>
            
        </div>
        <div className="section2-details-div flex-col-center">
         <div className="section2-details-div-child flex">
            <div className="child1 flex"></div>
            <div className="child2"></div>
         </div>
         <div className="section2-details-div-child flex">
            <div className="child3"></div>
            <div className="child4"></div>
         </div>
         <div className="child1-circle"></div>
         <div className="child4-rectangle"></div>
         <img alt="two guys lifting a carton into a truck" src="/src/assets/parcel-drop.png" className="section2-details-div-img"/>
        </div>
      </div>
    </section>
    <section style={{marginBottom: "8rem"}}>
      <h4 style={{textAlign: "center", marginBottom: "7rem"}} className="how-it-works font-inter font-medium text-[32px] leading-[40px] tracking-[0px]">How it works</h4>
      <div className="flex-row-center logistics-how-it-works" style={{width: "100%", height: "350px", padding: "0px 3rem", gap: "5rem"}}>
            <div className="flex-col-center">
              <GearIcon />
            </div>
            <div style={{width: "518px", height: "518px"}} className="flex-col-center">
              <div style={{width: "485px", height: "408px"}}>
                <ul style={{listStyleType: "disc", marginLeft: "2.2rem", color: "#354755"}} className="font-inter font-medium text-[24px] leading-[36px] align-middle">
                    <li>Step 1: Sign up/ login</li>
                </ul>
                <p className="font-inter font-normal text-[16px] leading-[24px] align-middle" style={{color: "#8E8A73", marginBottom: "1.5rem"}}>
                  Register to create account for your dispatch<br/>service by clicking the <span style={{color: "#354755"}}>‘Get started’</span> button
                </p>
                <ul style={{listStyleType: "disc", marginLeft: "2.2rem", color: "#354755"}} className="font-inter font-medium text-[24px] leading-[36px] align-middle">
                    <li>Step 2: Account set up</li>
                </ul>
                <p className="font-inter font-normal text-[16px] leading-[24px] align-middle" style={{color: "#8E8A73", marginBottom: "1.5rem"}}>
                  Fill out your profile with details about your logistics capabilities and areas of operation. Verify your company details through our secure process to start connecting with businesses.
                </p>
                <ul style={{listStyleType: "disc", marginLeft: "2.2rem", color: "#354755"}} className="font-inter font-medium text-[24px] leading-[36px] align-middle">
                    <li>Step 3: Connect and grow</li>
                </ul>
                <p className="font-inter font-normal text-[16px] leading-[24px] align-middle" style={{color: "#8E8A73", marginBottom: "1.5rem"}}>
                  Once your account is set up, you'll start getting matched<br/>with businesses looking for logistics partners.
                </p>
              </div>
            </div>
      </div>
    </section>
    <QuestionSection />
    <Footer />
  </div>
};


export default LogisticSolution;

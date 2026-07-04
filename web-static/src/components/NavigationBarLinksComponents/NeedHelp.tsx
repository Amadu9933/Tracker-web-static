import { useState } from "react";
import Container from "@mui/material/Container";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  MessageCircle,
  Phone,
  BookOpen,
  Package,
  ShieldCheck,
  Zap,
} from "lucide-react";

const faqs = [
  {
    question: "How do I track my parcel?",
    answer:
      "Navigate to 'Track Your Parcel', enter your unique tracking ID provided by the sender, and hit Track. You'll see real-time status updates including pickup, transit, and delivery milestones.",
  },
  {
    question: "How long does it take for tracking to update?",
    answer:
      "Tracking information is updated in real time as your parcel moves through each checkpoint. If you don't see an update within 24 hours of a status change, contact the sender to confirm the shipment was dispatched.",
  },
  {
    question: "My tracking ID isn't working. What should I do?",
    answer:
      "Double-check that the ID is entered exactly as provided — tracking IDs are case-sensitive and include no spaces. If the issue persists after 1 hour, contact your sender to verify the ID or reach our support team.",
  },
  {
    question: "How do I create a shipment as a business owner?",
    answer:
      "Sign in to your business account, go to your Dashboard, and click 'Create Shipment'. Fill in the recipient details, package info, and confirm. A unique tracking ID will be generated and can be shared with your customer immediately.",
  },
  {
    question: "Can I track multiple parcels at once?",
    answer:
      "Yes. Business accounts have access to a bulk tracking dashboard where all active shipments are listed with live statuses. Individual customers can track one parcel at a time per session.",
  },
  {
    question: "What does each tracking status mean?",
    answer:
      "Pending — shipment registered but not yet picked up. In Transit — parcel is moving between facilities. Out for Delivery — parcel is with a delivery agent. Delivered — successfully handed to the recipient. Returned — parcel could not be delivered and is heading back to sender.",
  },
  {
    question: "Is my tracking data secure?",
    answer:
      "Absolutely. Trackerr uses encrypted tracking IDs and role-based access control so only authorised parties can view shipment details. We never share your data with third parties.",
  },
  {
    question: "How do I top up my Trackerr wallet?",
    answer:
      "Go to your Dashboard, select 'Wallet', and click 'Top Up'. We support major debit/credit cards and mobile money. Funds reflect instantly and are used to create new shipments.",
  },
];

const quickLinks = [
  {
    icon: <BookOpen size={22} />,
    title: "Getting Started Guide",
    desc: "New to Trackerr? Follow our step-by-step setup guide.",
  },
  {
    icon: <Package size={22} />,
    title: "Shipment Management",
    desc: "Learn how to create, edit, and manage your shipments.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Account & Security",
    desc: "Manage your password, 2FA, and account permissions.",
  },
  {
    icon: <Zap size={22} />,
    title: "API Integration",
    desc: "Integrate Trackerr into your existing systems with our REST API.",
  },
];

const contactOptions = [
  {
    icon: <Mail size={26} />,
    label: "Email Support",
    detail: "support@trackerr.africa",
    sub: "Response within 24 hours",
  },
  {
    icon: <MessageCircle size={26} />,
    label: "Live Chat",
    detail: "Chat with us now",
    sub: "Available Mon – Sat, 8am – 6pm",
  },
  {
    icon: <Phone size={26} />,
    label: "Call Us",
    detail: "+234-(90)-1588-0751",
    sub: "Mon – Fri, 9am – 5pm",
  },
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-[#E0E0E0] dark:border-[#333333] rounded-lg overflow-hidden transition-colors duration-300"
      onClick={() => setOpen(!open)}
    >
      <button className="w-full flex items-center justify-between px-5 py-4 text-left bg-white dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors duration-200">
        <span className="font-medium text-[#354755] dark:text-white text-sm md:text-base">
          {question}
        </span>
        <span className="ml-4 shrink-0 text-[#FF833C]">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-2 bg-white dark:bg-[#1E1E1E] text-[#666666] dark:text-[#B0B0B0] text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const NeedHelp: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#0b111f] min-h-screen transition-colors duration-300">
      <Container maxWidth="lg" sx={{ paddingY: "60px" }}>
        {/* Header */}
        <div className="text-center mb-12 mt-10">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#FF833C] uppercase mb-3">
            Support Center
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#354755] dark:text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-[#666666] dark:text-[#B0B0B0] text-base max-w-xl mx-auto">
            Find answers to common questions, browse our guides, or reach out to
            our team — we're here to make your experience seamless.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {contactOptions.map((opt) => (
            <div
              key={opt.label}
              className="flex flex-col items-center text-center bg-[#F5F5F5] dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#333333] rounded-xl p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="text-[#FF833C] mb-3 group-hover:scale-110 transition-transform duration-200">
                {opt.icon}
              </div>
              <h3 className="font-semibold text-[#354755] dark:text-white mb-1">
                {opt.label}
              </h3>
              <p className="text-[#354755] dark:text-[#FF833C] font-medium text-sm mb-1">
                {opt.detail}
              </p>
              <p className="text-[#666666] dark:text-[#B0B0B0] text-xs">
                {opt.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-xl md:text-2xl font-semibold text-[#354755] dark:text-white mb-6 text-center">
            Browse by Topic
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <div
                key={link.title}
                className="flex flex-col bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#333333] rounded-xl p-5 hover:border-[#FF833C] dark:hover:border-[#FF833C] transition-all duration-200 cursor-pointer group"
              >
                <div className="text-[#FF833C] mb-3">{link.icon}</div>
                <h3 className="font-semibold text-[#354755] dark:text-white text-sm mb-1 group-hover:text-[#FF833C] dark:group-hover:text-[#FF833C] transition-colors duration-200">
                  {link.title}
                </h3>
                <p className="text-[#666666] dark:text-[#B0B0B0] text-xs leading-relaxed">
                  {link.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-[#354755] dark:text-white mb-2 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-[#666666] dark:text-[#B0B0B0] text-sm text-center mb-8">
            Click a question to expand the answer.
          </p>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* Still need help CTA */}
        <div className="mt-16 text-center bg-[#354755] dark:bg-[#1E1E1E] rounded-2xl py-12 px-6 border border-transparent dark:border-[#333333]">
          <h2 className="text-2xl font-bold text-white mb-3">
            Still need help?
          </h2>
          <p className="text-[#B3C3CF] dark:text-[#B0B0B0] text-sm mb-6 max-w-md mx-auto">
            Our support team is ready to assist you with any issue not covered
            above. Don't hesitate to reach out.
          </p>
          <button className="bg-[#FF833C] hover:bg-[#e57230] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 text-sm">
            <a href="mailto:support@trackerr.africa" className="text-white hover:text-[#FF833C]">
              Contact Support
            </a>
          </button>
        </div>
      </Container>
    </div>
  );
};

export default NeedHelp;

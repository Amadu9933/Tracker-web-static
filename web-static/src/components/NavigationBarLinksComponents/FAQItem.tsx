import { useState } from "react";
import {
  ChevronDown,
  ChevronUp
} from "lucide-react";


export const FAQItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-[#E0E0E0]  rounded-lg overflow-hidden transition-colors duration-300"
      onClick={() => setOpen(!open)}
    >
      <button className="w-full flex items-center justify-between px-5 py-4 text-left bg-white  hover:bg-[#F5F5F5]  transition-colors duration-200">
        <span className="font-medium text-[#354755]  text-sm md:text-base">
          {question}
        </span>
        <span className="ml-4 shrink-0 text-[#FF833C]">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-2 bg-white  text-[#666666]  text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};


export const DropDown: React.FC<{ header: string; component: any }> = ({
  header,
  component,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-[#E0E0E0]  rounded-lg overflow-hidden transition-colors duration-300 mb-1"
      onClick={() => setOpen(!open)}
    >
      <button className="w-full flex items-center justify-between px-5 py-4 text-left bg-white  hover:bg-[#F5F5F5]  transition-colors duration-200">
        <span className="font-medium text-[#354755]  text-sm md:text-base">
          {header}
        </span>
        <span className="ml-4 shrink-0 text-[#FF833C]">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-2 bg-white  text-[#666666]  text-sm leading-relaxed">
          {component}
        </div>
      )}
    </div>
  );
};
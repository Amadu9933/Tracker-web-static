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


export const DropDown: React.FC<{ header: string; component: any }> = ({
  header,
  component,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-[#E0E0E0] dark:border-[#333333] rounded-lg overflow-hidden transition-colors duration-300 mb-1"
      onClick={() => setOpen(!open)}
    >
      <button className="w-full flex items-center justify-between px-5 py-4 text-left bg-white dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors duration-200">
        <span className="font-medium text-[#354755] dark:text-white text-sm md:text-base">
          {header}
        </span>
        <span className="ml-4 shrink-0 text-[#FF833C]">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-2 bg-white dark:bg-[#1E1E1E] text-[#666666] dark:text-[#B0B0B0] text-sm leading-relaxed">
          {component}
        </div>
      )}
    </div>
  );
};
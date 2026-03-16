import { motion } from "framer-motion";

interface TabSelectorProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ selectedTab, onTabChange }) => {
  const tabs = [
    { value: "business", label: "Business Owner" },
    // { value: "logistic", label: "Logistic Partner" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-sm sm:text-base flex justify-start gap-4 sm:gap-6 font-inter text-secondary"
    >
      {tabs.map(({ value, label }, index) => (
        <motion.label
          key={value}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
          className="flex items-center gap-2 pl-2 cursor-pointer"
        >
          <input
            type="radio"
            value={value}
            checked={selectedTab === value}
            onChange={() => onTabChange(value)}
            className={selectedTab === value ? "accent-black" : ""}
          />
          <p className="text-sm sm:text-base">{label}</p>
        </motion.label>
      ))}
    </motion.div>
  );
};

export default TabSelector;
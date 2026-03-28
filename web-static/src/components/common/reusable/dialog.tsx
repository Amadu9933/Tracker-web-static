import axiosInstance from "@api/axiosInstance";
import title from "@components/utils/title";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-select";

type DialogProps = {
  handleSetTrackingStatus?: (status: string) => void;
  handleOffDialog?: () => void;
  handleSetRider?: (riderId: string) => void;
  parcel_number?: string;
};

export default function Dialog({
  handleSetTrackingStatus,
  handleOffDialog,
  handleSetRider,
  parcel_number = "XYZZy134562",
}: DialogProps) {
  const [selected, setSelected] = useState<null | any>(null);
  const [options, setOptions] = useState([]);
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  function handleChange(option: any) {
    setSelected(option);
  }

  const updateTrackingStatusInDb = async (selected: any) => {
    try {
      const response = await axiosInstance.patch(
        `/tracking/${parcel_number}/`,
        {
          parcel_number: parcel_number,
          status: "assigned",
          rider_uuid: selected?.rider_uuid,
          rider_email: selected?.rider_email,
          rider_name: selected?.rider_name,
          rider_phone: selected?.rider_phone,
          rider: selected?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log("Tracking status updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating tracking status:", error);
    }
  };

  const handleAssignClick = () => {
    if (selected) {
      handleOffDialog?.();
      handleSetTrackingStatus?.("assigned");
      handleSetRider?.(selected.label);
      updateTrackingStatusInDb(selected);
    } else {
      alert("Please choose a rider before assigning.");
    }
  };

  // react-select dark mode styles
  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: isDark ? "#1E293B" : "#fff",
      borderColor: state.isFocused ? "#FF833C" : isDark ? "#475569" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #FF833C" : "none",
      "&:hover": { borderColor: "#FF833C" },
      color: isDark ? "#f1f5f9" : "#0f172a",
      minHeight: "44px",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDark ? "#1E293B" : "#fff",
      border: isDark ? "1px solid #475569" : "1px solid #e2e8f0",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#FF833C"
        : state.isFocused
          ? isDark
            ? "#334155"
            : "#fff7ed"
          : isDark
            ? "#1E293B"
            : "#fff",
      color: state.isSelected
        ? "#fff"
        : isDark
          ? "#f1f5f9"
          : "#0f172a",
      cursor: "pointer",
      fontSize: "0.875rem",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDark ? "#f1f5f9" : "#0f172a",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: isDark ? "#64748b" : "#9ca3af",
      fontSize: "0.875rem",
    }),
    input: (base: any) => ({
      ...base,
      color: isDark ? "#f1f5f9" : "#0f172a",
    }),
    indicatorSeparator: (base: any) => ({
      ...base,
      backgroundColor: isDark ? "#475569" : "#e2e8f0",
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: isDark ? "#94a3b8" : "#6b7280",
      "&:hover": { color: "#FF833C" },
    }),
  };

  useEffect(() => {
    axiosInstance
      .get("/logistics/business-owners/riders/", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        const riders = response?.data?.msg || [];
        const formattedOptions = riders.map((rider: any) => ({
          rider_email: rider.user.email,
          rider_name: rider.user.name,
          rider_phone: rider.user.phone_number,
          rider_uuid: rider.logistics_owner_uuid,
          value: rider.id,
          label: `🏍️ ${title(rider.user.name)} - ${rider.user.phone_number}`,
        }));
        setOptions(formattedOptions);
      })
      .catch((error) => {
        console.error("Error fetching riders:", error);
      });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700
          rounded-xl shadow-2xl w-[90%] max-w-md p-6 transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Select Rider
          </h3>
          <button
            onClick={() => handleOffDialog?.()}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200
              text-lg leading-none transition-colors duration-150 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
          Choose an available rider for tracking number{" "}
          <span className="font-medium text-[#FF833C]">{parcel_number}</span>
        </p>

        {/* React Select with dark styles */}
        <div className="w-full mb-2">
          <Select
            options={options}
            placeholder="Choose a rider..."
            value={selected}
            onChange={handleChange}
            styles={selectStyles}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => handleOffDialog?.()}
            className="flex-1 py-2 px-4 text-sm font-medium rounded-lg
              bg-slate-100 dark:bg-slate-700
              text-slate-700 dark:text-slate-200
              border-2 border-slate-300 dark:border-slate-600
              hover:bg-slate-200 dark:hover:bg-slate-600
              transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleAssignClick}
            className="flex-1 py-2 px-4 text-sm font-medium rounded-lg
              bg-[#FF833C] text-white
              border-2 border-[#FF833C]
              hover:bg-[#e6722e] hover:border-[#e6722e]
              dark:hover:bg-[#ff9a5c] dark:hover:border-[#ff9a5c]
              dark:shadow-[0_0_12px_rgba(255,131,60,0.35)]
              flex items-center justify-center gap-2
              transition-all duration-200"
          >
            <CheckCircle className="w-4 h-4" />
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}

const ReusableDialog = ({ children }: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm w-full">
      <div
        className="bg-white dark:bg-[#0F172A]
          border border-orange-300 dark:border-slate-700
          w-[90%] max-w-3xl max-h-[90vh]
          rounded-xl shadow-2xl p-6 overflow-y-auto
          transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const DeleteDialog = ({ children }: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="bg-white dark:bg-[#0F172A]
          border border-orange-300 dark:border-slate-700
          w-[90%] max-w-[30rem] min-h-[15rem]
          rounded-xl shadow-2xl p-6
          transition-colors duration-200"
      >
        {children}
      </div>
    </div>
  );
};

export { ReusableDialog, DeleteDialog };
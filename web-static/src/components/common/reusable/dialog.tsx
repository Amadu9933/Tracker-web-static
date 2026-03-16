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

export default function Dialog({ handleSetTrackingStatus, handleOffDialog, handleSetRider, parcel_number = "XYZZy134562" }: DialogProps) {

  const [selected, setSelected] = useState<null | any>(null);
  const [options, setOptions] = useState([]);
  // Fetch riders from the backend API


  function handleChange(option: any) {
    setSelected(option);
  }

  const updateTrackingStatusInDb = async (selected: any) => {
    try {
      console.log(selected.value, typeof (selected.value))
      const response = await axiosInstance.patch(`/tracking/${parcel_number}/`, {
        parcel_number: parcel_number,
        status: 'assigned',
        rider_uuid: selected?.rider_uuid,
        rider_email: selected?.rider_email,
        rider_name: selected?.rider_name,
        rider_phone: selected?.rider_phone,
        rider: selected?.value
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
      });
      console.log('Tracking status updated successfully:', response.data);
      console.log('Selected rider ID to assign:', selected);
    } catch (error) {
      console.error('Error updating tracking status:', error);
    }

  };

  const handleAssignClick = () => {
    if (selected) {
      handleOffDialog?.();
      handleSetTrackingStatus?.('assigned');
      handleSetRider?.(selected.label);
      console.log('Selected rider to assign:', selected);
      updateTrackingStatusInDb(selected);
    }
    else {
      alert('Please select a rider');
    }
  }

  const styles = {
    overlay: {
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", justifyContent: "center", alignItems: "center"
    },
    dialog: {
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      minWidth: "500px"
    }
  };





  useEffect(() => {
    axiosInstance.get('/logistics/business-owners/riders/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
    })
      .then(response => {
        const riders = response?.data?.msg || [];

        const formattedOptions = riders.map((rider: any) => ({
          rider_email: rider.user.email,
          rider_name: rider.user.name,
          rider_phone: rider.user.phone_number,
          rider_uuid: rider.logistics_owner_uuid,
          value: rider.id,
          label: `🏍️ ${title(rider.user.name)} - ${rider.user.phone_number} `
        }));
        setOptions(formattedOptions);
      })
      .catch(error => {
        console.error('Error fetching riders:', error);
      });
  }, []);



  return <div style={styles.overlay as React.CSSProperties}>
    <div style={styles.dialog as React.CSSProperties}>
      <div>

      </div>
      <h2 className="flex justify-end p-0 m-0 text-sm"> <span className="cursor-pointer" onClick={() => handleOffDialog?.()}>X</span></h2>
      <h3 className="font-bold">Select Rider</h3>
      <p className="text-sm mb-4">Choose an available rider for tracking number {parcel_number}</p>
      <div className="w-full h-12">
        <Select options={options} placeholder="Choose a rider..."
          value={selected}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button onClick={() => handleOffDialog?.()} className="mt-2 w-full bg-[#F2F2f2] text-black border-2 border-[#ff833c] px-4 py-2 rounded hover:bg-[#f977] transition duration-300 flex items-center justify-center gap-2">Cancel</button>
        <button onClick={() => handleAssignClick()} className="flex mt-2 w-full bg-[#FF833C] text-white px-4 py-2 rounded hover:bg-[#f9772bff] transition duration-300 flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" />Assign</button>
      </div>
    </div>
  </div>
}

const ReusableDialog = ({ children }: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 w-full">
      <div
        className="bg-white border border-orange-300 w-[90%] max-w-3xl max-h-[90vh] rounded shadow-lg p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

const DeleteDialog = ({ children }: any) => {
  return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white border border-orange-300 w-[30rem] h-[15rem] rounded shadow-lg p-6">
      {children}
    </div>
  </div>
}

export { ReusableDialog, DeleteDialog };
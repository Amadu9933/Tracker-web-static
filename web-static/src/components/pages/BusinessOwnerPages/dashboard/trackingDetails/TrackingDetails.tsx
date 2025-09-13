import { useParams } from "react-router-dom";


export default function TrackingDetails() {

  const {trackingID} = useParams();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tracking Details Page</h1>
      <p>This is where detailed tracking information will be displayed.</p>
      <p>The parcel ID is: {trackingID}</p>
    </div>
  );
}
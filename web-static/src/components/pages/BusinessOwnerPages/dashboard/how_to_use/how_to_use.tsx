import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import generateImage from "../../../../../assets/generate.jpeg"
import generateId from "../../../../../assets/generateId.png"
import shippingInfo from "../../../../../assets/shipping.png"
import assignImage from "../../../../../assets/assign.png"
import { DropDown } from "@components/NavigationBarLinksComponents/FAQItem";
import GeneratingTrackingHelp from "./generatingTrackingHelp";


const steps = [
  {
    icon: <LocalShippingIcon color="primary" />,
    title: "Generate a Tracking Link",
    description:
      "Click the Generate Tracking button from your dashboard to create a new parcel.",
    image: generateImage,
  },
  {
    icon: <AddLocationAltIcon color="primary" />,
    title: "Enter Shipping Information",
    description:
      "Provide the sender and recipient details. When entering the delivery address, select one of the suggested addresses to ensure accurate navigation and delivery.",
    image: shippingInfo,
  },
  {
    icon: <CheckCircleIcon color="primary" />,
    title: "Generate the Tracking",
    description:
      "Review the information and click Generate. Trackerr instantly creates a unique tracking page that you can share with your customer.",
    image: generateId,
  },
  {
    icon: <PersonPinCircleIcon color="primary" />,
    title: "Assign the Parcel to a Rider",
    description:
      "Open the newly created shipment by clicking Activate, then select Assign Rider and choose the rider responsible for the delivery and click Assign!",
    image: assignImage,
  },
];


const howTo = [
  { 
    title: "How to generate a tracking number!",
    component: <GeneratingTrackingHelp steps={steps}/>
  },
  { 
    title: "How to onboard your riders!",
    component: <h1>Coming Soon!</h1>
  },
  { 
    title: "How to use the TrackerrGo rider app!",
    component: <h1>Coming Soon!</h1>
  }
]

export default function HowToUse() {
  return (
    <Box maxWidth="1000px" mx="auto" p={4}>
      <Stack spacing={2} mb={5}>
        <Chip
          icon={<MenuBookIcon />}
          label="Getting Started"
          sx={{ width: "fit-content" }}
        />

        <Typography variant="h3" fontWeight={700}>
          How to use Trackerr
        </Typography>

        <Typography color="text.secondary" maxWidth={700}>
          Generate a parcel in under one minute, assign it to a rider,
          and let your customers follow every movement in real time.
        </Typography>
      </Stack>

      {
        howTo.map((item) => (
          <DropDown 
            key={item.title}
            header={item.title}
            component={
              item.component
            }
          />
        ))
      }
    </Box>
  );
}
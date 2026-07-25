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
import ReusableHowTo from "./ReusableHowTo";


import addRider1 from "../../../../../assets/logistics_1.png"
import addRider2 from "../../../../../assets/logistics_2.png"
import addRider3 from "../../../../../assets/logistics_3.png"
import addRider4 from "../../../../../assets/logistics_4.png"

const riderSteps = [
  {
    icon: <CheckCircleIcon color="secondary" />,
    title: "",
    description:
      "Click the Logistics button on the Navbar",
    image: addRider1,
  },
  {
    icon: <CheckCircleIcon color="secondary" />,
    title: "Add A Rider",
    description:
      "Click on the Add Rider button to open up the rider onboarding form.",
    image: addRider2,
  },
  {
    icon: <CheckCircleIcon color="secondary" />,
    title: "Fill out the Rider Form",
    description:
      "Fill out the rider specific information by providing his Name, Email, Phone number, Identity information etc and click Add Rider.",
    image: addRider3,
  },
  {
    icon: <CheckCircleIcon color="success" />,
    title: "Rider Added",
    description:
      "Once successful, the new rider will appear on the list of riders and their login details will be sent to their email.",
    image: addRider4,
  },
];

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
    component: <ReusableHowTo steps={steps}/>
  },
  { 
    title: "How to onboard your riders!",
    component: <ReusableHowTo steps={riderSteps}/>
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
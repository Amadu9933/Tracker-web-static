import {
  Box,
  Card,
  CardContent,
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

      <Stack spacing={4}>
        {steps.map((step, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={4}
                alignItems="center"
              >
                <Box flex={1}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    mb={2}
                  >
                    {step.icon}

                    <Chip
                      label={`Step ${index + 1}`}
                      color="primary"
                      size="small"
                    />
                  </Stack>

                  <Typography variant="h5" fontWeight={600} mb={2}>
                    {step.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>

                <Box
                  flex={1}
                  sx={{
                    aspectRatio: "16/9",
                    bgcolor: "#f5f5f5",
                    borderRadius: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  {/* Replace with your screenshot */}
                  <img
                      src={step.image}
                      alt={step.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

    </Box>
  );
}
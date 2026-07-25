import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export default function GeneratingTrackingHelp({steps}: any) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 bg-white dark:bg-[#0b111f] text-left text-[#48463A] dark:text-gray-100 transition-colors duration-200"
    >
    <Stack spacing={4}>
        {steps.map((step: any, index: any) => (
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

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-lg sm:text-xl text-secondary dark:text-gray-100 font-semibold mb-4 flex items-center gap-2"
                    >
                        {step.title}
                    </motion.h2>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                    <Typography color="text.secondary">
                    {step.description}
                    </Typography>
                    </motion.h2>
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
</motion.div>
  )
}

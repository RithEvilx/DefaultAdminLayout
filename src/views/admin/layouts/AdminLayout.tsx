import { Outlet, useLocation } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);
  const pageTitle = segments[1] || "dashboard";

  // Create a snake_case, lowercase translation key
  const translationKey = pageTitle.replace(/-/g, " ").replace(/\s+/g, "_").toLowerCase();

  // Optional pretty title fallback if translation key not found
  const formattedTitle = translationKey.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Flex fontFamily="Hanuman, Poppins-Regular">
      <Sidebar />
      <Box flex="1" bg="gray.50">
        <Flex height={{ base: "50px", md: "70px" }} bg="white" alignItems="center" px="1rem" boxShadow="sm">
          <Heading fontFamily="Hanuman, Poppins-Regular" fontSize="xl">
            {t(translationKey, formattedTitle)}
          </Heading>
        </Flex>
        <Box height={{ base: "calc(100dvh - 50px)", md: "calc(100dvh - 70px)" }} overflowY="auto">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminLayout;

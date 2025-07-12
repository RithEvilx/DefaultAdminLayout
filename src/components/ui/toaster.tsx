/* eslint-disable react-refresh/only-export-components */
"use client";

import { createToaster, Toaster as ChakraToaster, Heading, Portal, Spinner, Stack, Text, Toast, Box } from "@chakra-ui/react";

// Create and export the toaster instance
export const toaster = createToaster({
  placement: "top",
  pauseOnPageIdle: true,
});

// Toaster UI component
const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }} position="relative">
            <Box position="absolute" top="21px" left="12px">
              {toast.type === "loading" ? <Spinner size="sm" color="blue.solid" /> : <Toast.Indicator />}
            </Box>
            <Stack gap="1" flex="1" maxWidth="100%" paddingLeft="2.5rem" mt="1rem" paddingBottom="1rem">
              {toast.title && (
                <Toast.Title>
                  <Heading>{toast.title}</Heading>
                </Toast.Title>
              )}
              {toast.description && (
                <Toast.Description>
                  <Text fontSize="1.05rem">{toast.description}</Text>
                </Toast.Description>
              )}
            </Stack>
            {toast.action && <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>}
            <Box position="absolute" top="8px" right="8px">
              {toast.closable && <Toast.CloseTrigger />}
            </Box>
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};

export default Toaster;

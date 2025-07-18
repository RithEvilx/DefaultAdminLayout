import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";
import * as React from "react";

export interface TooltipProps extends ChakraTooltip.RootProps {
  showArrow?: boolean;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  content: React.ReactNode;
  contentProps?: ChakraTooltip.ContentProps;
  disabled?: boolean;
  padding?: string | number;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(props, ref) {
  const { showArrow, children, disabled, portalled = true, content, contentProps, portalRef, padding = "0.25rem 0.5rem", ...rest } = props;

  if (disabled) return children;

  return (
    <ChakraTooltip.Root {...rest} openDelay={100} closeDelay={100}>
      <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content
            ref={ref}
            {...contentProps}
            padding={padding}
            boxShadow="1px, 1px, 16px, rgba(255, 255, 255, 1)"
            border="1px solid #e7e7e7"
          >
            {showArrow && (
              <ChakraTooltip.Arrow>
                <ChakraTooltip.ArrowTip borderTop="1px solid #e7e7e7" borderLeft="1px solid #e7e7e7" />
              </ChakraTooltip.Arrow>
            )}
            {content}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </Portal>
    </ChakraTooltip.Root>
  );
});

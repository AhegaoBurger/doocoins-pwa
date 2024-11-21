import React from "react";
import CalloutIcon from "../../assets/images/callout-top-right.svg";
import { Box, ScaleFade } from "@chakra-ui/react";
import { ChildContext } from "../../contexts/ChildContext";

const WrapperStyles = {
  position: "absolute",
  right: { base: "10%", sm: "4%" },
  width: { base: "75vw", sm: "45%", md: "35%" },
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: { base: "80%", sm: "70%" },
  flexDirection: "column",
};

const TextStyles = {
  position: "absolute",
  width: "70%",
  left: "50%",
  top: "55%",
  transform: "translateX(-50%) translateY(-55%)",
};

const IconStyles = {
  width: "100%",
};

const AddItemToListCallout = ({
  isOpen,
  onClose,
  itemKey,
  TextDescription,
}) => {
  const { handleUpdateCalloutState } = React.useContext(ChildContext);

  React.useEffect(() => {
    let timeout;
    if (isOpen) {
      timeout = setTimeout(() => {
        handleUpdateCalloutState(itemKey, false);
        onClose();
      }, 10000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isOpen]);

  return (
    <ScaleFade isOpen={isOpen} initialScale={0.9} in={isOpen}>
      <Box sx={WrapperStyles}>
        <img src={CalloutIcon} style={IconStyles} />
        <p style={TextStyles}>{TextDescription}</p>
      </Box>
    </ScaleFade>
  );
};

export default AddItemToListCallout;

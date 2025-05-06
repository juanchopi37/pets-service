import { Stack } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const Loyout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      component="main"
    >
      {children}
    </Stack>
  );
};

import { Stack } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const Loyaut: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack component="main" justifyContent="center" padding={0}>
      {children}
    </Stack>
  );
};

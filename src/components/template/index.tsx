import { Backdrop, Box, CircularProgress, Container } from "@mui/material";
import { FC } from "react";
import { CastingAgencyTemplateFooter } from "./footer";
import { CastingAgencyTemplateHeader } from "./header";

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

export const CastingAgencyTemplate: FC<Props> = ({ loading, children }) => {
  return (
    <Container maxWidth="xl">
      <CastingAgencyTemplateHeader />
      <Box
        sx={{
          minHeight: "calc(100vh - 179px)",
          margin: "36px 0",
        }}
      >
        {children}
      </Box>
      <CastingAgencyTemplateFooter />
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

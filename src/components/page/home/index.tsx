import { Box, Grid2, Typography } from "@mui/material";
import { CastingAgencyTemplate } from "../../template";

export const CastingAgencyHomePage = () => {
  return (
    <CastingAgencyTemplate
      loading={false}
      children={
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <Typography variant="h4">Casting Agency</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                est sagittis, convallis dolor id, aliquet turpis. Nulla
                facilisi. Interdum et malesuada fames ac ante ipsum primis in
                faucibus. Curabitur ut urna at massa tincidunt laoreet. Aliquam
                erat volutpat. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos. Suspendisse
                malesuada in arcu et pharetra. Aenean ultrices velit et risus
                mollis aliquet. Aliquam erat volutpat. Phasellus cursus molestie
                condimentum. Proin aliquet justo risus, at tincidunt nibh
                sodales ullamcorper. Pellentesque tortor tellus, accumsan et
                velit a, cursus pretium purus. Vestibulum ornare, lacus mollis
                dapibus sodales, mi metus pretium lacus, ac tempor massa lacus
                porta urna. Etiam non sodales nibh. Ut tincidunt dolor non
                elementum eleifend. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Donec a est sagittis, convallis dolor id,
                aliquet turpis. Nulla facilisi. Interdum et malesuada fames ac
                ante ipsum primis in faucibus. Curabitur ut urna at massa
                tincidunt laoreet. Aliquam erat volutpat. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Suspendisse malesuada in arcu et pharetra. Aenean
                ultrices velit et risus mollis aliquet. Aliquam erat volutpat.
                Phasellus cursus molestie condimentum. Proin aliquet justo
                risus, at tincidunt nibh sodales ullamcorper. Pellentesque
                tortor tellus, accumsan et velit a, cursus pretium purus.
                Vestibulum ornare, lacus mollis dapibus sodales, mi metus
                pretium lacus, ac tempor massa lacus porta urna. Etiam non
                sodales nibh. Ut tincidunt dolor non elementum eleifend.
              </Typography>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <img
              src={require("../../../static/movie.jpg")}
              width={500}
              height={690}
            />
          </Grid2>
        </Grid2>
      }
    />
  );
};

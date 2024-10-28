import { Box, Button, Grid2, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik, FormikProps } from "formik";
import { FC, useRef } from "react";
import { Movie } from "../../../types";
import dayjs from "dayjs";

interface Props {
  form: Movie;
  onSubmit: (value: Movie) => void;
}

export const CastingAgencyMovieForm: FC<Props> = ({ form, onSubmit }) => {
  const formRef = useRef<FormikProps<Movie>>(null);

  const handleChangeValue = (field: keyof Movie, value: Movie[keyof Movie]) => {
    formRef.current?.setFieldValue(field, value);
  };

  const handleSubmit = (values: Movie) => {
    onSubmit(values);
  };

  return (
    <Formik innerRef={formRef} initialValues={form} onSubmit={handleSubmit}>
      {({ values: { release_date, title }, submitForm }) => {
        return (
          <Grid2 container spacing={2}>
            <Grid2
              size={{ xs: 6 }}
              sx={{
                display: "flex",
              }}
            >
              <Box
                component="div"
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  width: "400px",
                  margin: "0 auto",
                  gap: "20px",
                }}
              >
                <TextField
                  id={`${title}`}
                  label="Title"
                  variant="standard"
                  value={title}
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChangeValue("title", value);
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      defaultValue={dayjs(release_date)}
                      label="Release date"
                      onChange={(value) => {
                        handleChangeValue("release_date", value?.toISOString());
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <Button variant="contained" onClick={submitForm}>
                  Submit
                </Button>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <img
                src={require("../../../static/movie.jpg")}
                width={500}
                height={703}
              />
            </Grid2>
          </Grid2>
        );
      }}
    </Formik>
  );
};

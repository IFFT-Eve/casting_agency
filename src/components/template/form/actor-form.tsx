import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Box, Button, Grid2, Stack, Switch, TextField } from "@mui/material";
import { Formik, FormikProps } from "formik";
import { FC, useRef } from "react";
import { Actor } from "../../../types";

interface Props {
  form: Actor;
  onSubmit: (value: Actor) => void;
}

export const CastingAgencyActorForm: FC<Props> = ({ form, onSubmit }) => {
  const formRef = useRef<FormikProps<Actor>>(null);

  const handleChangeValue = (field: keyof Actor, value: Actor[keyof Actor]) => {
    formRef.current?.setFieldValue(field, value);
  };

  const handleSubmit = (values: Actor) => {
    onSubmit(values);
  };

  return (
    <Formik innerRef={formRef} initialValues={form} onSubmit={handleSubmit}>
      {({ values: { name, age, gender }, submitForm }) => {
        return (
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6 }} sx={{
                display: 'flex',
            }}>
              <Box
                component="div"
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  width: '400px',
                  margin: '0 auto',
                  gap: '20px'
                }}
              >
                <TextField
                  id={`${name}`}
                  label="Name"
                  variant="standard"
                  value={name}
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChangeValue("name", value);
                  }}
                />
                <TextField
                  inputMode="numeric"
                  id={`${age}`}
                  label="Age"
                  variant="standard"
                  value={age}
                  onChange={(e) => {
                    const { value } = e.target;
                    handleChangeValue("age", value);
                  }}
                />
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <FemaleIcon />
                  <Switch
                    checked={gender === true}
                    onChange={() => handleChangeValue("gender", !gender)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <MaleIcon />
                </Stack>
                <Button variant="contained" onClick={submitForm}>Submit</Button>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <img src={require('../../../static/actor.jpg')} width={500} height={690}/>
            </Grid2>
          </Grid2>
        );
      }}
    </Formik>
  );
};

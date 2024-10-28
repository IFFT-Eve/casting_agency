import { FC, useEffect, useState } from "react";
import { CastingAgencyTemplate } from "../../../template";
import { useNavigate } from "react-router-dom";
import { Actor } from "../../../../types";
import { BaseError } from "../../../../types/baseResponse";
import { deleteActor, getAllActors } from "../../../../service/actors";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import SettingsIcon from "@mui/icons-material/Settings";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

export const CastingAgencyActorListPage: FC = () => {
  const navigate = useNavigate();

  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<BaseError | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await getAllActors();
        setLoading(false);
        setActors(data);
      } catch (e) {
        setLoading(false);
        setError({
          message: "fetch error",
        });
      }
    };
    fetch();
  }, []);

  const onClickCreate = () => {
    navigate(`/create-actor`);
  };

  const onDelete = async (id: number) => {
    setLoading(true);
    try {
      const { delete_count } = await deleteActor(id);
      setLoading(false);
      if (delete_count) {
        setActors((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      setLoading(false);
      setError({
        message: "delete fail",
      });
    }
  };

  const onClickDetail = (id: number) => {
    navigate(`/actor/${id}`);
  };
  return (
    <CastingAgencyTemplate
      loading={loading}
      children={
        <>
          {error ? (
            <>{error.message}</>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                gap: "24px",
              }}
            >
              <Button variant="outlined" onClick={onClickCreate}>
                Create actor
              </Button>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <IconButton
                          aria-label="setting"
                          disabled
                          color="primary"
                        >
                          <SettingsIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="right">Age</TableCell>
                      <TableCell align="right">Gender</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {actors.length ? (
                      actors.map((item) => (
                        <TableRow
                          key={item.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            <IconButton
                              aria-label="delete"
                              color="primary"
                              onClick={() => onDelete(item.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              aria-label="detail"
                              color="secondary"
                              onClick={() => onClickDetail(item.id)}
                            >
                              <FileOpenIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">{item.id}</TableCell>
                          <TableCell align="center">{item.name}</TableCell>
                          <TableCell align="right">{item.age}</TableCell>
                          <TableCell align="right">
                            {item.gender ? <MaleIcon /> : <FemaleIcon />}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No Rows Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </>
      }
    />
  );
};

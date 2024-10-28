import DeleteIcon from "@mui/icons-material/Delete";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import SettingsIcon from "@mui/icons-material/Settings";
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
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMovie, getAllMovies } from "../../../../service/movies";
import { BaseError } from "../../../../types/baseResponse";
import { Movie } from "../../../../types";
import { CastingAgencyTemplate } from "../../../template";

export const CastingAgencyMovieListPage: FC = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<BaseError | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await getAllMovies();
        setLoading(false);
        setMovies(data);
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
    navigate(`/create-movie`);
  };

  const onDelete = async (id: number) => {
    setLoading(true);
    try {
      const { delete_count } = await deleteMovie(id);
      setLoading(false);
      if (delete_count) {
        setMovies((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      setLoading(false);
      setError({
        message: "delete fail",
      });
    }
  };

  const onClickDetail = (id: number) => {
    navigate(`/movie/${id}`);
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
                Create movie
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
                      <TableCell align="center">Title</TableCell>
                      <TableCell align="right">Release date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {movies.length ? (
                      movies.map((item) => (
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
                          <TableCell align="center">{item.title}</TableCell>
                          <TableCell align="right">
                            {item.release_date}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
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

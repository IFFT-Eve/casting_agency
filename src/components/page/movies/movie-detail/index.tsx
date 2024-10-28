import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMovie, getMovie, updateMovie } from "../../../../service/movies";
import { BaseError } from "../../../../types/baseResponse";
import { Movie } from "../../../../types";
import { CastingAgencyTemplate } from "../../../template";
import { CastingAgencyMovieForm } from "../../../template/form/movie-form";

interface Props {
  mode: "create" | "edit";
}

export const CastingAgencyMovieDetailPage: FC<Props> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<BaseError | null>(null);

  useEffect(() => {
    if (mode === "create") {
      setMovie({
        id: -1,
        title: "",
        release_date: "",
      });
      return;
    }
    if (!id) {
      return;
    }
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await getMovie(Number(id));
        setLoading(false);
        setMovie(data);
      } catch (e) {
        setLoading(false);
        setError({
          message: "fetch error",
        });
      }
    };
    fetch();
  }, [mode]);

  const handleSubmit = async (values: Movie) => {
    if (mode === "create") {
      setLoading(true);
      try {
        const { update_count } = await createMovie(values);
        setLoading(false);
        if (update_count) {
          navigate("/movie");
        }
      } catch (e) {
        setLoading(false);
        setError({
          message: "create fail",
        });
      }
    } else {
      setLoading(true);
      try {
        const { update_count } = await updateMovie(values);
        setLoading(false);
        if (update_count) {
          navigate("/movie");
        }
      } catch (e) {
        setLoading(false);
        setError({
          message: "update fail",
        });
      }
    }
  };

  return (
    <CastingAgencyTemplate
      loading={loading}
      children={
        <>
          {error ? (
            <>{error?.message}</>
          ) : (
            <>
              {!movie ? (
                <></>
              ) : (
                <CastingAgencyMovieForm form={movie} onSubmit={handleSubmit} />
              )}
            </>
          )}
        </>
      }
    />
  );
};

import { FC, useEffect, useState } from "react";
import { CastingAgencyTemplate } from "../../../template";
import { useNavigate, useParams } from "react-router-dom";
import { Actor } from "../../../../types";
import { BaseError } from "../../../../types/baseResponse";
import { createActor, getActor, updateActor } from "../../../../service/actors";
import { CastingAgencyActorForm } from "../../../template/form/actor-form";

interface Props {
  mode: "create" | "edit";
}

export const CastingAgencyActorDetailPage: FC<Props> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [actor, setActor] = useState<Actor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<BaseError | null>(null);

  useEffect(() => {
    if (mode === "create") {
      setActor({
        id: -1,
        age: 0,
        gender: true,
        name: "",
      });
      return;
    }
    if (!id) {
      return;
    }
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await getActor(Number(id));
        setLoading(false);
        setActor(data);
      } catch (e) {
        setLoading(false);
        setError({
          message: "fetch error",
        });
      }
    };
    fetch();
  }, [mode]);

  const handleSubmit = async (values: Actor) => {
    if (mode === "create") {
      setLoading(true);
      try {
        const { update_count } = await createActor(values);
        setLoading(false);
        if (update_count) {
          navigate("/actor");
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
        const { update_count } = await updateActor(values);
        setLoading(false);
        if (update_count) {
          navigate("/actor");
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
              {!actor ? (
                <></>
              ) : (
                <CastingAgencyActorForm form={actor} onSubmit={handleSubmit} />
              )}
            </>
          )}
        </>
      }
    />
  );
};

import { Route, RouteProps } from "react-router-dom";
import { ProtectedRoute } from ".";
import { CastingAgencyActorDetailPage } from "../components/page/actors/actor-detail";
import { CastingAgencyActorListPage } from "../components/page/actors/actor-list";
import { CastingAgencyHomePage } from "../components/page/home";
import { CastingAgencyMovieDetailPage } from "../components/page/movies/movie-detail";
import { CastingAgencyMovieListPage } from "../components/page/movies/movie-list";

export const RouterList: RouteProps[] = [
  {
    path: "/",
    element: <CastingAgencyHomePage />,
  },
  {
    path: "actor",
    element: <CastingAgencyActorListPage />,
  },
  {
    path: "actor/:id",
    element: <CastingAgencyActorDetailPage mode="edit" />,
  },
  {
    path: "create-actor",
    element: <CastingAgencyActorDetailPage mode="create" />,
  },
  {
    path: "movie",
    element: <CastingAgencyMovieListPage />,
  },
  {
    path: "movie/:id",
    element: <CastingAgencyMovieDetailPage mode="edit" />,
  },
  {
    path: "create-movie",
    element: <CastingAgencyMovieDetailPage mode="create" />,
  },
];

export const appRoute = (props: RouteProps[]) => {
  return (
    <Route path="/">
      {props.map(({ element, path }) => (
        <Route
          key={path}
          path={path}
          element={
            path === "/" ? element : <ProtectedRoute>{element}</ProtectedRoute>
          }
        />
      ))}
    </Route>
  );
};

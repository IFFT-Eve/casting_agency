import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { appRoute, RouterList } from "./router/router";
import { useEffect } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import authConfig from "./auth-config.json";

function App() {
  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: authConfig.redirectUri,
        audience: authConfig.audience
      }}
      onRedirectCallback={(appState) => console.log(appState)}
    >
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(appRoute(RouterList))
        )}
      ></RouterProvider>
    </Auth0Provider>
  );
}

export default App;

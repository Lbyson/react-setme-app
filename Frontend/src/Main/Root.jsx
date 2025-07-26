import "@/Main/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/Main/App.jsx";
import SendToErrorLink from "../Components/ErrorsPage/sendToErrorLink.tsx";
import ProfilesPage from "../Components/ProfilesSection/ProfilesPage/ProfilesPage.tsx";
import ProfilePage from "../Components/ProfilesSection/ProfilesPage/ProfilePage.tsx";
import { useEffect, useState } from "react";
import { getInitialTheme, setTheme } from "./theme.js";

function Root() {
  const [themeState, setThemeState] = useState(getInitialTheme());

  useEffect(() => {
    setTheme(themeState);
  }, [themeState]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App themeState={themeState} setThemeState={setThemeState} />,
      errorElement: <SendToErrorLink />,
    },
    {
      path: "/profiles",
      element: <ProfilesPage />,
      children: [
        {
          path: "/profiles/:profileId",
          element: <ProfilePage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Root;

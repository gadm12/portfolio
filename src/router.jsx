import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { loadPortfolioData } from "./utilities.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      loader: loadPortfolioData,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export default router;

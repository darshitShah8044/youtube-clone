import store from "./utils/store";
import "./App.css";
import Body from "./components/Body";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainVideoContainer from "./components/MainVideoContainer";
import WatchPage from "./components/WatchPage";
import SearchVideoResult from "./components/SearchVideoResult";
import Head from "./components/Head"; // Import Head component

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainVideoContainer />,
        },
        {
          path: "/watch",
          element: <WatchPage />,
        },
        {
          path: "/search_query",
          element: <SearchVideoResult />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <div>
          <Body />
        </div>
      </RouterProvider>
    </Provider>
  );
}

export default App;

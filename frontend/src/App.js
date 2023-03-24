import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import EventCreatePage from "./pages/EventCreate";
import EventEditPage from "./pages/EventEdit";
// import EventsPage, { loader as eventsLoader } from "./pages/Events";

import HomePage from "./pages/Home";
import RootLayout from "./pages/Roots";
import EventRootLayout from "./pages/EventRoot";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

const EventsPage = lazy(() => import("./pages/Events"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventRootLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <EventsPage />
              </Suspense>
            ),
            loader: () =>
              import("./pages/Events").then((module) => module.loader()),
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,

            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EventEditPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <EventCreatePage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

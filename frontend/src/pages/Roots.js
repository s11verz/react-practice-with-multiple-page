import { Outlet } from "react-router-dom";
import MainNavitation from "../components/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavitation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

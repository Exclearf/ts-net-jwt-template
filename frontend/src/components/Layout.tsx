import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.scss";
import { Button } from "./ui/button";
import { ModeToggle } from "./ThemeToggle";
import { useDispatch } from "react-redux";
import { logOut } from "@/Redux/Slices/AuthSlice";
import { useRef } from "react";

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const locationLayoutButton = useRef<{ [key: string]: JSX.Element }>({
    login: (
      <Button variant={"outline"} asChild>
        <Link to="/signup">Signup</Link>
      </Button>
    ),
    signup: (
      <Button variant={"outline"} asChild>
        <Link to="/login">Login</Link>
      </Button>
    ),
  });

  return (
    <div className={styles.wrapper}>
      <header>
        <ModeToggle />
        {locationLayoutButton.current[location.pathname.split("/")[1]] ?? (
          <Button
            variant={"outline"}
            onClick={() => {
              dispatch(logOut());
            }}
          >
            Log Out
          </Button>
        )}
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;

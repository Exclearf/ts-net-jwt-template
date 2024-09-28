import { useDispatch, useSelector } from "react-redux";
import { logIn } from "@/Redux/Slices/AuthSlice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { Separator } from "@/components/ui/separator";
import { z, ZodObject, ZodString } from "zod";
import CredentialsForm from "@/components/forms/CredentialsForm";
import { InfinitySpin } from "react-loader-spinner";
import { useState } from "react";
import { isExpired } from "react-jwt";

const formSchema: ZodObject<{ username: ZodString; password: ZodString }> =
  z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters." })
      .max(32, { message: "Password must be at less than 32 characters." }),
  });

const Login = () => {
  const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean; accessToken: string } }) =>
      state.auth.isAuthenticated
  );
  const accessToken = useSelector(
    (state: { auth: { isAuthenticated: boolean; accessToken: string } }) =>
      state.auth.accessToken
  );
  const [errorText, setErrorText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocationPathname = location.state?.previousLocationPathname;

  const isFetching = useSelector(
    (state: { state: { isFetching: boolean } }) => state.auth.state.isFetching
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await dispatch(
      //@ts-expect-error TODO: Fix type annotations later
      logIn({
        userName: values.username,
        password: values.password,
      })
    );

    if (res.payload?.accessToken) {
      navigate(previousLocationPathname ?? "/");
      setErrorText("");
    } else if (res?.error.message) {
      setErrorText("There has been an error.");
    } else {
      setErrorText("There is no such user.");
    }
  };

  if (previousLocationPathname && isAuthenticated && !isExpired(accessToken)) {
    return (
      <Navigate
        to={previousLocationPathname}
        state={{ from: location, previousLocationPathname: location.pathname }}
        replace
      />
    );
  }
  return (
    <main
      className={`flex justify-center items-center m-4 rounded-md border border-input bg-background ${styles.main}`}
    >
      <div className={[styles.panel, styles.panel_side].join(" ")}>
        <div className={styles.company_name}>TuneTinder</div>
        <div className={styles.user_citation}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum tempore
          doloremque fugiat laudantium.
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className={styles.panel}>
        {isFetching ? (
          <InfinitySpin width="200" color="hsl(var(--primary))" />
        ) : (
          <CredentialsForm
            title="Login"
            subTitle="Enter your username and password"
            error={errorText}
            buttonText="Log In"
            formSchema={formSchema}
            onFormSubmit={onSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default Login;

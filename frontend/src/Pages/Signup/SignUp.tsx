import { useDispatch } from "react-redux";
import { signUp } from "@/Redux/Slices/AuthSlice";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Signup.module.scss";
import { Separator } from "@/components/ui/separator";
import { z, ZodObject, ZodString } from "zod";
import CredentialsForm from "@/components/forms/CredentialsForm";
import { useState } from "react";

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

const Signup = () => {
  const [errorText, setErrorText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previousLocationPathname =
    useLocation().state?.previousLocationPathname;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    const res = await dispatch(
      //@ts-expect-error TODO: Fix type annotations later
      signUp  ({
        userName: values.username,
        password: values.password,
      })
    );
    if (res.payload?.accessToken) {
      navigate(previousLocationPathname ?? "/");
      setErrorText("");
    }
    setErrorText("Such user already exists.");
  };
  return (
    <main
      className={`flex justify-center items-center m-4 rounded-md border border-input bg-background ${styles.main}`}
    >
      <div className={[styles.panel, styles.panel_side].join(" ")}>
        <div className={styles.company_name}>Flat Valuator</div>
        <div className={styles.user_citation}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum tempore
          doloremque fugiat laudantium.
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className={styles.panel}>
        <CredentialsForm
          title="Signup"
          subTitle="Create a new account with login and password"
          buttonText="Signup"
          error={errorText}
          formSchema={formSchema}
          onFormSubmit={onSubmit}
        />
      </div>
    </main>
  );
};

export default Signup;

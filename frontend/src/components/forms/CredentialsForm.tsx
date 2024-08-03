import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import styles from "./CredentialsForm.module.scss";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodObject, ZodString } from "zod";

type schemaType = ZodObject<{ username: ZodString; password: ZodString }>;

type Props<T extends schemaType> = {
  title: string;
  subTitle: string;
  buttonText: string;
  error: string;
  formSchema: T;
  onFormSubmit: (values: z.infer<T>) => Promise<void>;
};

const CredentialsForm = ({
  title,
  subTitle,
  buttonText,
  error,
  formSchema,
  onFormSubmit,
}: Props<schemaType>) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className={styles.loginFormWrapper}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
      <div className={styles.form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={styles.submitButton}>
              {buttonText}
            </Button>
            {error && <div className={styles.error}>{error}</div>}
          </form>
        </Form>
      </div>
      <div className={styles.separator}>
        <div className={styles.separators} />
        <div className={styles.text}>OR CONTINUE WITH</div>
        <div className={styles.separators} />
      </div>
      <div className={styles.alternatives}>
        <Button variant="outline">
          {" "}
          <FaGithub className={styles.icon} />
          GitHub
        </Button>
        <Button variant="outline">
          <FaGoogle className={styles.icon} />
          Google
        </Button>
      </div>
    </div>
  );
};

export default CredentialsForm;

import { InfinitySpin } from "react-loader-spinner";
import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading_screen}>
      <InfinitySpin width="200" color="hsl(var(--primary))" />
    </div>
  );
};

export default Loading;

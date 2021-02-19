import ExportTypography from "antd/lib/typography/Typography";
import { useHistory } from "react-router-dom";

const useNavigation = () => {
  const history = useHistory();

  const goHome = () => history.push("/");
  return { history, goHome };
};

export default useNavigation;

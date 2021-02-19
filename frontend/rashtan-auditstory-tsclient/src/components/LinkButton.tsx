import React from "react";
import { Button } from "antd";
import useNavigation from "../hooks/useNavigation";
import { ButtonProps } from "antd/lib/button";

interface Props extends ButtonProps {
  to: string;
}

const LinkButton: React.FC<Props> = ({ to, ...rest }) => {
  const { history } = useNavigation();

  return <Button onClick={() => history.replace(to)} type="link" {...rest} />;
};

export default LinkButton;

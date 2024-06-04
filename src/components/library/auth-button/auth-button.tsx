import "./auth-button.scss";

import { Button } from "devextreme-react/button";

import { useAuth } from "../../../contexts/auth";

type AuthButtonProps = {
  action: "sign-in" | "sign-up" | "sign-out" | "reset-password";
};

export const AuthButton: React.FC<AuthButtonProps> = ({ action }) => {
  const auth = useAuth();

  let text = "" as string;
  let handler = undefined;

  switch (action) {
    default:
    case "sign-out":
      text = "Logout";
      handler = auth.signOut;
      break;

    case "sign-in":
      text = "Login";
      handler = auth.signIn;
      break;

    case "sign-up":
      text = "Register";
      handler = auth.signIn;
      break;

    case "reset-password":
      break;
  }

  return (
    <Button //
      text={text}
      onClick={handler}
    />
  );
};

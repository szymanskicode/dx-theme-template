import "./page-header.scss";
import Toolbar, { Item } from "devextreme-react/toolbar";

type PageHeaderProps = {
  label: string;
  children?: React.ReactNode;
  show?: boolean;
};

export const PageHeader = ({ label, show = true, children }: PageHeaderProps): JSX.Element => {
  return show ? (
    <Toolbar className="theme-dependent">
      <Item location="before">
        <div className="header-text">{label}</div>
      </Item>
      {children}
    </Toolbar>
  ) : (
    <></>
  );
};

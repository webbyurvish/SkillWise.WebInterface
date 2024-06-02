import { ReactNode } from "react";
import Header from "../Header/Header";

interface ViewsSectionBodyProps {
  children: ReactNode;
}

const ViewsSectionBody: React.FC<ViewsSectionBodyProps> = ({ children }) => {
  return (
    <div>
      <Header />
      ViewsSectionBody
      <div>{children}</div>
    </div>
  );
};

export default ViewsSectionBody;

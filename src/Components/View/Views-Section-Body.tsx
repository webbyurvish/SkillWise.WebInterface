import React, { ReactNode } from "react";
import Header from "../Header/Header";
import "./Style/Layout.css";

interface ViewsSectionBodyProps {
  children: ReactNode;
}

const ViewsSectionBody: React.FC<ViewsSectionBodyProps> = ({ children }) => {
  return (
    <div>
      <React.Fragment>
        <Header />
        <div className="main-cover">
          <div className="container-fluid">
            <div className="fixed-menu">
              <div className="title-text">
                <h3>FILTER</h3>
                <p>10 MENTORS</p>
              </div>
              <form>
                <div className="fillter-cover"></div>
              </form>
            </div>

            {/* ----- Children components ----- */}
            <div className="right-side-section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="mentor-card">
                    <div>{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
      {/* )} */}
    </div>
  );
};

export default ViewsSectionBody;

import { Grid } from "@mui/material";
import * as React from "react";
import image1 from "../pages/image1.jpg";
import "../pages/styles.css";

interface ILandingPageProps {}

const LandingPage: React.FunctionComponent<ILandingPageProps> = (props) => {
  return (
    <div className="d-flex flex-column  img-container">
      <img src={image1} className="landing-image" />
      {/* <img src={image2} className="landing-image" /> */}
    </div>
  );
};

export default LandingPage;

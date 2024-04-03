import { Box, Grid } from "@mui/material";
import * as React from "react";
import AsideSection from "../components/AsideSection";
import ProductsComponent from "../components/ProductsComponent";
import image1 from "../pages/image1.jpg";

interface IProductsPageProps {}

const ProductsPage: React.FunctionComponent<IProductsPageProps> = (props) => {
  return (
    <Box sx={{ mt: 5 }}>
      <Grid container>
        <Grid item sm={3}>
          <AsideSection />
        </Grid>
        <Grid item sm={9}>
          <ProductsComponent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsPage;

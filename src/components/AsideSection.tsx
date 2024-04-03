import { useState } from "react";
import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ContextType, ProductType } from "../types/types";
import { Context } from "../context/Context";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface IAsideSectionProps {}

const AsideSection: React.FunctionComponent<IAsideSectionProps> = (props) => {
  const {
    productList,
    updateProductList,
    category,
    updateCategory,
    mainList,
    check,
    updateCheck,
    selectedCategory,
    updateSelectedCategory,
  } = useContext(Context) as ContextType;

  const [minPrice, setMinPrice] = React.useState<number>(9);
  const [maxPrice, setMaxPrice] = React.useState<number>(1000);
  const [value, setValue] = React.useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setMinPrice(newValue);
    setValue([newValue, value[1]]);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setMaxPrice(newValue);
    setValue([value[0], newValue]);
  };

  const handleChange = (event: Event, newValue: [number, number]) => {
    setValue(newValue);
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handleReset = () => {
    setValue([9, 1000]);
    setMinPrice(9);
    setMaxPrice(1000);
    check
      ? updateProductList([
          ...mainList.filter(
            (product) => product.category === selectedCategory
          ),
        ])
      : updateProductList([...mainList]);
  };

  const handleChangeCommitted = () => {
    check
      ? updateProductList([
          ...mainList.filter(
            (product) =>
              product.category === selectedCategory &&
              product.price >= minPrice &&
              product.price <= maxPrice
          ),
        ])
      : updateProductList([
          ...mainList.filter(
            (product) => product.price >= minPrice && product.price <= maxPrice
          ),
        ]);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSelectedCategory((event.target as HTMLInputElement).value);
    if ((event.target as HTMLInputElement).value === "All") {
      updateProductList([...mainList]);
      updateCheck(false);
    } else {
      updateProductList([
        ...mainList.filter(
          (data) => data.category === (event.target as HTMLInputElement).value
        ),
      ]);
      updateCheck(true);
    }
  };

  const handleSorting = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch ((event.target as HTMLInputElement).value) {
      case "ascen":
        updateProductList([
          ...productList.toSorted((a: ProductType, b: ProductType) => {
            if (a.price < b.price) return -1;
            if (a.price > b.price) return 1;

            return 0;
          }),
        ]);
        break;

      case "descen":
        updateProductList([
          ...productList.toSorted((a: ProductType, b: ProductType) => {
            if (a.price < b.price) return 1;
            if (a.price > b.price) return -1;

            return 0;
          }),
        ]);
        break;

      case "rel":
        updateProductList([
          ...productList.toSorted((a: ProductType, b: ProductType) => {
            if (a.rating.rate < b.rating.rate) return -1;
            if (a.rating.rate > b.rating.rate) return 1;

            return 0;
          }),
        ]);
    }
  };

  return (
    <Box sx={{ borderRight: "1px solid whitesmoke", display: "flex-column" }}>
      <FormControl sx={{ mt: 5 }}>
        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ ml: 5 }}>
          Categories
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          // defaultValue={category[0]}
          // value={category[0]}
          onChange={handleCategoryChange}
        >
          {category.map((item) => (
            <FormControlLabel
              sx={{ ml: 5 }}
              value={item}
              control={<Radio />}
              label={item}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl sx={{ mt: 5 }}>
        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ ml: 5 }}>
          Sort
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          //   defaultValue={category[0]}
          value={category[0]}
          onChange={handleSorting}
        >
          <FormControlLabel
            sx={{ ml: 5 }}
            value="ascen"
            control={<Radio />}
            label="Price: Low to High"
          />
          <FormControlLabel
            sx={{ ml: 5 }}
            value="descen"
            control={<Radio />}
            label="Price: High to Low"
          />
          <FormControlLabel
            sx={{ ml: 5 }}
            value="rel"
            control={<Radio />}
            label="Relevance"
          />
        </RadioGroup>
      </FormControl>
      <Box sx={{ width: 150, marginLeft: 8 }}>
        <FormLabel sx={{ ml: 5 }}>Price Range :</FormLabel>
        <Slider
          // getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={9}
          max={1000}
          step={15}
          onChangeCommitted={handleChangeCommitted}
          // getAriaValueText={valuetext}
        />
        <TextField
          label="Min Price"
          variant="outlined"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          onBlur={handleChangeCommitted}
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Max Price"
          variant="outlined"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          onBlur={handleChangeCommitted}
          inputProps={{ min: 0 }}
        />
        <Button variant="contained" color="primary" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default AsideSection;

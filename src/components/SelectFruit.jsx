import React, {useState} from 'react'
// import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const fruits = [
//   "Apfel",
//   "Aprikose",
//   "Birne",
//   "Erdbeere",
//   "Heidelbeere",
//   "Himbeere",
//   "Johannisbeere",
//   "Kirsche",
//   "Stachelbeere",
//   "Weintraube",
//   "Pflaume",
//   "Sonstiges",
// ];



export default function SelectFruit() {
    // const theme = useTheme();
    const [fruitName, setFruitName] = useState([]);

    // Select Fruits Option
    const handleChange = (e) => {
      const {
        target: { value },
      } = e;
      setFruitName(typeof value === "string" ? value.split(",") : value);
    };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 320 }}>
        <InputLabel id="Obstsorte" sx={{ fontFamily: "Nunito" }}>
          Obstsorte
        </InputLabel>
        <Select
          name="type"
          labelId="Obstsorte"
          id="Obstsorte"
          multiple
          value={fruitName}
          onChange={handleChange}
          input={<OutlinedInput id="select-obstsorte" label="Obstsorte" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    backgroundColor: "#5a9481",
                    color: "white",
                    fontFamily: "Nunito",
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          // required
        >
          {/* {fruits.map((fruit) => (
            <MenuItem
              key={fruit}
              value={fruit}
              style={getStyles(fruit, fruitName, theme)}
            >
              {fruit}
            </MenuItem>
          ))} */}
        </Select>
      </FormControl>
    </div>
  );
}

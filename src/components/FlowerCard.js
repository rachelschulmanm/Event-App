import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";

const FlowerCard = ({ flower, choosedFlowers, setChoosedFlowers }) => {
  const handleUpdate = (e) => {
    if (e.target.checked) {
      if (!choosedFlowers.includes(flower.id)) {
        setChoosedFlowers((prev) => [...prev, flower.id]);
      }
    } else {
      const copy = [...choosedFlowers];
      const index = copy.indexOf(flower.id);
      if (index > -1) {
        // only splice array when item is found
        copy.splice(index, 1); // 2nd parameter means remove one item only
        setChoosedFlowers(copy);
      }
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={flower.image}
        title={flower.name}
      />
      <CardContent>
        {/*    <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      <CardActions>
        <FormControlLabel
          control={
            <Checkbox onClick={handleUpdate} checkedIcon={<Favorite />} />
          }
          label={"Choose " + flower.name}
        />
      </CardActions>
    </Card>
  );
};

export default FlowerCard;

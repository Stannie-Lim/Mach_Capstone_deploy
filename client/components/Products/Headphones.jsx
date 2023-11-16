// component imports
import React, { useState, useEffect } from "react";
import Axios from "axios";

// MUI imports
import {
  Container,
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";

//code that I worked on from 11-6 to 11-8//
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

const ItemsCard = ({ item }) => {
  const [count, setCount] = useState(1);

  const decrementQty = () => {
    setCount((prevCount) => prevCount > 1 && prevCount - 1);
  };

  const addToWishlist = (headphonesId) => {
    Axios.post(
      "http://localhost:3000/api/account/wishlist",
      {
        userId: "af7c1fe6-d669-414e-b066-e9733f0de7a8",
        productId: headphonesId,
      },
      {
        headers: {
          "Content-Type": "application/JSON",
        },
      }
    )
      .then((res) => res)
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (headphonesId) => {
    Axios.post(
      "http://localhost:3000/api/account/orders",
      {
        userId: "af7c1fe6-d669-414e-b066-e9733f0de7a8",
        productId: headphonesId,
        quantity: count,
      },
      {
        headers: {
          "Content-Type": "application/JSON",
        },
      }
    )
      .then((res) => res)
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ borderRadius: "10px" }}>
        <Box sx={{ width: "100%", height: 240, boxSizing: "border-box" }}>
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              p: 1,
              objectFit: "contain",
              boxSizing: "border-box",
            }}
            className="productCardImg"
            image={item.image}
            title={`${item.name} ${item.type}`}
            onClick={() => handleItemDetails(item.id)}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="text.secondary"
            component="div"
          >
            {item.brand}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {item.type}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              pt: 4,
              mb: 2,
              borderTop: "1px solid",
              borderColor: "background.main",
            }}
          >
            <Typography gutterBottom variant="h6" component="div">
              ${item.price}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={decrementQty}
                disabled={count === 1}
                sx={{ color: "primary.main" }}
              >
                <RemoveOutlinedIcon />
              </IconButton>
              <Typography color="text.secondary">{count}</Typography>
              <IconButton
                onClick={() => setCount((c) => c + 1)}
                sx={{ color: "primary.main" }}
              >
                <AddOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            color="error"
            sx={{ mr: "auto" }}
            onClick={() => addToWishlist(item.id)}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => addToCart(item.id)}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

///////////////////////////////////////////
const Headphones = () => {
  const [headphones, setHeadphones] = useState([]);

  useEffect(() => {
    Axios.post(
      "http://localhost:3000/api/products",
      {
        // userId: user && user.id,
        category: "Headphone",
      },
      {
        headers: {
          "Content-Type": "application/Json",
        },
      }
    )
      .then((res) => setHeadphones(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("Headphones state:", headphones); //just to double check some things

  return (
    <Container maxWidth="lg" sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Headphones
      </Typography>
      <Grid container spacing={2}>
        {headphones &&
          headphones.map((headphones) => (
            <ItemsCard key={headphones.id} item={headphones} />
          ))}
      </Grid>
    </Container>
  );
};

export default Headphones;

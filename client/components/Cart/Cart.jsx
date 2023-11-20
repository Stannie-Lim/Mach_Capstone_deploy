import React, { useState, useEffect } from "react";
import Axios from "axios";

// component imports
import useCurrentUser from "../CurrentUser";

// MUI imports
import { Container, Box, Typography } from "@mui/material";
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

//making cart updates to user now, removing hard coded user
const Cart = ({ user }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userId = user && user.id
    const inCart = true;

    Axios.get(`http://localhost:3000/api/orders/${userId}/${inCart}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  //add item to wishlist and remove from cart
  const addToWishlist = () => {};

  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px", p: 3 }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Cart
      </Typography>
      {cart ? (
        cart.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Typography variant="h6">{item.products.name}</Typography>
            <Typography>Quantity: {item.quantity}</Typography>
            {/* probably need to add more here ONCE I GET THIS TO WORK */}
          </Box>
        ))
      ) : (
        <Typography>Your cart is empty</Typography>
      )}
    </Container>
  );
};

export default Cart;

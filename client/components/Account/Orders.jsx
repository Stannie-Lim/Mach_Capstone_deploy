import React, { useState, useEffect } from "react";
import Axios from "axios";
// component imports

// MUI imports
import { Container } from "@mui/material";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BasicSelect = () => {
  const [ordersPlaced, setOrdersPlaced] = React.useState("");

  const handleChange = (event) => {
    setOrdersPlaced(event.target.value);
  };

  return (
    <Box
      sx={{
        // minWidth: 120
        width: "250px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Show Orders From</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ordersPlaced}
          label="ordersPlaced"
          onChange={handleChange}
        >
          <MenuItem value="last3Months">Last 3 months</MenuItem>
          <MenuItem value="4To6Months">4 - 6 months</MenuItem>
          <MenuItem value="7To9Months">7 - 9 months</MenuItem>
          <MenuItem value="10To12Months">10 - 12 months</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};


const BasicAccordion = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h8" style={{color: '#2998e2', fontWeight: 'bold'}}>See Order Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


const Orders = ({ user }) => {
  // state to hold orders
  const [orders, setOrders] = useState([]);

  // state to track whether orders are loading
  const [loading, setLoading] = useState(true);

  // axios call to get orders that have inCart column false by logged in user from db
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = user.id;
        const response = await Axios.get(
          `http://localhost:3000/api/orders/archive/${userId}`
        );
          console.log(userId)
        setOrders(response.data);
        setLoading(false);
        console.log(response)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user.id]);

  // function to add view order details
  // const viewOrderDetails = (orderId) => {
  //   console.log(orderId);
  // };

  return (
    <Container maxWidth="lg" sx={{ p: 3 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <Typography variant="h5">Order History</Typography>

        <BasicSelect />
      </div>
      {/* Conditional rendering based on the presence of orders */}
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : orders.length === 0 ? (
        <Typography variant="h6" style={{
          display: 'flex',
          justifyContent: 'center'
        }}>NO ORDER HISTORY AVAILABLE</Typography>
      ) : (
      <Grid
        container
        spacing={2}
        style={{
          background: 'linear-gradient(-225deg, #5D9FFF 0%, #2998e2 45%, #e2e7ec 100%)',
          display: "flex",
          flexDirection: "column",

        }}
      >
        {/* map through orders state to display all orders from the logged in user */}
      {/* button on each order item to click and view order details...dialog box opens up */}
      {/* Grid to display orders as cards */}

        {orders.map((order) => (
            // <Grid item key={order.id} xs={12} md={5} lg={4}>
            <Grid item key={order.id}>
              {/* <Card sx={{ height: "100%" }}> */}
              <Card style={{
                maxWidth: '98%',
                marginBottom: '16px'
              }}>
                <CardContent style={{
                  display: "flex",
                  flexDirection: "column"
                }}>
                  {/* Display order info */}
                  <Typography variant="h7" gutterBottom>
                    Order Date: {order.dateOrdered.slice(0,10)}
                  </Typography>
                  <Typography variant="h7" gutterBottom>
                    {/* Order #: {order.id} */}
                    Order #: {order.id.slice(0,8)}
                  </Typography>
                  <Typography variant="h7" gutterBottom style={{marginBottom: '10px'}}>
                    Total: ${order.total}
                  </Typography>
                  {/* To show items in order summary */}
                  <BasicAccordion style={{
              
                  }}/>
                  {/* Displaying images and product names */}
                  {/* {order.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <img
                        src={item.products.image}
                        alt={item.products.name}
                        style={{
                          marginRight: "8px",
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                      <Typography variant="body1">
                        {item.products.name}
                      </Typography>
                    </div>
                  ))}
                  <Button onClick={() => viewOrderDetails(order.id)}>
                    View Details
                  </Button> */}
                </CardContent>
              </Card>
            </Grid>
          ))}     
      </Grid>
      )}
    </Container>
  );
};

export default Orders;




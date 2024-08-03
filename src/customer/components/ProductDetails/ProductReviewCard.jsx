import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={5} gap={5}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155fd", marginLeft: '10px' }}
            ></Avatar>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <div className="space-y-2">
            <div>
              <p className="text-lg font-semibold">UserABC</p>
              <p className="opacity-70">July 7, 2024</p>
            </div>
          </div>

          <Rating value={4.5} name="half-rating" readOnly precision={.5}></Rating>
          <p>
            True to size. Colors are nice. No treads so good quality. Washes
            well no color lost and have not shrunk.{" "}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;

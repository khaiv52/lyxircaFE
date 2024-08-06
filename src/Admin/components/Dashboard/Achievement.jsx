import { Button, Card, CardContent, styled, Typography } from "@mui/material";
import React from "react";

const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

const Achievement = () => {
  return (
    <Card className="" sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          Lyxirca Shop
        </Typography>
        <Typography variant="body2">Congratulation 👏</Typography>
        <Typography variant="h5" sx={{ my: 3.1 }}>
          420.8k
        </Typography>
        <Button size="small" variant="contained">
          View Sales
        </Button>
        <TriangleImg src=""></TriangleImg>
        <TrophyImg src="https://lh3.googleusercontent.com/d/1LIPV7Qt2zXD_0Vi5m9pA-aSPLbpIz1AL"></TrophyImg>
      </CardContent>
    </Card>
  );
};

export default Achievement;

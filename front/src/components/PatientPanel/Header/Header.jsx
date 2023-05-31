import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Context } from "../../../context/ContextProvider";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const { patientDetail } = useContext(Context)[1];

  const { nombre, apellido, email, dni, telefono, ObraSocial } = patientDetail;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "normal",
          alignItems: "stretch",
          borderRadius: "10px",
          width: "100%",
        }}
      >
        <Card
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px",
            mb: "10px",
          }}
        >
          <CardHeader
            title={`Bienvenido ${nombre}`}
            subheader={email}
            sx={{
              color: "white",
            }}
          />
          <Card
            sx={{
              width: "40%",
              height: "18vh",
              marginRight: "10px",
              borderRadius: "10px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "10px",
                padding: "10px",
                bgcolor: theme.palette.primary.main,
              }}
            >
              <Typography
                sx={{
                  padding: "12px",
                  borderRadius: "10px",
                  width: "100%",
                  color: "white",
                }}
              >
                Datos Personales
              </Typography>
              <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
                {nombre + " " + apellido}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Divider orientation="vertical" flexItem />
                <Typography
                  sx={{ paddingLeft: "10px", paddingRight: "20px" }}
                  color="text.secondary"
                >
                  Dni: {dni}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography
                  sx={{ paddingLeft: "10px", paddingRight: "20px" }}
                  color="text.secondary"
                >
                  Telefono: {telefono}
                </Typography>
                <Divider orientation="vertical" flexItem />

                <Typography
                  sx={{ paddingLeft: "10px", paddingRight: "20px" }}
                  color="text.secondary"
                >
                  Obra social: {ObraSocial?.nombre}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        ></Box>
      </Box>
    </>
  );
};

export default Header;
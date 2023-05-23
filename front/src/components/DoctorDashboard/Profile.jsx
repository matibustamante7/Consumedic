import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Box, useMediaQuery, Rating } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PaidIcon from '@mui/icons-material/Paid';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';

import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";

const Profile = ({ doctorDetail }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('tablet'));

  const { id, nombre, apellido, direccion, Especialidads, imagen, Descripcion, CardMedia, precio, Opinions } = doctorDetail;
  console.log(doctorDetail);
  const especialidades = [];
  doctorDetail.Especialidads.map(espe=>especialidades.push(espe.name))
  especialidades.join(", ")
  const {pacientes, turnos,fetchPacientes,fetchTurnos,} = useContext(Context)[3];

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = Opinions.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  useEffect(()=>{
    fetchPacientes(id);
    fetchTurnos(id);
  },[])

  let cantTurnos = 0;
  if(turnos.viejosTurnos){
    cantTurnos+=turnos.viejosTurnos.length
  }
  if(turnos.futurosTurnos){
    cantTurnos+=turnos.futurosTurnos.length
  }
  const ingresos = (cantTurnos*precio).toLocaleString()

  let puntajesOpinions=[];
  if(Opinions.length>0){
    Opinions.map(opinion=>puntajesOpinions.push(opinion.puntaje))
  }
  let suma=0;
  let promedioOpiniones=0
  for(let i=0;i<puntajesOpinions.length;i++){
    suma=suma+puntajesOpinions[i]
  }
  if(Opinions.length){
    promedioOpiniones=suma/Opinions.length
  }

  return (
    <>
    <Box>
      <Box sx={{
        backgroundColor: theme.palette.primary.light,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        pt:"10px",
        pb:"20px",
        borderRadius:"10px 10px 0px 0px"
      }}>
        <Box sx={{flexDirection:"column", ml:"15px"}}>
          <Avatar alt={`${nombre} ${apellido}`} src={imagen} 
            sx={{
              width: isMobile ? '20vw' : '15vw', 
              minWidth:"100px",
              minHeight:"100px",
              height: isMobile ? '20vw' : '15vw',
            }}/>
        </Box>
        <Box sx={{flexDirection:"column", mr:"15px", textAlign:"right", alignItems:"start"}}>
          <Typography variant={isMobile ? "h6" : "h4"} sx={{textAlign:"right"}}>{nombre} {apellido}</Typography>
          <Typography variant={isMobile ? "body2" : "subtitle1"} sx={{textAlign:"right"}}>{especialidades}</Typography>
          <Typography variant={isMobile ? "body4" : "subtitle2"} sx={{textAlign:"right"}}>{Descripcion}</Typography>
        </Box>
      </Box>
      <Box  sx={{display:"flex", justifyContent:"space-evenly"}}>
          <Box 
            sx={{ 
              mt:"10px", 
              p:"0 10px 0 5px", 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems:"center", 
              width:"170px", 
              border:"1px solid lightgrey", 
              borderRadius:"5px",
              backgroundColor: "#8f8f8f",
            }}
          >
            <Box sx={{ display:"flex", mt:"5px", alignItems:"center", width:"150px", justifyContent:"space-evenly"}}>
              <Box>
                <PersonIcon fontSize="large"/>
              </Box>
              <Box sx={{flexDirection:"column", ml:"10px", mt:"7px", mb:"10px", textAlign:"center"}}>
                <Typography component="div" variant="subtitle1">
                  Pacientes
                </Typography>
                <Typography variant="subtitle1">{pacientes.length}</Typography>
              </Box>
            </Box>
          </Box>
          <Box 
            sx={{ 
              mt:"10px", 
              p:"0 10px 0 5px", 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems:"center", 
              width:"170px", 
              border:"1px solid lightgrey", 
              borderRadius:"5px",
              backgroundColor: "#8f8f8f",
              maxWidth:"200px"
            }}
          >
            <Box sx={{ display:"flex", mt:"5px", alignItems:"center", width:"150px", justifyContent:"space-evenly"}}>
              <Box>
                <DateRangeIcon fontSize="large"/>
              </Box>
              <Box sx={{flexDirection:"column", ml:"10px", mt:"7px", mb:"10px", textAlign:"center"}}>
                <Typography component="div" variant="subtitle1">
                  Turnos
                </Typography>
                <Typography variant="subtitle1">{cantTurnos}</Typography>
              </Box>
            </Box>
          </Box>
          <Box 
            sx={{ 
              mt:"10px", 
              p:"0 10px 0 5px", 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems:"center", 
              width:"170px", 
              border:"1px solid lightgrey", 
              borderRadius:"5px",
              backgroundColor: "#8f8f8f",
              maxWidth:"200px"
            }}
          >
            <Box sx={{ display:"flex", mt:"5px", alignItems:"center", width:"150px", justifyContent:"space-evenly"}}>
              <Box>
                <PaidIcon fontSize="large"/>
              </Box>
              <Box sx={{flexDirection:"column", ml:"10px", mt:"7px", mb:"10px", textAlign:"center"}}>
                <Typography component="div" variant="subtitle1">
                  Ingresos
                </Typography>
                <Typography variant="subtitle1">{`$ ${ingresos}`}</Typography>
              </Box>
            </Box>
          </Box>
          <Box 
            sx={{ 
              mt:"10px", 
              p:"0 10px 0 5px", 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems:"center", 
              width:"170px", 
              border:"1px solid lightgrey", 
              borderRadius:"5px",
              backgroundColor: "#8f8f8f",
              maxWidth:"200px"
            }}
          >
            <Box sx={{ display:"flex", mt:"5px", alignItems:"center", width:"150px", justifyContent:"space-evenly"}}>
              <Box>
                <CommentIcon fontSize="large"/>
              </Box>
              <Box sx={{flexDirection:"column", ml:"10px", mt:"7px", mb:"10px", textAlign:"center"}}>
                <Typography component="div" variant="subtitle1">
                  Opiniones
                </Typography>
                <Typography variant="subtitle1">{Opinions.length}</Typography>
              </Box>
            </Box>
          </Box>
          <Box 
            sx={{ 
              mt:"10px", 
              p:"0 10px 0 5px", 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems:"center", 
              width:"170px", 
              border:"1px solid lightgrey", 
              borderRadius:"5px",
              backgroundColor: "#8f8f8f",
              maxWidth:"200px"
            }}
          >
            <Box sx={{ display:"flex", mt:"5px", alignItems:"center", width:"150px", justifyContent:"space-evenly"}}>
              <Box>
                <StarIcon fontSize="large"/>
              </Box>
              <Box sx={{flexDirection:"column", ml:"10px", mt:"7px", mb:"10px", textAlign:"center"}}>
                <Typography component="div" variant="subtitle1">
                  Rating
                </Typography>
                <Typography variant="subtitle1">{promedioOpiniones}</Typography>
              </Box>
            </Box>
          </Box>
      </Box>
      <Box sx={{display: "flex",justifyContent:"center", alignItems:"center"}}>
          <Box
            sx={{
              display: "flex",flexDirection: "column",alignItems: "flex-start",
              border: "solid 1px", width: "500px",justifyContent:"center",
              mt:"30px", p:"10px"
            }}
          >
            <Typography sx={{}}>Opiniones de Pacientes</Typography>
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 30,
                pl: 2,
                bgcolor: theme.palette.primary.light,
                borderRadius: "5px",
                p: "25px",
                width: "100%",
              }}
            >
              <Typography sx={{color: "white",pl: "30px",}}>{Opinions[activeStep].PacienteTypeId}</Typography>
            </Paper>
            <Box component="fieldset" mb={1} borderColor="transparent">
              <Rating name="stars" sx={{ color: theme.palette.primary.main }}
                value={Opinions[activeStep].puntaje}
                readOnly
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                pb: "30px",
              }}
            >
              {Opinions[activeStep].mensaje}
            </Box>
            <MobileStepper
              variant="text"
              opinions={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Siguiente
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Atras
                </Button>
              }
            />
        </Box>
      </Box>      
    </Box>
    </>
  );
};
export default Profile;

// const opinions = [
//   {
//     name: "John Doe",
//     text: "Excelente servicio. Muy recomendado.",
//     stars: 5,
//     img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
//   },
//   {
//     name: "Jane Smith",
//     text: "Buen trato y atención al paciente.",
//     stars: 4,
//     img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
//   },
//   {
//     name: "Michael Johnson",
//     text: "No quedé satisfecho con la atención recibida.",
//     stars: 2,
//     img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
//   },
//   {
//     name: "John Doe",
//     text: "Excelente servicio. Muy recomendado.",
//     stars: 5,
//     img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
//   },
//   {
//     name: "Jane Smith",
//     text: "Buen trato y atención al paciente.",
//     stars: 4,
//     img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
//   },
//   {
//     name: "Michael Johnson",
//     text: "No quedé satisfecho con la atención recibida.",
//     stars: 2,
//     img: "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg",
//   },
// ];

{/* <Box
sx={{
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "45rem",
}}
>
<Box
sx={{
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  pb: "10px",
}}
>
<CardContent
sx={{
  bgcolor: theme.palette.primary.main,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            width: "95%",
            borderRadius: "10px",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={imagen}
            sx={{
              width: 200,
              height: 200,
            }}
          />
          <Box
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "white",
              width: "50%",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div">
                Hola Dr. {nombre + " " + apellido}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Aqui puede ver todos sus datos.
              </Typography>
            </Grid>
          </Box>
        </CardContent>
      </Box>
      <Box
        container
        sx={{
          display: "flex",
          width: "90%",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            pb: "20px",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {nombre + " " + apellido}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              pb: "1px",
            }}
          >
            {doctorDetail.Especialidads?.length &&
              doctorDetail.Especialidads.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {direccion}
          </Typography>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total pascientes
            <AvatarGroup total={pacientes.length}>
              <Avatar
                alt="Remy Sharp"
                src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
              />
              <Avatar
                alt="Travis Howard"
                src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
              />
              <Avatar
                alt="Agnes Walker"
                src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
              />
            </AvatarGroup>
          </Typography>
        </Grid>
      </Box>
      <Box sx={{ width: "30%", mt: "40px" }}>
        <Grid container>
          <Opinions opinions={opinions} />
        </Grid>
      </Box>
    </Box> */}
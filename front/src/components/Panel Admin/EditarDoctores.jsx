import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  Stack,
  Divider,
  Typography,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const EditarDoctores = () => {
  const { doctors, fetchDoctors, fetchDoctorByEmail, deleteDoctor } =
    useContext(Context)[0];
  const { setVista, setEmail } = useContext(Context)[6];

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [fetched, setfetched] = useState(false);
  useEffect(() => {
    if (doctors.length === 0 && !fetched) {
      fetchDoctors();
      setfetched(true);
    } else {
      setLoading(false);
    }
  }, [doctors]);

  useEffect(() => {
    // filtro para buscar por nombre
    const filtered = doctors.filter((doctor) =>
      doctor.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  const handleClick = (event) => {
    const email = event.target.id;
    fetchDoctorByEmail(email);
    setEmail(email);
    setVista(4);
  };

  const handleClickDelete = (id) => {
    deleteDoctor(id)
      .then(() => {
        // Eliminación exitosa, actualizar la lista de doctores
        fetchDoctors();
      })
      .catch((error) => {
        console.log("Error al eliminar el doctor:", error);
        // Manejar el error de eliminación del doctor
      });
  };

  // Lógica para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: "0px 0 10px 0",
        }}
      >
        <Typography
          style={{
            fontSize: "larger",
            fontWeight: "600",
            backgroundColor: "#009BFF",
          }}
        >
          Listado de Doctores
        </Typography>
      </Box>
      <Divider />
      <Container>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre"
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "#009BFF" }} // Cambia el color del campo de búsqueda
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead
              style={{
                backgroundColor: "lightgray",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableRow>
                <TableCell align="left">Nombre y Apellido</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Teléfono</TableCell>
                <TableCell align="center">Ver Detalles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Cargando...
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell align="left">{`${doctor.nombre} ${doctor.apellido}`}</TableCell>
                    <TableCell align="center">{doctor.email}</TableCell>
                    <TableCell align="center">{doctor.id}</TableCell>
                    <TableCell align="center">{doctor.telefono}</TableCell>
                    <TableCell align="center">
                      <Button
                        id={doctor.email}
                        onClick={handleClick}
                        variant="outlined"
                        size="small"
                      >
                        Acceder
                      </Button>
                      <Button
                        id={doctor.id}
                        onClick={() => handleClickDelete(doctor.id)}
                        variant="outlined"
                        color="warning"
                        size="small"
                      >
                        X
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {!loading && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            mt={1}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
            />
          </Stack>
        )}
      </Container>
    </>
  );
};

export default EditarDoctores;
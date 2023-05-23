import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import { DataGrid } from "@material-ui/data-grid";
import { Box, Skeleton } from "@mui/material";

const MyDates = () => {
  const { informacion, fetchPatientData } = useContext(Context)[5];
  const { patientDetail } = useContext(Context)[1];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPatientData(patientDetail.id).then(() => {
      setLoading(false);
    });

    if (!!informacion.length) {
      setLoading(false);
    }
  }, [patientDetail.id]);

  console.log("informacion", informacion);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 150,
      editable: true,
    },
    {
      field: "hora",
      headerName: "Hora",
      width: 150,
      editable: true,
    },
    {
      field: "imagen",
      headerName: "Foto",
      width: 150,
      editable: true,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 150,
      editable: true,
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 150,

      editable: true,
    },
    {
      field: "especialidad",
      headerName: "Especialidad",
      width: 150,
      editable: true,
    },

    {
      field: "descripcion",
      headerName: "Descripcion",
      width: 150,
      editable: true,
    },
    {
      field: "respuestaMedico",
      headerName: "Informe medico",
      width: 150,
      editable: true,
    },
  ];

  const informacionData = informacion.map((item) => {
    const citas = item.Cita.map((cita) => ({
      fecha: cita.fecha,
      hora: cita.hora,
      descripcion: cita.descripcion,
      respuestaMedico: cita.respuestaMedico,
    }));

    const especialidades = item.Especialidads.map((especialidad) => ({
      especialidad: especialidad.name,
    }));

    const fechas = citas.map((cita) => cita.fecha);
    const horas = citas.map((cita) => cita.hora);
    const descripciones = citas.map((cita) =>
      cita.descripcion ? cita.descripcion : "No hay descripción"
    );
    const respuestasMedico = citas.map((cita) =>
      cita.respuestaMedico
        ? cita.respuestaMedico
        : "No hay informe medico médico"
    );

    const especialidadName = especialidades.map(
      (especialidad) => especialidad.especialidad
    );
    return {
      id: item.id,
      imagen: item.imagen,
      apellido: item.apellido,
      nombre: item.nombre,
      especialidad: especialidadName,
      fecha: fechas,
      hora: horas,
      descripcion: descripciones,
      respuestaMedico: respuestasMedico,
    };
  });

  return (
    <>
      <Box>Este es tu historial de citas</Box>
      {loading ? (
        <div>Cargando</div>
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          {!informacion.length ? (
            <>
              <Skeleton>No datos para mostar</Skeleton>
            </>
          ) : (
            <DataGrid
              disableSelectionOnClick
              rows={informacionData}
              columns={columns}
              pageSize={5}
              checkboxSelection
              rowsPerPageOptions={[5, 10, 20]}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default MyDates;
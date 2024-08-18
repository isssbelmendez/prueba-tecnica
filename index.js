import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000; // Define el puerto

// Parseamos el cuerpo de las solicitudes
app.use(bodyParser.json());

// Ruta para la raíz del sitio web
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de gestión de tareas');
});

// Base de datos simulada en memoria
let tareas = [
    { id: 1, titulo: "Comprar alimentos", descripcion: "Comprar frutas, verduras y pan", completado: false },
    { id: 2, titulo: "Hacer ejercicio", descripcion: "Hacer 30 minutos de ejercicio cardiovascular", completado: false },
    { id: 3, titulo: "Leer un Libro", descripcion: "Leer al menos un capítulo del libro", completado: true }
];

// OBTENER TODAS LAS TAREAS
app.get('/tareas', (req, res) => {
    res.json(tareas);
});

// CREAR UNA NUEVA TAREA
app.post('/tareas', (req, res) => {
    const nuevaTarea = {
        id: tareas.length + 1,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        completado: req.body.completado || false
    };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// ACTUALIZAR UNA TAREA EXISTENTE
app.put('/tareas/:id', (req, res) => {
    const tareaId = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === tareaId);

    if (!tarea) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
    tarea.titulo = req.body.titulo || tarea.titulo;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.completado = req.body.completado !== undefined ? req.body.completado : tarea.completado;

    res.json(tarea);
});

// ELIMINAR UNA TAREA 
app.delete('/tareas/:id', (req, res) => { // Corregido el comentario
    const tareaId = parseInt(req.params.id);
    const tareaIndex = tareas.findIndex(t => t.id === tareaId);

    if (tareaIndex === -1) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }

    tareas.splice(tareaIndex, 1);
    res.status(204).send();
});

// INICIAR EL SERVIDOR
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

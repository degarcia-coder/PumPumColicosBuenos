document.addEventListener('DOMContentLoaded', () => {
    Auth.verificarSesion();

    // Logout
    document.getElementById('btn-logout').addEventListener('click', async () => {
        await AuthService.logout();
        Auth.cerrarSesion();
    });

    // Cargar empleados al iniciar
    cargarEmpleados();

    document.getElementById('btn-filtrar').addEventListener('click', () => {
        const filtros = {};
        const documento = document.getElementById('filtro-documento').value.trim();
        const area      = document.getElementById('filtro-area').value.trim();
        const estado    = document.getElementById('filtro-estado').value;

        if (documento) filtros.documento = documento;
        if (area)      filtros.area      = area;
        if (estado)    filtros.estado    = estado;

        cargarEmpleados(filtros);
    });

    // Crear empleado
    document.getElementById('form-empleado').addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            nombres:       document.getElementById('nombres').value.trim(),
            apellidos:     document.getElementById('apellidos').value.trim(),
            documento:     document.getElementById('documento').value.trim(),
            correo:        document.getElementById('correo').value.trim(),
            telefono:      document.getElementById('telefono').value.trim(),
            cargo:         document.getElementById('cargo').value.trim(),
            area:          document.getElementById('area').value.trim(),
            fecha_ingreso: document.getElementById('fecha_ingreso').value,
        };

        const respuesta = await EmpleadosService.crear(data);

        if (respuesta.status === 'success') {
            mostrarMensaje('Empleado creado correctamente', 'success');
            document.getElementById('form-empleado').reset();
            cargarEmpleados();
        } else {
            mostrarMensaje(respuesta.mensaje, 'error');
        }
    });
});

async function cargarEmpleados(filtros = {}) {
    const respuesta = await EmpleadosService.listar(filtros);
    const tabla     = document.getElementById('tabla-empleados');
    tabla.innerHTML = '';

    if (respuesta.status === 'success') {
        respuesta.empleados.forEach(emp => {
            tabla.innerHTML += `
                <tr>
                    <td>${emp.nombres} ${emp.apellidos}</td>
                    <td>${emp.documento}</td>
                    <td>${emp.correo}</td>
                    <td>${emp.cargo}</td>
                    <td>${emp.area}</td>
                    <td>${emp.estado}</td>
                    <td>
                        <button onclick="cambiarEstado(${emp.id}, '${emp.estado}')">
                            ${emp.estado === 'activo' ? 'Desactivar' : 'Activar'}
                        </button>
                    </td>
                </tr>
            `;
        });
    }
}

async function cambiarEstado(id, estadoActual) {
    const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';
    const respuesta   = await EmpleadosService.cambiarEstado(id, nuevoEstado);

    if (respuesta.status === 'success') {
        mostrarMensaje('Estado actualizado correctamente', 'success');
        cargarEmpleados();
    } else {
        mostrarMensaje(respuesta.mensaje, 'error');
    }
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent    = texto;
    mensaje.className      = tipo;
    mensaje.style.display  = 'block';
    setTimeout(() => mensaje.style.display = 'none', 3000);
}
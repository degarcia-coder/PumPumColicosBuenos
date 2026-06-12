document.addEventListener('DOMContentLoaded', () => {
    Auth.verificarSesion();

    // Logout
    document.getElementById('btn-logout').addEventListener('click', async () => {
        await AuthService.logout();
        Auth.cerrarSesion();
    });

    cargarIncapacidades();

    // Filtros
    document.getElementById('btn-filtrar').addEventListener('click', () => {
        const filtros = {};
        const empleado_id = document.getElementById('filtro-empleado').value.trim();
        const estado      = document.getElementById('filtro-estado').value;
        const tipo        = document.getElementById('filtro-tipo').value;

        if (empleado_id) filtros.empleado_id = empleado_id;
        if (estado)      filtros.estado      = estado;
        if (tipo)        filtros.tipo        = tipo;

        cargarIncapacidades(filtros);
    });

    // Registrar incapacidad
    document.getElementById('form-incapacidad').addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            empleado_id:         document.getElementById('empleado_id').value.trim(),
            fecha_inicio:        document.getElementById('fecha_inicio').value,
            fecha_fin:           document.getElementById('fecha_fin').value,
            tipo:                document.getElementById('tipo').value,
            diagnostico_general: document.getElementById('diagnostico_general').value.trim(),
            entidad_medica:      document.getElementById('entidad_medica').value.trim(),
            observaciones:       document.getElementById('observaciones').value.trim(),
        };

        const respuesta = await IncapacidadesService.registrar(data);

        if (respuesta.status === 'success') {
            mostrarMensaje('Incapacidad registrada correctamente', 'success');
            document.getElementById('form-incapacidad').reset();
            cargarIncapacidades();
        } else {
            mostrarMensaje(respuesta.mensaje, 'error');
        }
    });
});

async function cargarIncapacidades(filtros = {}) {
    const respuesta = await IncapacidadesService.listar(filtros);
    const tabla     = document.getElementById('tabla-incapacidades');
    tabla.innerHTML = '';

    if (respuesta.status === 'success') {
        respuesta.incapacidades.forEach(inc => {
            tabla.innerHTML += `
                <tr>
                    <td>${inc.empleado_id}</td>
                    <td>${inc.tipo}</td>
                    <td>${inc.fecha_inicio}</td>
                    <td>${inc.fecha_fin}</td>
                    <td>${inc.dias_incapacidad} días</td>
                    <td>${inc.estado}</td>
                    <td>
                        <button onclick="finalizar(${inc.id})"
                            ${inc.estado === 'finalizada' ? 'disabled' : ''}>
                            Finalizar
                        </button>
                    </td>
                </tr>
            `;
        });
    }
}

async function finalizar(id) {
    const respuesta = await IncapacidadesService.finalizar(id);

    if (respuesta.status === 'success') {
        mostrarMensaje('Incapacidad finalizada correctamente', 'success');
        cargarIncapacidades();
    } else {
        mostrarMensaje(respuesta.mensaje, 'error');
    }
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent   = texto;
    mensaje.className     = tipo;
    mensaje.style.display = 'block';
    setTimeout(() => mensaje.style.display = 'none', 3000);
}
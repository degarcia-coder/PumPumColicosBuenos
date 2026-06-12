document.addEventListener('DOMContentLoaded', () => {
    Auth.verificarSesion();

    // Logout
    document.getElementById('btn-logout').addEventListener('click', async () => {
        await AuthService.logout();
        Auth.cerrarSesion();
    });

    cargarSeguimientos();

    // Filtros
    document.getElementById('btn-filtrar').addEventListener('click', () => {
        const filtros = {};
        const incapacidad_id = document.getElementById('filtro-incapacidad').value.trim();
        const estado         = document.getElementById('filtro-estado').value;

        if (incapacidad_id) filtros.incapacidad_id = incapacidad_id;
        if (estado)         filtros.estado         = estado;

        cargarSeguimientos(filtros);
    });

    // Registrar seguimiento
    document.getElementById('form-seguimiento').addEventListener('submit', async (e) => {
        e.preventDefault();

        const usuario  = Auth.getUsuario();

        const data = {
            incapacidad_id:       document.getElementById('incapacidad_id').value.trim(),
            fecha:                document.getElementById('fecha').value,
            comentario:           document.getElementById('comentario').value.trim(),
            estado:               document.getElementById('estado').value,
            usuario_responsable:  usuario.usuario || usuario.correo,
        };

        const respuesta = await SeguimientoService.registrar(data);

        if (respuesta.status === 'success') {
            mostrarMensaje('Seguimiento registrado correctamente', 'success');
            document.getElementById('form-seguimiento').reset();
            cargarSeguimientos();
        } else {
            mostrarMensaje(respuesta.mensaje, 'error');
        }
    });
});

async function cargarSeguimientos(filtros = {}) {
    const respuesta = await SeguimientoService.listar(filtros);
    const tabla     = document.getElementById('tabla-seguimientos');
    tabla.innerHTML = '';

    if (respuesta.status === 'success') {
        respuesta.seguimientos.forEach(seg => {
            tabla.innerHTML += `
                <tr>
                    <td>${seg.incapacidad_id}</td>
                    <td>${seg.fecha}</td>
                    <td>${seg.comentario}</td>
                    <td>${seg.estado}</td>
                    <td>${seg.usuario_responsable}</td>
                </tr>
            `;
        });
    }
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent   = texto;
    mensaje.className     = tipo;
    mensaje.style.display = 'block';
    setTimeout(() => mensaje.style.display = 'none', 3000);
}
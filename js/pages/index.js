document.addEventListener('DOMContentLoaded', () => {
    // Si ya hay sesión activa, redirige al dashboard
    if (Auth.getToken()) {
        window.location.href = 'dashboard.html';
    }

    const formulario = document.getElementById('form-login');
    const mensajeError = document.getElementById('mensaje-error');

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const credencial = document.getElementById('credencial').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();

        // Validación básica en cliente
        if (!credencial || !contrasena) {
            mensajeError.textContent = 'Por favor ingresa todos los campos.';
            mensajeError.style.display = 'block';
            return;
        }

        try {
            const respuesta = await AuthService.login(credencial, contrasena);

            if (respuesta.status === 'success') {
                // Guarda sesión y redirige
                Auth.guardarSesion(respuesta.token, respuesta.usuario);
                window.location.href = 'dashboard.html';
            } else {
                mensajeError.textContent = respuesta.mensaje;
                mensajeError.style.display = 'block';
            }
        } catch (error) {
            mensajeError.textContent = 'Error al conectar con el servidor.';
            mensajeError.style.display = 'block';
        }
    });
});
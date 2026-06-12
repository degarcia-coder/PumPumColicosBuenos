const Auth = {
    guardarSesion(token, usuario) {
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
    },

    // Se obtiene el token
    getToken() {
        return localStorage.getItem('token');
    },

    // Se obtiene la info del usuario
    getUsuario() {
        const usuario = localStorage.getItem('usuario');
        return usuario ? JSON.parse(usuario) : null;
    },

    // Verifica si hay sesión activa, si no redirige al login
    verificarSesion() {
        if (!this.getToken()) {
            window.location.href = 'index.html';
        }
    },

    // Borra la sesión
    cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = 'index.html';
    }
};
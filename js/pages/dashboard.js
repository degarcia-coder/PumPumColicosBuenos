document.addEventListener('DOMContentLoaded', () => {
    Auth.verificarSesion();

    const usuario = Auth.getUsuario();

    document.getElementById('nombre-usuario').textContent = usuario.nombre;
    document.getElementById('rol-usuario').textContent = usuario.rol;

    // Logout
    document.getElementById('btn-logout').addEventListener('click', async () => {
        await AuthService.logout();
        Auth.cerrarSesion();
    });
});
const AuthService = {
    // Envía credenciales y recibe token
    async login(credencial, contrasena) {
        const response = await fetch(`${API.auth}/auth/ingreso`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: credencial,
                contrasena: contrasena
            })
        });
        return await response.json();
    },

    // Invalida el token en el backend
    async logout() {
        const response = await fetch(`${API.auth}/auth/salida`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        return await response.json();
    },

    // Verifica si el token sigue activo
    async validarSesion() {
        const response = await fetch(`${API.auth}/auth/validar`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        return await response.json();
    }
};
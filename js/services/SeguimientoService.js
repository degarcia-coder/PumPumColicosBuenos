const SeguimientoService = {
    // Trae todo el historial, acepta filtros opcionales
    async listar(filtros = {}) {
        const params = new URLSearchParams(filtros);
        const response = await fetch(`${API.seguimiento}/seguimientos?${params}`, {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        return await response.json();
    },

    // Registra un nuevo seguimiento
    async registrar(data) {
        const response = await fetch(`${API.seguimiento}/seguimientos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    // Actualiza el estado de una incapacidad
    async actualizarEstado(id, data) {
        const response = await fetch(`${API.seguimiento}/seguimientos/${id}/estado`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
};
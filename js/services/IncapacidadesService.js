const IncapacidadesService = {
    // Trae todas las incapacidades, acepta filtros opcionales
    async listar(filtros = {}) {
        const params = new URLSearchParams(filtros);
        const response = await fetch(`${API.incapacidades}/incapacidades?${params}`, {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        return await response.json();
    },

    // Registra una nueva incapacidad
    async registrar(data) {
        const response = await fetch(`${API.incapacidades}/incapacidades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    // Edita una incapacidad existente
    async editar(id, data) {
        const response = await fetch(`${API.incapacidades}/incapacidades/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    // Marca una incapacidad como finalizada
    async finalizar(id) {
        const response = await fetch(`${API.incapacidades}/incapacidades/${id}/finalizar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        return await response.json();
    }
};
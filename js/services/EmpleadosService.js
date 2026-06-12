const EmpleadosService = {
    // Trae todos los empleados, acepta filtros opcionales
    async listar(filtros = {}) {
        const params = new URLSearchParams(filtros);
        const response = await fetch(`${API.empleados}/empleados?${params}`, {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        return await response.json();
    },

    // Crea un nuevo empleado
    async crear(data) {
        const response = await fetch(`${API.empleados}/empleados`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    // Edita un empleado existente
    async editar(id, data) {
        const response = await fetch(`${API.empleados}/empleados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    // Cambia el estado de un empleado
    async cambiarEstado(id, estado) {
        const response = await fetch(`${API.empleados}/empleados/${id}/estado`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify({ estado })
        });
        return await response.json();
    }
};
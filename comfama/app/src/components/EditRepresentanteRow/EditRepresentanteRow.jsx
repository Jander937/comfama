import React, { useState } from 'react';

const EditRepresentanteRow = ({ representante, onSave, onCancel }) => {
    const [editRepresentante, setEditRepresentante] = useState({ ...representante });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditRepresentante((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(editRepresentante);
    };

    return (
        <tr id='jander'>
            <td>
                <input
                    type="text"
                    name="primer_nombre"
                    value={editRepresentante.primer_nombre}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="primer_apellido"
                    value={editRepresentante.primer_apellido}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="telefono_celular"
                    value={editRepresentante.telefono_celular}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="numero_documento"
                    value={editRepresentante.numero_documento}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="email"
                    value={editRepresentante.email}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <button onClick={handleSave}>Guardar</button>
                <button onClick={onCancel}>Cancelar</button>
            </td>
        </tr>
    );
};

export default EditRepresentanteRow;

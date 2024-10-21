import React from 'react';
import Button from 'react-bootstrap/Button'; // Import the Button component

const DeleteButton = ({ id_representante, onDeletionSuccess }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v7/representante/delete/${id_representante}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Call the onDeletionSuccess function passed as a prop
            onDeletionSuccess(id_representante);
        } catch (error) {
            console.error('Error al eliminar el representante:', error);
        }
    };

    return (
        <Button variant="danger" onClick={handleDelete}>
            Eliminar
        </Button>
    );
};

export default DeleteButton;

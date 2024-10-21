import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const CreateRepresentanteButton = ({ onRepresentanteCreated }) => {
    const [show, setShow] = useState(false);
    const [newRepresentante, setNewRepresentante] = useState({
        primer_nombre: '',
        primer_apellido: '',
        telefono_celular: '',
        numero_documento: '',
        email: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRepresentante({ ...newRepresentante, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v7/representante/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRepresentante),
            });

            if (response.ok) {
                onRepresentanteCreated();
                handleClose();
                setNewRepresentante({
                    primer_nombre: '',
                    primer_apellido: '',
                    telefono_celular: '',
                    numero_documento: '',
                    email: ''
                });
            } else {
                console.error('Error al crear el libro:', await response.text());
            }
        } catch (error) {
            console.error('Error al crear el libro:', error);
        }
    };

    return (
        <>
            <Button id="crear" variant="primary" onClick={handleShow}>
                Añadir Nuevo Representante
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Representante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Primer Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="primer_nombre"
                                required
                                value={newRepresentante.primer_nombre}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Primer Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="primer_apellido"
                                required
                                value={newRepresentante.primer_apellido}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telefono Celular</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono_celular"
                                required
                                value={newRepresentante.telefono_celular}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Numero Documento</Form.Label>
                            <Form.Control
                                type="text"
                                name="numero_documento"
                                value={newRepresentante.numero_documento}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Telefono Celular</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono_celular"
                                value={newRepresentante.telefono_celular}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={newRepresentante.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Crear
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateRepresentanteButton;

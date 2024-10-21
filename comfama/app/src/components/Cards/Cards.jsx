import React, { useState, useEffect } from "react";
import DeleteButton from '../DeleteButton/DeleteButton'; // Make sure this path is correct
import EditRepresentanteRow from "../EditRepresentanteRow/EditRepresentanteRow"; // Make sure this path is correct
import CreateRepresentanteButton from '../CreateRepresentanteButton/CreateRepresentanteButton';
import SearchRepresentante from '../SearchRepresentante/SearchRepresentante';
import Card from 'react-bootstrap/Card'; // Import Card from react-bootstrap
import Button from 'react-bootstrap/Button';
import './Cards.css';  // Import Button from react-bootstrap

function Cards() {
    const [representanteData, setRepresentanteData] = useState([]);
    const [editingRepresentante, setEditingRepresentante] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateRepresentante = async (representante) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v7/representante/${representante.id_representante}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(representante),
            });

            if (response.ok) {
                console.log('Representante actualizado con éxito');
                setRepresentanteData(representanteData.map(b => b.id_representante === representante.id_representante ? representante : b));
                setEditingRepresentante(null); // Exit editing mode
            } else {
                console.error('Error al actualizar el Representante:', await response.text());
            }
        } catch (error) {
            console.error('Error al actualizar el Representante:', error);
        }
    };

    const cancelEdit = () => {
        setEditingRepresentante(null);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v7/representante/search');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRepresentanteData(data);
        } catch (error) {
            console.error('Error al obtener los representantes:', error);
        }
    };

    const handleRepresentanteCreated = () => {
        fetchData(); 
    };

    const onDeletionSuccess = (id_representante) => {
        setRepresentanteData(representanteData.filter(representante => representante.id_representante !== id_representante));
    };

    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
    };

    const filteredRepresentante = searchTerm
    ? representanteData.filter(representante =>
        (representante.primer_nombre && representante.primer_nombre.toLowerCase().includes(searchTerm)) ||
        (representante.primer_apellido && representante.primer_apellido.toLowerCase().includes(searchTerm)) ||
        (representante.telefono_celular && representante.telefono_celular.toString().toLowerCase().includes(searchTerm)) ||
        (representante.numero_documento && representante.numero_documento.toLowerCase().includes(searchTerm)) ||
        (representante.email && representante.email.toString().toLowerCase().includes(searchTerm))
      )
    : representanteData;
    return (
        <div id="lucho">
            <CreateRepresentanteButton onRepresentanteCreated={handleRepresentanteCreated} />
            <SearchRepresentante onSearch={handleSearch} />
            {filteredRepresentante.map((representante) => {
                if (editingRepresentante && representante.id_representante === editingRepresentante.id_representante) {
                    return (
                        <EditRepresentanteRow
                            key={representante.id_representante}
                            representante={editingRepresentante}
                            onSave={handleUpdateRepresentante}
                            onCancel={cancelEdit}
                        />
                    );
                } else {
                    return (
                        <Card key={representante.id_representante} style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Text>
                                    Nombres: {representante.primer_nombre}
                                </Card.Text>
                                <Card.Text>
                                    Primer apellido: {representante.primer_apellido}
                                </Card.Text>
                                <Card.Text>
                                    Teléfono celular: {representante.telefono_celular}
                                </Card.Text>
                                <Card.Text>
                                    Número documento: {representante.numero_documento}
                                </Card.Text>
                                <Card.Text>
                                    Email: {representante.email}
                                </Card.Text>
                                <Button variant="primary" onClick={() => setEditingRepresentante(representante)}>Editar</Button>
                                <DeleteButton id_representante={representante.id_representante} onDeletionSuccess={onDeletionSuccess} />
                            </Card.Body>
                        </Card>
                    );
                }
            })}
        </div>
    );
}

export default Cards;

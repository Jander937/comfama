import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchRepresentante = ({ onSearch }) => {
    const handleSearch = (event) => {
        onSearch(event.target.value); // Pass the search term back to the parent component
    };

    // Prevent the default form submission behavior
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Buscar Representantes..."
                    onChange={handleSearch}
                />
            </Form.Group>
        </Form>
    );
};

export default SearchRepresentante;

CREATE TABLE Todos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_finished BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

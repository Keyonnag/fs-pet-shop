
DROP TABLE IF EXISTS pets CASCADE;
CREATE TABLE pets (
    pet_id SERIAL PRIMARY KEY NOT NULL,
    age INT,
    name VARCHAR(25),
    kind VARCHAR(25)
);

-- psql pets_dev -f migration.sql

INSERT INTO pets (age, name, kind) VALUES (7, 'Fido', 'Rainbow');
INSERT INTO pets (age, name, kind) VALUES (5, 'Buttons', 'Snake');

SELECT * FROM pets
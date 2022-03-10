-- [{"age":7,"kind":"rainbow","name":"fido"},{"age":5,"kind":"snake","name":"Buttons"},{"age":3,"kind":"parakeet","name":"Cornflake"},{"age":3,"kind":"parakeet","name":"Fido"}]
DROP TABLE IF EXISTS pets;
CREATE TABLE pets(
    id serial PRIMARY KEY,
    age integer,
    kind text,
    name text
);
INSERT INTO pets(age,kind,name) VALUES (7,'rainbow','fido');
INSERT INTO pets(age,kind,name) VALUES (5,'snake','buttons');
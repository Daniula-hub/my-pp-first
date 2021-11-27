DROP TABLE IF EXISTS exercise_cart_mix;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(2000)
);

CREATE TABLE exercises (
    exercise_id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(200),
    exercise_info VARCHAR(2000),
    exercise_image VARCHAR(2000)
);

CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    active BOOLEAN
);

CREATE TABLE exercise_cart_mix (
    exercise_cart_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(cart_id),
    product_id INT REFERENCES exercises(exercise_id),
    quantity INT
);

INSERT INTO exercises
(exercise_name, exercise_info, exercise_image)
VALUES
('Upper Body', 'Exercises of Upper Body', 'upper.png'),
('Lower Body', 'Exercises of Lower Body', 'lower.png');

DROP TABLE exercise_cart_mix;

CREATE TABLE exercise_cart_mix (
    exercise_cart_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(cart_id),
    exercise_id INT REFERENCES exercises(exercise_id),
    quantity INT
);

- CREATE TABLE exercise_cart_mix (
    exercise_cart_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(cart_id),
    exercise_id INT REFERENCES exercises(exercise_id),
);

CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    active BOOLEAN,
    cart_type VARCHAR(200)
);

CREATE TABLE exercise_cart_mix (
    exercise_cart_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(cart_id),
    exercise_name VARCHAR(200),
    exercise_id INT REFERENCES exercises(exercise_id),
    quantity INT
);
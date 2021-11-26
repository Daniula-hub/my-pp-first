INSERT INTO exercise_cart_mix
(cart_id, exercise_name, exercise_id, quantity)
VALUES 
($1, $2, $3, $4) RETURNING *;



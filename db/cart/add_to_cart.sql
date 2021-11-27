INSERT INTO exercise_cart_mix 
(cart_id, exercise_id)
VALUES
($1, $2) RETURNING *;
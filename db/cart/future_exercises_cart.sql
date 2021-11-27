INSERT INTO exercise_cart_mix
(cart_id, exercise_id)
VALUES ($1, $2);
SELECT * FROM exercise_cart_mix em
JOIN exercises e ON em.exercise_id = e.exercise_id
WHERE em.cart_id = $1
ORDER BY em.exercise_id;

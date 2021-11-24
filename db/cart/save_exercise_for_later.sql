UPDATE exercise_cart_mix 
SET exercise_name = $3
WHERE cart_id = $1 AND exercise_id = $2;
SELECT * FROM exercise_cart_mix em
JOIN exercises e ON em.exercise_id = e.exercise_id
WHERE em.cart_id = $1
ORDER BY em.exercise_id;
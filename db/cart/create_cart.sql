INSERT INTO carts
(user_id, active, cart_type)
VALUES
($1, true, $2) RETURNING cart_id;
module.exports = {
    getCart: (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        if (!user){
           return res.status(500).send('User not logged in')
        }
        db.cart.get_cart_items(user.cart_id)
        .then(cartExercises => { 
            res.status(200).send(cartExercises)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    addToCart: (req, res) => {
        const db = req.app.get('db')
        const { user } = req.session
        const { exercise_id } = req.params
        if(!user){
            return res.status(500).send('User not logged in')
        }
        db.cart.add_to_cart(user.cart_id, exercise_id)
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    deleteItemFromCart: (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        const {exercise_id} = req.params
        if(!user){
            return res.status(500).send('User not logged in')
        }
        db.cart.delete_item_from_cart(user.cart_id, exercise_id)
        .then((cartExercises) => {
            res.status(200).send(cartExercises)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    saveExerciseForLater: (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        const {exercise_id} = req.params
        const {exercise_name} = req.body
        if(!user){
            return res.status(500).send('User not logged in')
        }
        db.cart.save_exercise_for_later(user.cart_id, exercise_id, exercise_name)
        .then((cartExercises) => {
            res.status(200).send(cartExercises)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
}
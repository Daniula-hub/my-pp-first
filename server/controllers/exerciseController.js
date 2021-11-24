module.exports= {
    getExercises: (req, res) => {
        const db = req.app.get('db')
        db.exercises.get_exercises()
        .then(exercises => {
            res.status(200).send(exercises)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}
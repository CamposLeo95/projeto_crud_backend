class HelloController {
    async index(req, res){
        res.json({msg: "hello World"})
    }
}

export default new HelloController();
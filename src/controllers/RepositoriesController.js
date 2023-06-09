import User from "../models/User";
import Repository from "../models/Repository";

class RepositoriesController {
    async index (req, res){
        try {
            const { user_id } = req.params;
            const { q } = req.query;
            const user = await User.findById(user_id);

            if(!user){
                return res.status(404).json();
            };

            let query = {};

            if(q){
                query ={ url: { $regex: q } }
            }

            const repositories = await Repository.find({
                userId: user_id,
                ...query
            });

            return res.status(200).json(repositories);

        } catch (error) {
            console.error(error);
            return res.status(500).json({msg: "internal Server Error."});
        }
    }

    async create(req, res){
        try{
            const { user_id } = req.params;
            const { name, url }= req.body;

            const user = await User.findById(user_id);

            if(!user){
                return res.status(404).json();
            }

            const repository = await Repository.findOne({
                userId: user_id,
                url
            });

            if(repository){
                return res.status(422).json({msg: `Repository ${name} already existis`});
            }
            
            const userRepository = await Repository.create({
                name,
                url,
                userId: user_id
            });

            return res.status(201).json(userRepository);

        }catch(error){
            console.error(error);
            return res.status(500).json({msg: "Internal Server Error."});
        }

    }

    async destroy(req, res){
        try {
            const { user_id, id } = req.params;
            console.log(user_id, id);
            const user = await User.findById(user_id);
    
            if(!user){
                return res.status(404).json();
            }

            const userRepository = await Repository.findById(id)

            console.log(userRepository);

            if(!userRepository){
                return res.status(404).json();
            }

            await Repository.findByIdAndDelete(id)

            return res.status(200).json();
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({msg: "Internal Server Error."});
        }
 
    }
}

export default new RepositoriesController();
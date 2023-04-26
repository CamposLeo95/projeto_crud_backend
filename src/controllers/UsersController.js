import User from "../models/User"
import { createPasswordHash } from "../services/auth";

class UsersController {
    async index( req, res ){
        // Sempre começamos com um try
        try{
            const users = await User.find();

            return res.json(users)
        } catch(error) {
            console.error(error);
            return res.status(500).json({msg: "Internal server error"})
        }
    }

    async show( req, res ){
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if(!user){
                return res.status(404).json();
            }

            return res.status(200).json({ user })
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({msg: "Internal Server Error"})
        }
    }

    async create( req, res ){
        try{
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if(user){
                return res
                .status(422)
                .json({msg: `${email} already exists.`});
            }

            //criptografar senha
            const encryptedPassword = await createPasswordHash(password);

            const newUser= await User.create({email, password: encryptedPassword});

            return res.status(201).json(newUser);

        }catch(error){
            console.error(error);
            return res.status(500).json({msg: 'Internal Server Error'});
        }
    }

    async update( req, res ){
        try{
            const { id } = req.params;
            const { email, password } = req.body;

            const userId = await User.findById(id);

            if(!userId){
                return res.status(404).json();
            }

            const encryptedPassword = await createPasswordHash(password);

            const updateUser = await User
            .findByIdAndUpdate(id, {email, password: encryptedPassword});

            return res.status(200).json(updateUser);

        }catch(error){
            console.error(error);
            return res.status(500).json({msg: "Internal Server Error"})
        }
    }

    async destroy( req, res ){
        try{
            const { id } = req.params;

            const user = await User.findById(id)

            if(!user){
                return res.status(404).json()
            }

            await User.findByIdAndDelete(id)

            return res.status(200).json({msg: "User deleted"})

        }catch(error){
            console.error(error);
            return res.status(500).json({msg: "Internal Server Error"})
        }
    }

}

export default new UsersController();
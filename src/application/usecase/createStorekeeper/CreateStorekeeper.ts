import UserRepository from "@/domain/repository/UserRepository";
import CreateStorekeeperInput from "./CreateStorekeeperInput";
import Storekeeper from "@/domain/entity/Storekeeper";
import CreateStorekeeperOutput from "./CreateStorekeeperOutput";
import UserAlreadExistsError from "@/application/error/UserAlreadExistsError";

export default class CreateStorekeeper{
    constructor(readonly userRepository:UserRepository){

    }
    async execute(input:CreateStorekeeperInput):Promise<CreateStorekeeperOutput>{
        const commonClient = new Storekeeper(input.name,input.cpf,input.email,input.password)
        const userEmailExists = await this.userRepository.findByEmail(input.email)
        if(userEmailExists) throw new UserAlreadExistsError()
        const userCpfExists = await this.userRepository.findByCpf(input.cpf)
        if(userCpfExists) throw new UserAlreadExistsError()
        const user = await this.userRepository.create(commonClient)
        return new CreateStorekeeperOutput(user.getEmail(),user.getCpf())
    }
}
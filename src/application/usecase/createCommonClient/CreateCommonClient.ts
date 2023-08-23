import UserRepository from "@/domain/repository/UserRepository";
import CreateCommonClientInput from "./CreateCommonClientInput";
import CommonClient from "@/domain/entity/CommonClient";
import CreateCommonClientOutput from "./CreateCommonClientOutput";
import UserAlreadyExistsError from "@/application/error/UserAlreadExistsError";

export default class CreateCommonClient{
    constructor(readonly userRepository:UserRepository){}
    async execute(input:CreateCommonClientInput):Promise<CreateCommonClientOutput>{
        const commonClient = new CommonClient(input.name,input.cpf,input.email,input.password)
        const userEmailExists = await this.userRepository.findByEmail(input.email)
        if(userEmailExists) throw new UserAlreadyExistsError()
        const userCpfExists = await this.userRepository.findByCpf(input.cpf)
        if(userCpfExists) throw new UserAlreadyExistsError()
        const user = await this.userRepository.create(commonClient)
        return new CreateCommonClientOutput(user.getEmail(),user.getCpf())
    }
}
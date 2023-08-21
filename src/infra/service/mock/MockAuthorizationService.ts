import AuthorizationService from "@/application/service/AuthorizationService";
import axios from "axios";
export default class MockAuthorizationService implements AuthorizationService{
    async validate(data: { id: string; }): Promise<boolean> {
        const response = await axios.get("https://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6")
        return (response.data.message==="Autorizado")
    }

}
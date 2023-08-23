import AuthorizationService from "@/application/service/AuthorizationService";
export default class HttpAuthorizationService implements AuthorizationService{
    async validate(data: { id: string; }){
        return true
    }

}
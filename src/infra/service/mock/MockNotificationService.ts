import NotificationService from "@/application/service/NotificationService";
export default class MockNotificationService implements NotificationService{
    async notify(data: { ids: string[]; event: string }){
      }

}
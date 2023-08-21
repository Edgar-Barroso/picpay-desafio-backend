import NotificationService from "@/application/service/NotificationService";
import axios from "axios"
export default class MockNotificationService implements NotificationService{
    async notify(data: { ids: string[]; event: string }): Promise<void> {
        try {
          await axios.post("http://o4d9z.mocklab.io/notify", data);
          console.log("Notificação enviada com sucesso!");
        } catch (error) {
          console.log("Notificação falhou!");

        }
      }

}
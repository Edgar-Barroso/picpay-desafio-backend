import CanceledTransaction from "@/domain/event/CanceledTransaction";
import Handler from "@/infra/broker/Handler";
import NotificationService from "../service/NotificationService";

export default class CanceledTransactionNotifyHandler implements Handler {
    name = "CanceledTransaction";

    constructor(readonly notificationService: NotificationService) {}

    handle(event: CanceledTransaction) {
        this.notificationService.notify({
            ids: [event.transaction.payer.getId()],
            event: "FAIL_TRANSACTION",
        });
    }
}

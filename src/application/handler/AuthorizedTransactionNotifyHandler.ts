import AuthorizedTransaction from "@/domain/event/AuthorizedTransaction";
import Handler from "@/infra/broker/Handler";
import NotificationService from "../service/NotificationService";

export default class AuthorizedTransactionNotifyHandler implements Handler {
    name = "AuthorizedTransaction";

    constructor(readonly notificationService: NotificationService) {}

    handle(event: AuthorizedTransaction) {
        this.notificationService.notify({
            ids: [event.transaction.payer.getId(), event.transaction.payee.getId()],
            event: "SUCCESS_TRANSACTION",
        });
    }
}

import DomainEvent from "./DomainEvent";

export default interface Handler {
    handle(event: DomainEvent): void;
    name: string;
}

import { atom } from "jotai";

const EventNotificationAtom = atom<{text: string, isSuccess: undefined | boolean}>({
    text: "",
    isSuccess: undefined,
});
const EventNotificationReadOnlyAtom = atom((get) => get(EventNotificationAtom));

export {EventNotificationAtom, EventNotificationReadOnlyAtom};
import { atom } from "jotai";

const EventNotificationAtom = atom("");
const EventNotificationReadOnlyAtom = atom((get) => get(EventNotificationAtom));

export {EventNotificationAtom, EventNotificationReadOnlyAtom};
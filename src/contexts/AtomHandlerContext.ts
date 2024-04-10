import { SetStateAction } from "jotai";
import { createContext } from "react";

type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result;

const AtomHandlerContext = createContext<SetAtom<[SetStateAction<boolean>], void>>(null!);

export default AtomHandlerContext;
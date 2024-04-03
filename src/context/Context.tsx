import { ContextType } from "../types/types";
import { createContext } from "react";

export const Context = createContext<ContextType | null>(null);
import React from "react";
import {IProduct} from "../models";

export const ProductsContext = React.createContext<IProduct[]>([]);

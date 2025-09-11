import {Item} from "../models/item.model";
import {Customer} from "../models/customer.model";
import { Employee } from "./employee.model";


export interface Assign {
    id?: Number,
   item:Item;
   customer:Customer;
   employee: Employee;
}
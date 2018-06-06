import { combineReducers } from "redux";
import { IMemberEntity } from "../model";
import { testReducer } from "./testReducer";

export interface IState {
    members: IMemberEntity[];
}

export const state = combineReducers<IState>({
    members: testReducer,
});

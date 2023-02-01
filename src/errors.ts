import { Response } from "express";
import { iCanRun } from "./interfaces";

export function errorNotFound(response: Response): Response {
    return response.status(404).json({
        message: `Not found`
    });
}

export function errorMessage(containsAllReqKeys: boolean, containsOthersKeys: boolean, containsJustRightTypes: boolean, reqKeys: string[]): iCanRun {
    const canRun: iCanRun = {
        msg: "",
        error: false
    }
    if(!containsAllReqKeys) {
        canRun.msg = `You need put all required keys, they are: ${reqKeys}`;
    } else if(containsOthersKeys) {
        canRun.msg = `You are trying to put more keys, they are just ${reqKeys}`;
    } else if(!containsJustRightTypes) {
        canRun.msg = `Some values are out of format. Read the documentation`;
    }
    if(canRun.msg !== "") {
        canRun.error = true;
    }
    return canRun
}
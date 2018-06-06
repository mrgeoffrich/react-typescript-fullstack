import * as axios from "axios";
import { IStatus } from "../../common/models/IStatus";
import { IBuildStatus } from "./../../common/models/IBuildStatus";

export const getStatus = async () => {
    const returnValue = await axios.default.get("/api/status");
    return returnValue.data as IStatus;
};

export const getBuildStatus = async () => {
    const returnValue = await axios.default.get("/api/build/status");
    return returnValue.data as IBuildStatus[];
};

import { IMemberEntity } from "../model";

export const testReducer = (state: IMemberEntity[] = [], action: any) => {
    switch (action.type) {
        case "TEST_ACTION":
            return handleFetchMembersCompleted(state, action.payload);
    }

    return state;
};

const handleFetchMembersCompleted = (
    state: IMemberEntity[],
    payload: IMemberEntity[]
) => {
    return payload;
};

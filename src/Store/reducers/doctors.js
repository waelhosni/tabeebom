/***
 *  doctors Reducers
 ***/
export default (state = { doctors: [],detail_doctors: [] }, action) => {
    if(action.type === "ACTUAL_DOCTORS")
    {
        return { ...state,
            doctors: action.doctors };
    }
    else
    {
        return state;
    }
};
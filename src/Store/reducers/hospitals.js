/***
 *  doctors Reducers
 ***/
export default (state = { hospitals: [],detail_hospitals: [] }, action) => {
    if(action.type === "ACTUAL_HOSPITALS")
    {
        return { ...state,
            hospitals: action.hospitals };
    }
    else
    {
        return state;
    }
};

import * as actions from '../constants/appConstant'
const initState = {
    isLoading: false,


}
export const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.FETCH_DATA_START:
            {
                let coppyState = { ...state };

                coppyState.isLoading = true;
                return { ...coppyState };
            }
        case actions.FETCH_DATA_FINISHED:
            {
                let coppyState = { ...state };

                coppyState.isLoading = false;
                return { ...coppyState };
            }
        default:
            return state;
    }
}

const Reducer = (state, action) => {
    switch(action.type){
        case 'ACTION_TYPE':
            return {
                ...state,
                data: state.data
            }
        default:
            return state;
    }
}

export default Reducer;
export const modalReducer = (state = {}, action) => {
    switch (action.type) {
        case "SHOW_MODAL":
            return {
                show: action.payload.show,
                children: action.payload.children
            }
        default:
            return state
    }
}

export const dropReducer = (state = {}, action) => {
    switch (action.type) {
        case "SHOW_DROP":
            console.log(action.payload.menu)
            return {
                show: action.payload.show,
                // button: action.payload.button,
                menu: action.payload.menu
            }
        default:
            return state
    }
}
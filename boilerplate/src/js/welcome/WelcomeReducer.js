import WelcomeActions from './WelcomeActions';

const initialState = {
    text: 'Hello'
};

export default function WelcomeReducer(
    state = initialState,
    action
) {
    const { type, payload } = action;

    switch (type) {
        case WelcomeActions.SAY_HELLO:
        case WelcomeActions.SAY_WELECOME:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

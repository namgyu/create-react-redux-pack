export const types = {
    SAY_HELLO: 'SAY_HELLO',
    SAY_WELECOME: 'SAY_WELCOME'
};

export default types;

export function sayHello() {
    return {
        type: types.SAY_HELLO,
        payload: {
            text: 'Hello'
        }
    };
}

export function sayWelcome() {
    return {
        type: types.SAY_WELECOME,
        payload: {
            text: 'Welcome'
        }
    };
}

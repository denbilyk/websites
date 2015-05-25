import AppDispatcher from './AppDispatcher.es6.jsx'
import GlobalStore from './GlobalStore.es6.jsx'

export default class TaskActions {

    constructor(store) {
        console.log("in constructor");
        this.constructor.store = store;

    }

    addNew(_id, _value) {
        console.log("in add new");
        AppDispatcher.dispatch({
            eventName: 'new-item',
            newItem: {id: _id, value: _value}
        });
    }

    update(_id, _value) {
        console.log("in update");
        AppDispatcher.dispatch({
            eventName: 'update-item',
            newItem: {id: _id, value: _value}
        });
    }

    getAll() {
        console.log('Task Actions: get all');
        return this.constructor.store.getAll();
    }
}
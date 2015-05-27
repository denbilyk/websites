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
            newItem: {id: _id, value: _value, complete: false}
        });
    }

    update(_id, _value, _complete) {
        console.log("in update");
        AppDispatcher.dispatch({
            eventName: 'update-item',
            newItem: {id: _id, value: _value, complete:_complete}
        });
    }


    updateComplete(_id, _complete) {
        console.log("in updateComplete");
        AppDispatcher.dispatch({
            eventName: 'update-item',
            newItem: {id: _id, complete:_complete}
        });
    }

    remove(_id) {
        console.log('remove ' + _id);
        AppDispatcher.dispatch({
            eventName: 'delete-item',
            newItem: {id: _id, value: ''}
        });
    }

    getAll() {
        console.log('Task Actions: get all');
        return this.constructor.store.getAll();
    }

    size(){
        return this.constructor.store.size();
    }

}
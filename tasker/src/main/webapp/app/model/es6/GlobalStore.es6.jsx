import AppDispatcher from './AppDispatcher.es6.jsx'
import MicroEvent from 'microevent';

export default class GlobalStore {

    constructor() {
        console.log('init store');
        this.counter = 20;
        this.store = new Array(0);
        AppDispatcher.register((payload) => {
            switch (payload.eventName) {
                case 'new-item':
                    this.store.push(payload.newItem);
                    console.log("store.push ");
                    this.trigger('change');
                    break;

                case 'update-item':
                    let updateData = payload.newItem;
                    console.log("store.update " + payload.newItem);
                    console.log(payload.newItem);
                    let _id = payload.newItem.id;
                    // replace to find
                    this.store.forEach((item) => {
                        if (item.id === _id) {
                            item.value = payload.newItem.value;
                            item.id = payload.newItem.id;
                        }
                    });
                    console.log(this.store);
                    this.trigger('change');
                    break;
            }
        });

        return true;
    }

    getAll() {
        return this.store;
    }

}

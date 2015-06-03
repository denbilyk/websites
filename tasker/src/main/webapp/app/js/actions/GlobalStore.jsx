import AppDispatcher from "./AppDispatcher.jsx";

export default class GlobalStore {
    constructor() {
        this.store = [];
        AppDispatcher.register(payload => {
            switch (payload.eventName) {
                case "new-item":
                    let flag = false;
                    this.store.forEach(item => {
                        if (item.value.trim() === "") {
                            flag = true;
                        }
                    });
                    if (!flag) {
                        this.store.push(payload.newItem);
                        console.log("store.push ");
                        this.trigger("change");
                    }
                    break;

                case "update-item":
                    console.log("store.update " + payload.newItem);
                    let newId = payload.newItem.id;
                    // replace to find
                    this.store.forEach((item) => {
                        if (item.id === newId) {
                            if (typeof payload.newItem.value !== "undefined") {
                                item.value = payload.newItem.value;
                            }
                            item.id = payload.newItem.id;
                            item.complete = payload.newItem.complete;
                        }

                    });
                    this.trigger("change");
                    break;

                case "delete-item":
                    let idx = -1;
                    this.store.forEach(item => {
                        if (item.id === payload.newItem.id) {
                            this.store.splice(this.store.indexOf(item), 1);
                        }
                    });
                    this.trigger("change");
                    break;
            }
        });

        return true;
    }

    getAll() {
        return this.store;
    }

    size() {
        return this.store.length;
    }

}

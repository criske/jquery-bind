
function $state(state) {

    const listeners = [];

    const proxy = new Proxy(state, {
        set: function (obj, prop, value) {
            obj[prop] = value;
            listeners.forEach(l => l(obj.trimmed(), prop, value));
            return true;
        }
    });

    state.addListener = function (listener) {
        listeners.push(listener);
    };

    state.removeListener = function (listener) {
        const index = listeners.indexOf(listener);
        if (index >= 0) {
            listeners.splice(index, 1);
        }
    };

    state.trimmed = function () {
        const trim = { ...this };
        delete trim.addListener;
        delete trim.removeListener;
        delete trim.trimmed;
        return trim;
    };

    return proxy;

}


jQuery.fn.$bind = function (state) {

    const elem = this;

    const observers = [];

    const listener = (obj, prop, value) => {
        observers.forEach(o => o(obj, prop, value));
    };

    state.addListener(listener);

    this.on("remove", function () {
        //prevent leak;
        state.removeListener(listener);
    });

    return {
        observe: function (observer) {
            const bObserver = observer.bind(elem);
            observers.push(bObserver);
            bObserver(state.trimmed());
            return this;
        }
    };
};

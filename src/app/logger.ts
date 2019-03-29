export function logger() {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        const incoming_func = descriptor.value;
        if (typeof incoming_func === 'function') { // если тип входящей функции === 'function'

          descriptor.value = function(...args) {
              // получаю аргументы которые получает функция при запуске

            // узнаю имя метода класса
            const method_name = propertyKey;
            console.log(method_name);

            // вызываю текущую функцию с текущими аргументами (иначе метод класса не сработает)
            const result = incoming_func.apply(this, args);

            if (localStorage.getItem('call_status') === null) { // если в сторадже текущей записи нет - создаю
                const object_state = {method_name: method_name, called: 1}; // вношу туда данные, какой метод использовался и сколько раз
                localStorage.setItem('call_status', JSON.stringify(object_state)); // заношу в сторадж
            } else { // если хапись уже создана
                const state = JSON.parse(localStorage.getItem('call_status')); // достаю из стораджа инфо


                    if  (state.method_name === method_name) {

                        state.called = state.called + 1; // переназначаю, какой метод вызван, сколкьо раз
                    } else {
                        state.method_name = method_name;
                        state.called = 1;

                    }

                localStorage.setItem('call_status', JSON.stringify(state));

            }


        };
    }
};
}


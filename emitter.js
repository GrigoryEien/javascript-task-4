'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    return {
        events: new Map(),

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object} emitter
         */
        on: function (event, context, handler) {
            console.info(event, context, handler);
            if (!this.events.has(event)) {
                this.events.set(event, new Map());
            }
            if (!this.events.get(event).has(context)) {
                this.events.get(event).set(context, [handler.bind(context)]);
            } else {
                this.events.get(event).get(context)
                    .push(handler.bind(context));
            }


            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object} emitter
         */
        off: function (event, context) {
            console.info(event, context);
            let subeventChecker = new RegExp(`^${event}($|[.])`);
            this.events.forEach((contxt, name) => {
                if (subeventChecker.test(name)) {
                    this.events.get(name).set(context, []);
                }
            });

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object} emitter
         */
        emit: function (event) {
            console.info(event);
            getPrefixes(event, '.')
                .forEach(x => {
                    (this.events.get(x) || [])
                        .forEach(context => context.forEach(handler => handler.call(context)));
                });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object} emitter
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);

            return this;
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         * @returns {Object} emitter
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);

            return this;
        }
    };
}

function getPrefixes(string, separator) {
    let split = string.split(separator);
    let prefix = '';
    let prefixes = [];
    for (let i = 0; i < split.length; i++) {
        prefix += (i === 0 ? '' : separator) + split[i];
        prefixes.unshift(prefix);
    }

    return prefixes;
}

module.exports = {
    getEmitter,

    isStar
};

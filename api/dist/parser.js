"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parser {
    createInput() {
        return new Promise(resolve => {
            resolve();
        });
    }
    inputCreated() {
        return new Promise(resolve => {
            resolve();
        });
    }
    createOutput() {
        return new Promise(resolve => {
            resolve();
        });
    }
    outputCreated() {
        return new Promise(resolve => {
            resolve();
        });
    }
    createContent() {
        return new Promise(resolve => {
            resolve();
        });
    }
    contentCreated() {
        return new Promise(resolve => {
            resolve();
        });
    }
    create(inputFactory, outputFactory, contentFactory) {
        let promise = new Promise(resolve => {
            resolve();
        });
        if (inputFactory) {
            promise = promise.then(() => inputFactory(this));
        }
        else {
            promise = promise.then(() => this.createInput());
        }
        promise = promise.then(value => {
            this.input = value;
        }).then(() => this.inputCreated());
        if (outputFactory) {
            promise = promise.then(() => outputFactory(this));
        }
        else {
            promise = promise.then(() => this.createOutput());
        }
        promise = promise.then(value => {
            this.output = value;
        }).then(() => this.outputCreated());
        if (contentFactory) {
            promise = promise.then(() => contentFactory(this));
        }
        else {
            promise = promise.then(() => this.createContent());
        }
        promise = promise.then(value => {
            this.content = value;
        }).then(() => this.contentCreated());
        return promise.then(() => this);
    }
    parseValue(valueName, valueParser) {
        return valueParser(this).then(value => {
            this.output[valueName] = value;
        }).then(() => this);
    }
    parseValues(valuesName, valuesParser, ...indexes) {
        let indexSet = new Set();
        for (let index of indexes.sort()) {
            if (index >= 0) {
                indexSet.add(index);
            }
        }
        let newValues = [];
        let values = this.output[valuesName];
        if (values && Array.isArray(values)) {
            newValues.push(values);
        }
        let promise = new Promise(resolve => {
            resolve();
        });
        for (let index of indexSet) {
            promise = promise.then(() => valuesParser(this, index))
                .then(value => {
                newValues[index] = value;
            });
        }
        promise = promise.then(() => {
            this.output[valuesName] = newValues;
        });
        return promise.then(() => this);
    }
}
exports.default = Parser;

//# sourceMappingURL=parser.js.map

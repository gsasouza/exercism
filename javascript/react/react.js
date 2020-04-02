//
// This is only a SKELETON file for the 'React' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
import { EventEmitter } from 'events';

export class InputCell {
  constructor(value) {
    this.value = value;
    this.eventEmitter = new EventEmitter();
  }

  setValue(value) {
    this.value = value;
    this.eventEmitter.emit('changed');
  }
}

export class ComputeCell {

  constructor(inputCells, fn) {
    this.inputs = inputCells;
    this.fn = fn;
    this.cbs = [];
    this.value = fn(inputCells);
    this.addListeners(this.inputs);
  }

  addListeners(inputs) {
    inputs.forEach(input => {
      if (input instanceof InputCell) return input.eventEmitter.on('changed', () => this.computeValue())
      return this.addListeners(input.inputs);
    })
  }

  computeValue() {
    const prevValue = this.value;
    this.value = this.fn(this.inputs);
    if (prevValue !== this.value) this.cbs.forEach(cb => cb.logValue(this));
  }

  addCallback(cb) {
    this.cbs = [...this.cbs, cb];
  }

  removeCallback(cb) {
    this.cbs = this.cbs.filter(callback => callback.id !== cb.id);
  }
}

export class CallbackCell {
  constructor(fn) {
    this.id = Symbol();
    this.fn = fn;
    this.values = [];
  }

  logValue(cell) {
    this.values = [...this.values, this.fn(cell)]
  }
}

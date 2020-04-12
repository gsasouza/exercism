
export class BufferEmptyError extends Error {}

export class BufferOverflowError extends Error {}

class CircularBuffer <T> extends Array<T> {
  data: Array<T | null>
  position: number;
  oldestPosition: number;

  constructor(props: number) {
    super(props);
    this.data = new Array(props).fill(null);
    this.position = Math.floor(this.data.length/ 2) - 1;
    this.oldestPosition = this.position + 1;
  }

  read() {
    if (this.data[this.oldestPosition]) {
      const value = this.data[this.oldestPosition];
      this.data[this.oldestPosition] = null;
      this.oldestPosition = this.calculateNextPosition(this.oldestPosition);
      return value;
    }
    throw new BufferEmptyError();
  }

  write(value: T) {
    const nextPosition = this.calculateNextPosition(this.position)
    if (this.data[nextPosition]) throw new BufferOverflowError();
    this.data[nextPosition] = value;
    this.position = nextPosition;
  }

  clear() {
    this.data = new Array(this.data.length).fill(null);
    this.position = Math.floor(this.data.length/ 2) - 1;
    this.oldestPosition = this.position + 1;
  }

  forceWrite(value: T) {
    const nextPosition = this.calculateNextPosition(this.position)
    if (this.data[nextPosition]) {
      this.data[this.oldestPosition] = value;
      this.oldestPosition = this.calculateNextPosition(this.oldestPosition);
      return value;
    }
    return this.write(value);

  }

  private calculateNextPosition (initialPosition: number) {
    return initialPosition + 1 < this.data.length ? initialPosition + 1 : 0;
  }

}

export default CircularBuffer;

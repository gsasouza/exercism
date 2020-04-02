class CryptoSquare {
  data: string;
  sqrtSize: number;
  textSegments: Array<string>

  constructor(str: string) {
    this.data = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    this.sqrtSize = Math.ceil(Math.sqrt(this.data.length));
    this.textSegments = this.data.match(new RegExp(`.{1,${this.sqrtSize}}`, 'g')) || [];
  }
  normalizePlaintext() {
    return this.data;
  }
  size() {
    return this.sqrtSize;
  }
  plaintextSegments() {
    return this.textSegments
  }
  ciphertext() {
    const dataMatrix = this.textSegments.map((_, i, array) =>
      new Array(array.length).fill(null)
      .map((_, j) => array[j][i]) || '')

    return dataMatrix.map(row => row.join('')).join('')
  }

}

export default CryptoSquare

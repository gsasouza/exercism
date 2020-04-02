class Matrix {
    rows: Array<Array<number>>
    columns: Array<Array<number>>
    constructor(input: string) {
        this.rows = input.split('\n')
            .map(line => line.split(' ')
            .map(item => Number.parseInt(item, 10))
        );
        this.columns = this.rows
            .map((_, i, array) =>
            new Array(array.length).fill(null)
            .map((_, j) => array[j][i]))
        // Your code here
    }
}

export default Matrix

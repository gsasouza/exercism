class NucleotideCount {
  static nucleotideCounts(str: string) {
    if ((str.match(/[ACTG]/g) || []).length !== str.length) throw('Invalid nucleotide in strand')
    return str.split('').reduce((acc: { [key: string]: number }, cur) => {
      if (acc[cur]) return { ...acc, [cur]: acc[cur] + 1}
      return {
        ...acc,
        [cur]: 1
      }
    }, { A: 0, C: 0, T: 0, G: 0 })
  }
}

export default NucleotideCount

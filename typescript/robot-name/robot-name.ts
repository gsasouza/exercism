const hashTable: { [key: string]: boolean } = {};

class RobotName {
  name: string;

  constructor () {
    this.name = RobotName.generateNewName();
  }

  private static generateNewName(): string {
    const newKey = `${(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).replace(/[0-9]/g, '').substr(2, 2).toUpperCase()}${Math.floor((Math.random() * 1000))}`;
    if (hashTable[newKey]) return this.generateNewName();
    hashTable[newKey] = true;
    return newKey;
  }

  resetName() {
    this.name = RobotName.generateNewName();
  }


}

export default RobotName

import hash from 'hash-it'
const hashVal = Math.abs(hash('1231委屈额1饿112饿')) % 1000
const experimentTrafficWeight = 0.3

const experimentId = null
const versionId = null
const value = Math.abs(hash('bar')) % 1000
const weight = value / 10
if (weight <= experimentTrafficWeight) {
  const versionWeight = value / 100
  console.log(versionWeight)
  /*for (let i = 0; i <= versions.length; i++) {
        if (versionWeight < versions[i].versionTrafficWeight) {
            experimentId = versions[i].experimentId;
            versionId = versions[i].versionId;
            break;
        }
    }*/
}
console.log(hashVal) // 5386905135935

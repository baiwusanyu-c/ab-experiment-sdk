const hash = require('hash-it')
const { shuntAlgorithm, groupingAlgorithm } = require('./dist/web/ab-test-sdk-web.cjs')
/*const hashVal = Math.abs(hash('1231委屈额1饿112饿')) % 1000
const experimentTrafficWeight = 0.3

const experimentId = null
const versionId = null
const value = Math.abs(hash('bar')) % 1000
const weight = value / 10
if (weight <= experimentTrafficWeight) {
  const versionWeight = value / 100
  console.log(versionWeight)
  /!*for (let i = 0; i <= versions.length; i++) {
        if (versionWeight < versions[i].versionTrafficWeight) {
            experimentId = versions[i].experimentId;
            versionId = versions[i].versionId;
            break;
        }
    }*!/
}
console.log(hashVal) // 5386905135935*/

/**
 * JS Implementation of MurmurHash2
 *
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 *
 * @param {string} str ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash
 */

/*export function murmurhash3_32_gc(key, seed) {
  let remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i

  remainder = key.length & 3 // key.length % 4
  bytes = key.length - remainder
  h1 = seed
  c1 = 0xcc9e2d51
  c2 = 0x1b873593
  i = 0

  while (i < bytes) {
    k1 =
      (key.charCodeAt(i) & 0xff) |
      ((key.charCodeAt(++i) & 0xff) << 8) |
      ((key.charCodeAt(++i) & 0xff) << 16) |
      ((key.charCodeAt(++i) & 0xff) << 24)
    ++i

    k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff
    k1 = (k1 << 15) | (k1 >>> 17)
    k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff

    h1 ^= k1
    h1 = (h1 << 13) | (h1 >>> 19)
    h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff
    h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16)
  }

  k1 = 0

  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16
      break
    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8
      break
    case 1:
      k1 ^= key.charCodeAt(i) & 0xff
      break
    default:
      k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff
      k1 = (k1 << 15) | (k1 >>> 17)
      k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff
      h1 ^= k1
  }

  h1 ^= key.length

  h1 ^= h1 >>> 16
  h1 = ((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff
  h1 ^= h1 >>> 13
  h1 = ((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff
  h1 ^= h1 >>> 16

  return h1 >>> 0
}*/

let tnum = 0
const tnumArr = []
let fnum = 0
for (let i = 0; i < 100; i++) {
  const res = shuntAlgorithm(i, 5.6)
  if (res) {
    tnumArr[tnum] = i
    tnum++
  } else {
    fnum++
  }
}
console.log(`分流：true:${tnum},false:${fnum}`)

let gnumA = 0
let gnumB = 0
const gnumC = 0
for (let i = 0; i < tnumArr.length - 1; i++) {
  const resA = groupingAlgorithm(`${tnumArr[i]}groupA`, 5)
  const resB = groupingAlgorithm(`${tnumArr[i]}groupB`, 5)
  //let resC = groupingAlgorithm(i + 'group',4)
  if (resA) {
    console.log('A', tnumArr[i])
    gnumA++
  }
  if (resB) {
    console.log('B', tnumArr[i])
    gnumB++
  }
  /* if(resC) {
    console.log('C',i)
    gnumC++
  }*/
}
console.log(`分组：A组:${gnumA},B组:${gnumB},C组:${gnumC}`)

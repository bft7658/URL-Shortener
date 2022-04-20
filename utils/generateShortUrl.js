function generateShortURL(num) {
  const words = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  // const words = 'a1' // 測試用
  // 將字串轉成陣列
  let Words = []
  Words = Words.concat(...words)
  let letters = ''
  for (let i = 0; i < num; i++) {
    letters += Words[Math.floor(Math.random() * Words.length)]
  }
  return letters
}

module.exports = generateShortURL
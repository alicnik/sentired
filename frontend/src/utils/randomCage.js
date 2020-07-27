
Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)]
 
}

export const randomCage = () => {
  const sizes = [200, 250, 300, 350, 400]
  return `https://www.placecage.com/c/${sizes.randomElement()}/${sizes.randomElement()}`
}

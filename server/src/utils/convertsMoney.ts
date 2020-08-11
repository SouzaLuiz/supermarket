export function realToCents (money: number) {
  return money * 100
}

export function centsToRealString (money: number) {
  return (money / 100).toFixed(2)
}

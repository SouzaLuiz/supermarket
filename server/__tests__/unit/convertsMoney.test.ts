import { realToCents, centsToRealString } from '../../src/utils/convertsMoney'

describe('tests currency converters', () => {
  it('should convert real to cents', () => {
    const valueExpect = 250
    const convertedMoney = realToCents(2.5)

    expect(convertedMoney).toBe(valueExpect)
  })

  it('should convert cents to real in string', () => {
    const valueExpect = '2.75'
    const convertedMoney = centsToRealString(275)

    expect(convertedMoney).toBe(valueExpect)
  })
})

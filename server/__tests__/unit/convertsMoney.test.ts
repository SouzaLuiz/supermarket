import realToCents from '@utils/convertsMoney'

describe('tests currency converters', () => {
  it('should convert real to cents', () => {
    const valueExpect = 250
    const convertedMoney = realToCents(2.5)

    expect(convertedMoney).toBe(valueExpect)
  })
})

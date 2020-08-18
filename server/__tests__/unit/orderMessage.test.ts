import formatMessage from '@utils/formatMessage'

const data = {
  clientInfo: {
    name: 'Luiz Henrique',
    addres: 'Rua B, Nº 24',
    telephone: '92992547364',
    complement: ' '
  },
  products: [
    {
      name: 'Arroz',
      price: 2.45,
      quantity: 2
    },
    {
      name: 'Feijão',
      price: 4.45,
      quantity: 4
    },
    {
      name: 'Macarrão',
      price: 3.59,
      quantity: 3
    }
  ]
}

const message =
`CNPJ: 36.936718/0001-31
END: AV CEL GARCIA 90 - SILVEZ/AM
TEL/WHATSAPP (92) 99370-1488
SITE: RANCHO-ONLINE.UMBLER.NET

Informações do cliente

Nome: Luiz Henrique
Endereço: Rua B, Nº 24
Telefone: 92992547364

Produtos
- 2x Arroz
  - VL Unit: R$ 2.45 | VL Total: R$ 4.90

- 4x Feijão
  - VL Unit: R$ 4.45 | VL Total: R$ 17.80

- 3x Macarrão
  - VL Unit: R$ 3.59 | VL Total: R$ 10.77

Total a pagar: R$ 33.47`

describe('actions when placing order', () => {
  it('this should create an order and send to the telegram', async () => {
    const expectMessage = formatMessage(data)
    expect(expectMessage).toBe(message)
  })
})

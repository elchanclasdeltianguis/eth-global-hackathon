export interface ICategory {
  ID: string
  Nombre: string
  Icono: string
}

export interface ICampos {
  Nombre: string
  Campo: string
  Min: string
  Max: string
  Formato: string
  Confirmar: string
  Obligatorio: string
  iniCero: string
}

export interface IComisionType {
  ID: string
  CargoTrans: string
  TipoCargo: string
  AbonoTrans: string
  TipoAbono: string
  ComisionCliente: string
  def_CargoTrans: string
  def_AbonoTrans: string
  Status: string
}

export interface ICarrier {
  ID: string
  Nombre: string
  Logotipo: string
  BolsaID: string
  Categoria: string
  CategoriaID: string
  Tipo: string
  Promos: string
  getSaldo: string
  ScanQrName: string
  Comision: IComisionType
  Campos: ICampos[]
}

export interface ISiprelProduct {
  Bolsa: string
  Categoria: string
  CategoriaID: string
  BolsaID: string
  Carrier: string
  CarrierID: string
  Codigo: string
  Monto: string
  Unidades: string
  Vigencia: string
  Descripcion: string
  Nombre: string
}

interface IDefaultTokenList {
  [chainId: number]: string
}
interface IChainAddress {
  [chainId: number]: string
}

interface IToken {
  symbol: string
  address: IChainAddress
  decimals: number
  oracle: IChainAddress
}

interface ITokens {
  [name: string]: IToken
}

interface IOrder {
  product: ISiprelProduct
  tx: any
  account: string
  chainId: number
  token: string
  amount: number
  phone: number
}

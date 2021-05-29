export interface IProduct {
  id: string
  site_id: string
  title: string
  seller: ISeller
  price: number
  prices: {
    id: string
    prices: IPrices[]
    presentation: {
      display_currency: string
    }
    payment_method_prices: any
    reference_prices: any
    purchase_discounts: any
  }
  currency_id: string
  available_quantity: number
  sold_quantity: number
  buying_mode: string
  listing_type_id: string
  stop_time: string
  condition: string
  permalink: string
  thumbnail: string
  accepts_mercadopago: boolean
  installments: IInstallments
  address: IAddress
  shipping: IShipping
  seller_address: ISellerAddress
  attributes: IAttribute[]
  original_price: any
  category_id: string
  official_store_id?: number | null
  catalog_product_id: string
  tags: string[]
  catalog_listing: boolean
}

export interface IPrices {
  id: string
  type: string
  conditions: any
  amount: number
  regular_amount: number | null
  currency_id: string
  exchange_rate_context: string
  metadata: any
  last_updated: string
}

export interface ISeller {
  id: number
  power_seller_status: string
  car_dealer: boolean
  real_estate_agency: boolean
  tags: any[]
}

export interface IInstallments {
  quantity: number
  amount: number
  rate: number
  currency_id: string
}

export interface IAddress {
  state_id: string
  state_name: string
  city_id?: string | null
  city_name: string
}

export interface IShipping {
  free_shipping: boolean
  mode: string
  tags: string[]
  logistic_type: string
  store_pick_up: boolean
}

export interface ISellerAddress {
  id: string
  comment: string
  address_line: string
  zip_code: string
  country: ICountry
  state: IState
  city: ICity
  latitude: string
  longitude: string
}

export interface ICountry {
  id: string
  name: string
}

export interface IState {
  id: string
  name: string
}

export interface ICity {
  id?: string | null
  name: string
}

export interface IAttribute {
  name: string
  value_id: string
  value_name: string
  value_struct: any
  attribute_group_id: string
  attribute_group_name: string
  source: number
  id: string
}

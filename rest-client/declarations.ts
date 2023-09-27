export interface Query {
  [key: string]: any
}

export interface FindParams<Q = Query> {
  query: Q
  options?: any
}

export interface GetParams {
  id: string | number | null
  options?: any
}

export interface CreateParams {
  data: {
    [key: string]: any
  }
  options?: any
}

export interface PatchParams<Q = Query> {
  id?: string | number | null
  data: {
    [key: string]: any
  }
  query: Q
  options?: any
}
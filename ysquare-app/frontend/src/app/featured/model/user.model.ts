
export interface User {
id?: string,
userName?: string,
password?: string,
email?: string,
role?: string
}

export interface AppResponse {
  msg?: string,
  data?: any,
  error?:string
}

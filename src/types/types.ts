export type User = {
  _createdAt: Date
  _id: string
  _rev: string
  _type: string
  _updatedAt: Date
  city: string
  country: string
  email: string
  status: string
  gender: string
  userName: string
  ava: Image
  birthDate: string
  images: Image[]
  friends: UserRef[]
  dialogs: Dialog[]
}

export type Image = {
  _type: string
  asset: {
    _ref: string
    _type: string
    url?: string
  }
}

export type UserRef = {
  _type: string
  _ref: string
}

export type Message = {
  UserTo: UserRef
  _key: string
  _type: string
  message: string
  userFrom: UserRef
}

export type Dialog = {
  _createdAt: Date
  _id: string
  _rev: string
  _type: string
  messages: Message[]
  userId: string
  userTo: UserRef
  _updatedAt: Date
}

export type DecodedResponseData = {
  name: string
  sub: string
  picture: string
}

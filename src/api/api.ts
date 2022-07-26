import { IdentifiedSanityDocumentStub, SanityDocumentStub, UploadOptions } from "@sanity/client"
import { client } from '../client'


export const createUserIfNotExistsAPI = async (doc: IdentifiedSanityDocumentStub<any>) => {
  return await client.createIfNotExists(doc)
}
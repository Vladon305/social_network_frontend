import { IdentifiedSanityDocumentStub, SanityDocumentStub, UploadOptions } from '@sanity/client'
import { client } from '../client'

type AttributeSet = { [key: string]: any }
export const Api = {
  async fetch(query: string) {
    return await client.fetch(query)
  },

  async create(doc: SanityDocumentStub<any>) {
    return await client.create(doc)
  },

  async createIfNotExists(doc: IdentifiedSanityDocumentStub<any>) {
    return await client.createIfNotExists(doc)
  },

  async patch(documentId: string, data: AttributeSet) {
    return await client.patch(documentId).set(data).commit()
  },

  async patchInArray(
    documentId: string,
    attrs: AttributeSet,
    inserting: { at: 'replace' | 'before' | 'after'; selector: string; items: any[] }
  ) {
    return await client
      .patch(documentId)
      .setIfMissing(attrs)
      .insert(inserting.at, inserting.selector, inserting.items)
      .commit()
  },

  async asset(
    assetType: 'image',
    body: File | Blob | Buffer | ReadableStream<any>,
    options?: UploadOptions | undefined
  ) {
    return await client.assets.upload(assetType, body, options)
  },

  async delete(id: string) {
    return await client.delete(id)
  }
}

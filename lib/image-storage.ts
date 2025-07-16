// Image storage system using IndexedDB for better file handling
export interface StoredImage {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedAt: string
  alt?: string
  caption?: string
}

const DB_NAME = "constructora_images"
const DB_VERSION = 1
const STORE_NAME = "images"

class ImageStorage {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id" })
          store.createIndex("uploadedAt", "uploadedAt", { unique: false })
        }
      }
    })
  }

  async saveImage(image: StoredImage): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.put(image)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async getImages(): Promise<StoredImage[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readonly")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const images = request.result.sort(
          (a: StoredImage, b: StoredImage) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
        )
        resolve(images)
      }
    })
  }

  async deleteImage(id: string): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.delete(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async updateImage(image: StoredImage): Promise<void> {
    return this.saveImage(image)
  }
}

export const imageStorage = new ImageStorage()

// Utility functions
export function generateImageId(): string {
  return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function resizeImage(file: File, maxWidth = 1200, maxHeight = 800, quality = 0.8): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(resolve, "image/jpeg", quality)
    }

    img.src = URL.createObjectURL(file)
  })
}

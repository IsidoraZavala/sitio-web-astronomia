import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GoogleGenAI } from '@google/genai'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

const env = fs.readFileSync(path.join(ROOT_DIR, '.env.local'), 'utf-8')
const key = env.match(/GEMINI_API_KEY=(.*)/)[1].trim()
const ai = new GoogleGenAI({ apiKey: key })

async function test() {
  const models = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-3.1-pro-preview', 'gemini-pro-latest']
  for (const m of models) {
    try {
      console.log('Testing', m, '...')
      const res = await ai.models.generateContent({
        model: m,
        contents: 'Hola, di OK si funcionas.'
      })
      console.log('✅', m, 'SUCCESS:', res.text.trim())
      return m
    } catch (e) {
      console.log('❌', m, 'ERROR:', e.message)
    }
  }
}

test()

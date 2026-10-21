import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

const IMAGES_DIR = path.join(ROOT_DIR, 'public', 'images', 'ambiental')
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true })
}

async function download(url, filename) {
  const dest = path.join(IMAGES_DIR, filename)
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(dest, buf)
    console.log(`✅ [${filename}] guardada correctamente (${Math.round(buf.length / 1024)} KB)`)
    return true
  } catch (err) {
    console.warn(`⚠️ Error descargando ${filename} desde ${url}: ${err.message}`)
    return false
  }
}

async function scrapeAndDownload() {
  console.log('🖼️ Iniciando descarga automática de imágenes oficiales de la NASA / LROC...')

  // 1. Bolsa Apolo 11 (AS11-40-5850)
  await download(
    'https://www.hq.nasa.gov/alsj/a11/AS11-40-5850.jpg',
    'foto1_apolo11_residuos.jpg'
  )

  // 2. Sitios de descenso Apolo 11-17 (Composición / LROC Apollo 11 Landing Site)
  await download(
    'https://www.nasa.gov/wp-content/uploads/2023/03/384278main_apollo11_labelled_full.jpg',
    'foto2_sitios_apolo.jpg'
  )

  // 3. Hakuto-R Mission 1 impacto en la Luna (LRO Goddard)
  await download(
    'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001435/GSFC_20171208_Archive_e001435~medium.jpg',
    'foto3_hakuto_r.jpg'
  )

  // 4. Paracaídas y cubierta de descenso de Perseverance (PIA25218)
  await download(
    'https://photojournal.jpl.nasa.gov/jpeg/PIA25218.jpg',
    'foto4_perseverance_paracaidas.jpg'
  )

  // 5. Fragmento de aislamiento térmico de Perseverance (Dacron en roca)
  await download(
    'https://mars.nasa.gov/system/resources/detail_files/26792_PIA25324-web.jpg',
    'foto5_perseverance_aislamiento.jpg'
  )

  console.log('🎉 Proceso de imágenes finalizado.')
}

scrapeAndDownload()

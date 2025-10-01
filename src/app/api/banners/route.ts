import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const setting = await db.setting.findUnique({
      where: {
        key: 'add_banners'
      }
    })

    if (!setting) {
      return NextResponse.json({ banners: [] })
    }

    // Парсим JSON из value
    let banners: string[] = []
    try {
      banners = JSON.parse(setting.value)
    } catch (error) {
      console.error('Ошибка парсинга баннеров:', error)
      return NextResponse.json({ banners: [] })
    }

    return NextResponse.json({ banners })
  } catch (error) {
    console.error('Ошибка загрузки баннеров:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки баннеров' },
      { status: 500 }
    )
  }
}


import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const categories = await db.category.findMany({
      where: {
        categoryId: null // Только родительские категории
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки категорий' },
      { status: 500 }
    )
  }
}


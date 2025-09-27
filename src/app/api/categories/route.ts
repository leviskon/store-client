import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// Рекурсивная функция для построения полной иерархии категорий
async function buildCategoryHierarchy(categories: any[], level = 0): Promise<any[]> {
  const result = []
  
  for (const category of categories) {
    // Загружаем подкатегории
    
    const subCategories = await db.category.findMany({
      where: {
        categoryId: category.id
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    // Найдено подкатегорий
    
    const categoryWithSubs = {
      ...category,
      subCategories: subCategories.length > 0 ? await buildCategoryHierarchy(subCategories, level + 1) : []
    }
    
    result.push(categoryWithSubs)
  }
  
  return result
}

export async function GET() {
  try {
    // Получаем все корневые категории (без родителя)
    const rootCategories = await db.category.findMany({
      where: {
        categoryId: null
      },
      orderBy: {
        name: 'asc'
      }
    })

    // Строим полную иерархию рекурсивно
    const fullHierarchy = await buildCategoryHierarchy(rootCategories)

    return NextResponse.json(fullHierarchy)
  } catch (_error) {
    // Ошибка загрузки категорий
    return NextResponse.json(
      { error: 'Ошибка загрузки категорий' },
      { status: 500 }
    )
  }
}

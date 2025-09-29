import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// Рекурсивная функция для построения иерархии подкатегорий
async function buildSubcategories(categoryId: string): Promise<any[]> {
  const subcategories = await db.category.findMany({
    where: {
      categoryId: categoryId
    },
    orderBy: {
      name: 'asc'
    }
  })

  const result = []
  
  for (const subcategory of subcategories) {
    const subSubcategories = await buildSubcategories(subcategory.id)
    
    const categoryWithSubs = {
      ...subcategory,
      subCategories: subSubcategories
    }
    
    result.push(categoryWithSubs)
  }
  
  return result
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const category = await db.category.findUnique({
      where: {
        id: id
      }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Категория не найдена' },
        { status: 404 }
      )
    }

    // Загружаем подкатегории
    const subCategories = await buildSubcategories(id)

    const categoryWithSubs = {
      ...category,
      subCategories
    }

    return NextResponse.json(categoryWithSubs)
  } catch (error) {
    console.error('Ошибка загрузки категории:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки категории' },
      { status: 500 }
    )
  }
}

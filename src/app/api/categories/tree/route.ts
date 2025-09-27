import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// Рекурсивная функция для подсчета общего количества подкатегорий
function countAllSubcategories(category: any): number {
  let count = category.subCategories ? category.subCategories.length : 0
  if (category.subCategories) {
    category.subCategories.forEach((sub: any) => {
      count += countAllSubcategories(sub)
    })
  }
  return count
}

// Рекурсивная функция для построения полной иерархии с дополнительной информацией
async function buildCategoryTree(categories: any[]): Promise<any[]> {
  const result = []
  
  for (const category of categories) {
    const subCategories = await db.category.findMany({
      where: {
        categoryId: category.id
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    const categoryWithSubs = {
      ...category,
      subCategories: subCategories.length > 0 ? await buildCategoryTree(subCategories) : [],
      totalSubcategories: 0 // Будет вычислено после построения дерева
    }
    
    result.push(categoryWithSubs)
  }
  
  // Вычисляем общее количество подкатегорий для каждой категории
  result.forEach(category => {
    category.totalSubcategories = countAllSubcategories(category)
  })
  
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
    const fullTree = await buildCategoryTree(rootCategories)

    return NextResponse.json({
      categories: fullTree,
      totalCategories: fullTree.length,
      maxDepth: Math.max(...fullTree.map(cat => getMaxDepth(cat)), 0)
    })
  } catch (error) {
    console.error('Ошибка загрузки дерева категорий:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки дерева категорий' },
      { status: 500 }
    )
  }
}

// Функция для определения максимальной глубины иерархии
function getMaxDepth(category: any): number {
  if (!category.subCategories || category.subCategories.length === 0) {
    return 1
  }
  
  const maxChildDepth = Math.max(...category.subCategories.map((child: any) => getMaxDepth(child)))
  return 1 + maxChildDepth
}

import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    // Products API вызван
    
    // Получаем параметры фильтрации
    const categoryId = searchParams.get('categoryId')
    const includeSubcategories = searchParams.get('includeSubcategories') === 'true'
    const categories = searchParams.getAll('categories')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sortBy = searchParams.get('sortBy') || 'newest'
    const minRating = searchParams.get('minRating')
    const seller = searchParams.get('seller')
    const search = searchParams.get('search')

    // Строим условия фильтрации
    const where: any = {
      status: 'ACTIVE' // Показываем только активные товары
    }
    
    if (categoryId) {
      if (includeSubcategories) {
        // Если нужно включить подкатегории, загружаем их
        const categoryWithSubs = await db.category.findUnique({
          where: { id: categoryId },
          include: { subCategories: true }
        })
        
        if (categoryWithSubs) {
          const categoryIds = [categoryId, ...categoryWithSubs.subCategories.map(sub => sub.id)]
          where.categoryId = { in: categoryIds }
        } else {
          where.categoryId = categoryId
        }
      } else {
        where.categoryId = categoryId
      }
    } else if (categories.length > 0) {
      where.categoryId = {
        in: categories
      }
    }
    
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    if (seller) {
      where.seller = {
        fullname: {
          contains: seller,
          mode: 'insensitive'
        }
      }
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ]
    }

            // Настраиваем сортировку
            let orderBy: { createdAt?: 'asc' | 'desc'; price?: 'asc' | 'desc' } = { createdAt: 'desc' }
    
    switch (sortBy) {
      case 'oldest':
        orderBy = { createdAt: 'asc' }
        break
      case 'price_low':
        orderBy = { price: 'asc' }
        break
      case 'price_high':
        orderBy = { price: 'desc' }
        break
      case 'rating':
        // Для сортировки по рейтингу нужно будет использовать raw SQL или агрегацию
        orderBy = { createdAt: 'desc' }
        break
      default:
        orderBy = { createdAt: 'desc' }
    }

    let products = await db.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        },
        seller: {
          select: {
            fullname: true
          }
        },
        reviews: {
          select: {
            rating: true
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      },
      orderBy,
      take: 50 // Увеличиваем лимит для фильтрации
    })

    // Фильтрация по минимальному рейтингу (делаем на клиенте, так как в Prisma сложно)
    if (minRating) {
      const minRatingValue = parseFloat(minRating)
      products = products.filter(product => {
        if (product.reviews.length === 0) return minRatingValue === 0
        const avgRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        return avgRating >= minRatingValue
      })
    }

    // Товары найдены
    return NextResponse.json(products)
  } catch (error) {
    // Ошибка загрузки товаров
    console.error('Ошибка загрузки товаров:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки товаров' },
      { status: 500 }
    )
  }
}

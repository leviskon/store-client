import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const product = await db.product.findUnique({
      where: {
        id: id
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        },
        seller: {
          select: {
            id: true,
            fullname: true
          }
        },
        productSizes: {
          include: {
            size: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        productColors: {
          include: {
            color: true
          }
        },
        reviews: {
          select: {
            id: true,
            clientName: true,
            text: true,
            rating: true
          },
          orderBy: {
            id: 'desc'
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Товар не найден' },
        { status: 404 }
      )
    }

    // Вычисляем средний рейтинг
    const averageRating = product.reviews.length > 0 
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0

    // Форматируем данные для клиента
    const formattedProduct = {
      ...product,
      averageRating,
      sizes: product.productSizes.map(ps => ps.size),
      colors: product.productColors.map(pc => pc.color)
    }

    // Удаляем промежуточные поля
    delete (formattedProduct as any).productSizes
    delete (formattedProduct as any).productColors

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.error('Ошибка загрузки товара:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки товара' },
      { status: 500 }
    )
  }
}




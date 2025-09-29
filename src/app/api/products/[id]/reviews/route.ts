import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// Получение отзывов для конкретного товара
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const reviews = await db.review.findMany({
      where: { productId: id },
      orderBy: { id: 'desc' } // Новые отзывы сверху
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Ошибка загрузки отзывов:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки отзывов' },
      { status: 500 }
    )
  }
}

// Создание нового отзыва
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const { clientName, text, rating } = body

    // Валидация данных
    if (!clientName || !clientName.trim()) {
      return NextResponse.json(
        { error: 'Имя клиента обязательно для заполнения' },
        { status: 400 }
      )
    }

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Текст отзыва обязателен для заполнения' },
        { status: 400 }
      )
    }

    if (text.trim().length < 10) {
      return NextResponse.json(
        { error: 'Отзыв должен содержать минимум 10 символов' },
        { status: 400 }
      )
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Рейтинг должен быть от 1 до 5' },
        { status: 400 }
      )
    }

    // Проверяем, существует ли товар
    const product = await db.product.findUnique({
      where: { id },
      select: { id: true, status: true }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Товар не найден' },
        { status: 404 }
      )
    }

    if (product.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Нельзя оставлять отзывы на неактивные товары' },
        { status: 400 }
      )
    }

    // Создаем отзыв
    const review = await db.review.create({
      data: {
        productId: id,
        clientName: clientName.trim(),
        text: text.trim(),
        rating: parseInt(rating)
      }
    })

    return NextResponse.json({
      success: true,
      review,
      message: 'Отзыв успешно добавлен'
    }, { status: 201 })

  } catch (error) {
    console.error('Ошибка создания отзыва:', error)
    return NextResponse.json(
      { error: 'Ошибка создания отзыва' },
      { status: 500 }
    )
  }
}

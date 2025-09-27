import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// Получение всех заказов
export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                category: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Ошибка загрузки заказов:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки заказов' },
      { status: 500 }
    )
  }
}

// Создание нового заказа
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      customerName,
      customerPhone,
      deliveryAddress,
      cartItems
    } = body

    // Валидация данных
    if (!customerName || !customerPhone || !deliveryAddress) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      )
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Корзина пуста' },
        { status: 400 }
      )
    }

    // Проверяем, что все товары существуют и активны
    const productIds = cartItems.map(item => item.id)
    const products = await db.product.findMany({
      where: {
        id: { in: productIds },
        status: 'ACTIVE'
      }
    })

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: 'Некоторые товары больше не доступны' },
        { status: 400 }
      )
    }

    // Создаем заказ в транзакции
    const result = await db.$transaction(async (tx) => {
      // Создаем заказ
      const order = await tx.order.create({
        data: {
          customerName,
          customerPhone,
          deliveryAddress,
          status: 'CREATED'
        }
      })

      // Создаем позиции заказа
      const orderItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = products.find(p => p.id === item.id)
          if (!product) {
            throw new Error(`Товар с ID ${item.id} не найден`)
          }

          return tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.id,
              amount: item.quantity,
              price: product.price
            }
          })
        })
      )

      return { order, orderItems }
    })

    // Возвращаем созданный заказ с позициями
    const createdOrder = await db.order.findUnique({
      where: { id: result.order.id },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                category: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      order: createdOrder,
      message: 'Заказ успешно создан'
    }, { status: 201 })

  } catch (error) {
    console.error('Ошибка создания заказа:', error)
    return NextResponse.json(
      { error: 'Ошибка создания заказа' },
      { status: 500 }
    )
  }
}

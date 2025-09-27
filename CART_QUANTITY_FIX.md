# Исправление проблемы с количеством товаров в корзине

## Проблема
При нажатии на кнопку "+" в корзине добавлялось сразу 5 штук товара вместо 1.

## Причина
В функции `handleQuantityChange` в файле `src/app/product/[id]/page.tsx` использовалась функция `addToCart` вместо `updateQuantity` для обновления количества товара. Это приводило к тому, что товар добавлялся заново, а не обновлялось количество существующего товара.

## Исправления

### 1. Добавлен импорт updateQuantity
```typescript
const { addToCart, removeFromCart, updateQuantity, cartItems } = useCart()
```

### 2. Исправлена функция handleQuantityChange
**Было:**
```typescript
const handleQuantityChange = async (delta: number) => {
  // ... код ...
  if (newQuantity <= 0) {
    const success = await removeFromCart(cartItem)
    // ...
  } else {
    const success = await addToCart(cartItem, newQuantity) // ❌ Неправильно!
    // ...
  }
}
```

**Стало:**
```typescript
const handleQuantityChange = async (delta: number) => {
  if (!product) return

  const newQuantity = quantity + delta
  
  if (newQuantity <= 0) {
    // Удаляем товар из корзины
    removeFromCart(product.id, selectedSize, selectedColor)
    setIsInCart(false)
    setQuantity(0)
  } else {
    // Обновляем количество в корзине
    updateQuantity(product.id, newQuantity, selectedSize, selectedColor) // ✅ Правильно!
    setQuantity(newQuantity)
  }
}
```

## Результат
✅ При нажатии на "+" количество увеличивается на 1
✅ При нажатии на "-" количество уменьшается на 1
✅ Товары с разными размерами/цветами обрабатываются корректно
✅ Удаление товаров работает правильно

## Тестирование
1. Добавьте товар в корзину
2. Нажмите "+" - количество должно увеличиться на 1
3. Нажмите "-" - количество должно уменьшиться на 1
4. При количестве 0 товар должен исчезнуть из корзины

Теперь корзина работает корректно!

# Tailwind CSS Integration

## ✅ Установлено

- `tailwindcss` - основная библиотека
- `postcss` - для обработки CSS
- `autoprefixer` - автоматические вендорные префиксы

## 📁 Созданные файлы

- `tailwind.config.js` - конфигурация Tailwind CSS
- `postcss.config.js` - конфигурация PostCSS
- `src/index.css` - обновлен с директивами Tailwind

## 🔄 Конвертированные компоненты

### LeaderBoard.jsx
Все inline стили заменены на Tailwind классы:
- `style={{ padding: '20px' }}` → `className="p-5"`
- `style={{ display: 'flex', flexDirection: 'column' }}` → `className="flex flex-col"`
- `style={{ backgroundColor: '#f9f9f9' }}` → `className="bg-gray-50"`

### App.jsx
- Убран импорт `App.css`
- Добавлен фоновый цвет и минимальная высота экрана

## 🎨 Основные Tailwind классы

### Spacing (отступы)
- `p-5` = padding: 20px
- `px-4` = padding-left/right: 16px
- `py-3` = padding-top/bottom: 12px
- `ml-4` = margin-left: 16px
- `gap-2` = gap: 8px

### Layout
- `flex` = display: flex
- `flex-col` = flex-direction: column
- `items-center` = align-items: center
- `justify-between` = justify-content: space-between
- `flex-1` = flex: 1

### Typography
- `text-base` = font-size: 16px
- `font-medium` = font-weight: 500
- `font-semibold` = font-weight: 600
- `text-center` = text-align: center

### Colors
- `bg-white` = background-color: white
- `bg-gray-50` = background-color: #f9f9f9
- `text-gray-800` = color: #1f2937
- `text-red-500` = color: #ef4444

### Sizing
- `max-w-3xl` = max-width: 48rem (768px)
- `mx-auto` = margin-left/right: auto

### Border & Effects
- `rounded-lg` = border-radius: 8px
- `transition-colors` = transition: color, background-color

## 📚 Документация

[Tailwind CSS Documentation](https://tailwindcss.com/docs)

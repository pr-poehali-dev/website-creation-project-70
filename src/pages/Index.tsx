import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Беспроводные наушники Premium',
    price: 12990,
    category: 'Аудио',
    image: 'https://cdn.poehali.dev/projects/43590b6f-112f-495d-a47e-74cacda10013/files/0ef0b93b-5a84-4e4a-afa4-a331239fa11a.jpg',
    description: 'Высококачественный звук с активным шумоподавлением'
  },
  {
    id: 2,
    name: 'Умные часы Sport Edition',
    price: 24990,
    category: 'Гаджеты',
    image: 'https://cdn.poehali.dev/projects/43590b6f-112f-495d-a47e-74cacda10013/files/ea1ac63b-ffad-4445-beb1-d82f711deaff.jpg',
    description: 'Мониторинг здоровья и фитнес-трекер'
  },
  {
    id: 3,
    name: 'Ноутбук Business Pro',
    price: 89990,
    category: 'Компьютеры',
    image: 'https://cdn.poehali.dev/projects/43590b6f-112f-495d-a47e-74cacda10013/files/7bb4d97d-ddce-49d9-b1de-47dff06b53b9.jpg',
    description: 'Производительность для бизнеса'
  },
  {
    id: 4,
    name: 'Беспроводная клавиатура',
    price: 5990,
    category: 'Компьютеры',
    image: 'https://cdn.poehali.dev/projects/43590b6f-112f-495d-a47e-74cacda10013/files/7bb4d97d-ddce-49d9-b1de-47dff06b53b9.jpg',
    description: 'Эргономичный дизайн для комфортной работы'
  },
  {
    id: 5,
    name: 'Портативная колонка',
    price: 7990,
    category: 'Аудио',
    image: 'https://cdn.poehali.dev/projects/43590b6f-112f-495d-a47e-74cacda10013/files/0ef0b93b-5a84-4e4a-afa4-a331239fa11a.jpg',
    description: 'Мощный звук в компактном корпусе'
  },
  {
    id: 6,
    name: 'Фитнес-браслет',
    price: 3990,
    category: 'Гаджеты',
    image: 'https://cdn.poehali.dev/projects/43590b6f-112f-495d-a47e-74cacda10013/files/ea1ac63b-ffad-4445-beb1-d82f711deaff.jpg',
    description: 'Отслеживание активности 24/7'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('catalog');

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold">SHOP</h1>
              <nav className="hidden md:flex gap-6">
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  Каталог
                </Button>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  О нас
                </Button>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  Доставка
                </Button>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  Контакты
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Icon name="Search" size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setActiveTab('account')}
              >
                <Icon name="User" size={20} />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/10">
                    <Icon name="ShoppingCart" size={20} />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map(item => (
                          <div key={item.id} className="flex gap-4 p-4 border rounded-md">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between text-lg font-semibold mb-4">
                            <span>Итого:</span>
                            <span>{cartTotal.toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="hidden">
            <TabsTrigger value="catalog">Каталог</TabsTrigger>
            <TabsTrigger value="account">Личный кабинет</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="mt-0">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4">Каталог товаров</h2>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
                <div className="flex gap-2 flex-wrap">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{product.price.toLocaleString()} ₽</span>
                      <Button onClick={() => addToCart(product)} className="gap-2">
                        <Icon name="ShoppingCart" size={18} />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="account" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8">Личный кабинет</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                      И
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Иван Петров</h3>
                      <p className="text-muted-foreground">ivan@example.com</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Телефон:</span>
                      <span>+7 (999) 123-45-67</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Бонусы:</span>
                      <span className="font-semibold">1 250 ₽</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6" variant="outline">
                    Редактировать профиль
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-xl mb-4">Адрес доставки</h3>
                  <div className="space-y-2 text-sm mb-6">
                    <p>г. Москва</p>
                    <p>ул. Примерная, д. 123, кв. 45</p>
                    <p className="text-muted-foreground">Индекс: 123456</p>
                  </div>
                  <Button className="w-full" variant="outline">
                    Изменить адрес
                  </Button>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="font-semibold text-xl mb-6">История заказов</h3>
                <div className="space-y-4">
                  {[
                    { id: '#12345', date: '15.10.2024', status: 'Доставлен', total: 42980 },
                    { id: '#12344', date: '03.10.2024', status: 'В пути', total: 12990 },
                    { id: '#12343', date: '28.09.2024', status: 'Доставлен', total: 24990 }
                  ].map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-md hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <Badge variant={order.status === 'Доставлен' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{order.total.toLocaleString()} ₽</p>
                        <Button variant="link" className="h-auto p-0 text-accent">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-primary text-primary-foreground mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SHOP</h3>
              <p className="text-sm opacity-90">Интернет-магазин электроники и аксессуаров премиум-класса</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>Доставка и оплата</li>
                <li>Гарантия</li>
                <li>Возврат товара</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>О нас</li>
                <li>Контакты</li>
                <li>Вакансии</li>
                <li>Партнёрам</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm opacity-90">
                <p>+7 (495) 123-45-67</p>
                <p>info@shop.ru</p>
                <div className="flex gap-3 mt-4">
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-primary-foreground hover:bg-primary-foreground/10">
                    <Icon name="Phone" size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-primary-foreground hover:bg-primary-foreground/10">
                    <Icon name="Mail" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
            <p>© 2024 SHOP. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

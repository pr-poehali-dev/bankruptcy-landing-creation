import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({
    debt: '',
    collateral: '',
    city: '',
    contact: ''
  });
  const [showFinalForm, setShowFinalForm] = useState(false);
  const [finalFormData, setFinalFormData] = useState({ name: '', phone: '' });
  const [consultFormData, setConsultFormData] = useState({ name: '', phone: '', question: '' });

  const scrollToQuiz = () => {
    setShowQuiz(true);
    setTimeout(() => {
      document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToConsult = () => {
    setShowConsultForm(true);
    setTimeout(() => {
      document.getElementById('consult-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const canProceed = () => {
    if (currentQuestion === 1) return answers.debt !== '';
    if (currentQuestion === 2) return answers.collateral !== '';
    if (currentQuestion === 3) return answers.city.trim() !== '';
    if (currentQuestion === 4) return answers.contact !== '';
    return false;
  };

  const handleNext = () => {
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowFinalForm(true);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalFormData.name.trim() || !finalFormData.phone.trim()) {
      toast({
        title: 'Заполните все поля',
        description: 'Пожалуйста, укажите имя и номер телефона',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время'
    });
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultFormData.name.trim() || !consultFormData.phone.trim()) {
      toast({
        title: 'Заполните обязательные поля',
        description: 'Укажите имя и номер телефона',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: 'Заявка отправлена!',
      description: 'Наш специалист свяжется с вами в ближайшее время'
    });
    setConsultFormData({ name: '', phone: '', question: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Scale" className="text-primary" size={32} />
            <span className="text-2xl font-heading font-bold text-primary">Витакон</span>
          </div>
          <a href="tel:88006001974" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
            <Icon name="Phone" size={20} />
            <span className="font-semibold">8 (800) 600-19-74</span>
          </a>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
              Не торопитесь банкротиться!
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-4">
              Узнайте про реальные последствия.
            </p>
          </div>

          <div className="flex justify-center mb-16 animate-slide-up">
            <Button 
              onClick={scrollToQuiz}
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white text-xl px-12 py-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse-slow"
            >
              <Icon name="FileCheck" className="mr-3" size={28} />
              ПОЛУЧИТЬ АНАЛИЗ СИТУАЦИИ БЕСПЛАТНО
            </Button>
          </div>

          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 shadow-xl animate-slide-up">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <Icon name="AlertTriangle" className="text-red-600 flex-shrink-0" size={40} />
                <div>
                  <h3 className="text-2xl font-heading font-bold text-red-800 mb-4">
                    Не стоит надеяться что ваша ситуация такая же простая, как пишут в рекламе!
                  </h3>
                  <p className="text-lg text-red-700 font-semibold mb-4">Не разобравшись, вы можете:</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: 'XCircle', text: 'Не списать долги и потратить время' },
                  { icon: 'Home', text: 'Лишиться дорогого Вам имущества' },
                  { icon: 'Gavel', text: 'Получить административную/уголовную ответственность за предумышленное банкротство' },
                  { icon: 'TrendingDown', text: 'Потратить кучу денег и нервов впустую' }
                ].map((risk, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                    <Icon name={risk.icon} className="text-red-600 flex-shrink-0 mt-1" size={24} />
                    <p className="text-gray-800 font-medium">{risk.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <Icon name="Book" className="mx-auto mb-6 animate-pulse" size={64} />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Узнайте подходите ли Вы под государственную программу списания долгов
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all">
              <CardContent className="p-6">
                <Icon name="Shield" className="mx-auto mb-4" size={48} />
                <p className="font-semibold text-lg">Вам это подойдет 100%</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all">
              <CardContent className="p-6">
                <Icon name="ShieldAlert" className="mx-auto mb-4" size={48} />
                <p className="font-semibold text-lg">«Как не связаться с мошенниками при банкротстве»</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all">
              <CardContent className="p-6">
                <Icon name="Users" className="mx-auto mb-4" size={48} />
                <p className="font-semibold text-lg">«7 способов избавиться от коллекторов в 2025г»</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Об этом не скажут другие юристы
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              По статистике официального реестра Федресурс за последние 3 года более 3000 процедур имели признаки преднамеренного банкротства и более 30000 закончились признанием сделок должника недействительными.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: 'FileX',
                color: 'bg-red-500',
                title: 'Банкротство по 127-ФЗ не гарантирует списание долгов',
                text: 'Внимательно изучите договор. Результатом будет списание долгов или статус банкрота. Есть ли хоть какие то гарантии результата.'
              },
              {
                icon: 'Gavel',
                color: 'bg-orange-500',
                title: 'За преднамеренное банкротство грозит Уголовная ответственность',
                text: 'Если будут ошибки и кредитор заподозрит, что банкротство фиктивное, то Вам грозит лишение свободы до 7 лет и штраф на сумму до 5 млн рублей по статье 196 УК РФ.'
              },
              {
                icon: 'Home',
                color: 'bg-blue-500',
                title: 'Можно лишиться имущества',
                text: 'У Вас ипотека, автокредит или Вы совершали сделки с имуществом за последние 3 года? Прежде чем приступать к процедуре, необходимо проанализировать все сделки и доказать добросовестность в отношении их'
              },
              {
                icon: 'HelpCircle',
                color: 'bg-purple-500',
                title: 'А точно нужно банкротиться сейчас?',
                text: 'Банкротство по 127 ФЗ - не единственный выход, имеются как минимум 2 альтернативы: 1. реструктуризация долга; 2. упрощённое банкротство через МФЦ. Каждый случай уникальный и ситуацию всегда необходимо рассматривать в комплексе.'
              }
            ].map((card, i) => (
              <Card key={i} className="hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group">
                <CardContent className="p-0">
                  <div className={`${card.color} p-6 text-white transform group-hover:scale-105 transition-transform duration-300`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-white/20 backdrop-blur p-4 rounded-full">
                        <Icon name={card.icon} size={32} />
                      </div>
                      <h3 className="text-xl font-heading font-bold flex-1">{card.title}</h3>
                    </div>
                    <p className="leading-relaxed">{card.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {showQuiz && (
        <section id="quiz-section" className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            {!showFinalForm ? (
              <Card className="shadow-2xl border-2 border-primary/20 animate-fade-in">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-semibold text-gray-500">Вопрос {currentQuestion} из 4</span>
                      <span className="text-sm font-semibold text-secondary">{Math.round((currentQuestion / 4) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-secondary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(currentQuestion / 4) * 100}%` }}
                      />
                    </div>
                  </div>

                  {currentQuestion === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-2xl font-heading font-bold text-primary">
                        Укажите общую сумму ваших задолженностей
                      </h3>
                      <RadioGroup value={answers.debt} onValueChange={(val) => setAnswers({...answers, debt: val})}>
                        {['до 300 тыс ₽', 'от 300 000 ₽ до 500 000 ₽', 'от 500 000 ₽ до 1 000 000 ₽', 'свыше 1 000 000 ₽'].map((option) => (
                          <div key={option} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 border-2 border-transparent hover:border-secondary/30 transition-all cursor-pointer">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="flex-1 cursor-pointer text-lg">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {currentQuestion === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-2xl font-heading font-bold text-primary">
                        Есть ли у Вас залоговое имущество?
                      </h3>
                      <RadioGroup value={answers.collateral} onValueChange={(val) => setAnswers({...answers, collateral: val})}>
                        {[
                          'В залоге ничего нет',
                          'Да, ипотека (для Вас действует отдельное предложение)',
                          'Да, автокредит (Возможно сохранить кредитное авто)',
                          'Да, ипотека и автокредит',
                          'Затрудняюсь ответить'
                        ].map((option) => (
                          <div key={option} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 border-2 border-transparent hover:border-secondary/30 transition-all cursor-pointer">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="flex-1 cursor-pointer text-lg">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {currentQuestion === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-2xl font-heading font-bold text-primary">
                        Из какого вы города?
                      </h3>
                      <Input
                        placeholder="Введите ваш город"
                        value={answers.city}
                        onChange={(e) => setAnswers({...answers, city: e.target.value})}
                        className="text-lg p-6 border-2"
                      />
                    </div>
                  )}

                  {currentQuestion === 4 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-2xl font-heading font-bold text-primary">
                        Как для Вас удобнее получить результат анализа вашей ситуации с долгами?
                      </h3>
                      <RadioGroup value={answers.contact} onValueChange={(val) => setAnswers({...answers, contact: val})}>
                        {[
                          'Личная консультация в офисе',
                          'Консультация по телефону',
                          'Отправить результат в WhatsApp',
                          'Отправить результат в Telegram',
                          'Отправить результат в VK'
                        ].map((option) => (
                          <div key={option} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 border-2 border-transparent hover:border-secondary/30 transition-all cursor-pointer">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="flex-1 cursor-pointer text-lg">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    {currentQuestion > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => setCurrentQuestion(currentQuestion - 1)}
                        className="text-lg px-8 py-6"
                      >
                        <Icon name="ChevronLeft" className="mr-2" size={20} />
                        Назад
                      </Button>
                    )}
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="ml-auto bg-secondary hover:bg-secondary/90 text-lg px-8 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {currentQuestion === 4 ? 'Завершить' : 'Далее'}
                      <Icon name="ChevronRight" className="ml-2" size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-2xl border-2 border-secondary animate-fade-in">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Icon name="CheckCircle" className="mx-auto text-green-600 mb-4" size={64} />
                    <h3 className="text-3xl font-heading font-bold text-primary mb-4">
                      Подтвердите, что вы не Робот
                    </h3>
                    <p className="text-lg text-gray-700">
                      и получите решение по вашей ситуации!
                    </p>
                    <p className="text-gray-600 mt-2">
                      Для этого напишите имя и номер телефона. Мы вышлем бесплатное проверочное смс-сообщение на него.
                    </p>
                  </div>

                  <form onSubmit={handleFinalSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-lg font-semibold">Ваше имя</Label>
                      <Input
                        id="name"
                        placeholder="Введите ваше имя"
                        value={finalFormData.name}
                        onChange={(e) => setFinalFormData({...finalFormData, name: e.target.value})}
                        className="text-lg p-6 mt-2 border-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-lg font-semibold">Номер телефона</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={finalFormData.phone}
                        onChange={(e) => setFinalFormData({...finalFormData, phone: e.target.value})}
                        className="text-lg p-6 mt-2 border-2"
                      />
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
                      <p className="text-center font-semibold text-lg mb-4">После теста, Вы получите:</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                          <div className="flex-1">
                            <p className="font-semibold">«Как не связаться с мошенниками при банкротстве»</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 line-through">2990 ₽</p>
                            <p className="text-green-600 font-bold text-xl">Бесплатно</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                          <div className="flex-1">
                            <p className="font-semibold">Получите инструкцию для МФЦ</p>
                            <p className="text-sm text-gray-600">Комплект документов и инструкций для самостоятельного прохождения банкротства</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 line-through">5900 ₽</p>
                            <p className="text-green-600 font-bold text-xl">Бесплатно</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 text-xl py-8"
                    >
                      <Icon name="Send" className="mr-3" size={24} />
                      ПОЛУЧИТЬ БЕСПЛАТНЫЙ АНАЛИЗ
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {showConsultForm && (
        <section id="consult-section" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-2xl">
            <Card className="shadow-2xl border-2 border-blue-200 animate-fade-in">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Icon name="MessageSquare" className="mx-auto text-blue-600 mb-4" size={64} />
                  <h3 className="text-3xl font-heading font-bold text-primary mb-4">
                    Получить консультацию бесплатно
                  </h3>
                  <p className="text-lg text-gray-700">
                    Оставьте заявку, и наш специалист свяжется с вами в ближайшее время
                  </p>
                </div>

                <form onSubmit={handleConsultSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="consult-name" className="text-lg font-semibold">Ваше имя *</Label>
                    <Input
                      id="consult-name"
                      placeholder="Введите ваше имя"
                      value={consultFormData.name}
                      onChange={(e) => setConsultFormData({...consultFormData, name: e.target.value})}
                      className="text-lg p-6 mt-2 border-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="consult-phone" className="text-lg font-semibold">Номер телефона *</Label>
                    <Input
                      id="consult-phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={consultFormData.phone}
                      onChange={(e) => setConsultFormData({...consultFormData, phone: e.target.value})}
                      className="text-lg p-6 mt-2 border-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="consult-question" className="text-lg font-semibold">Ваш вопрос (необязательно)</Label>
                    <Input
                      id="consult-question"
                      placeholder="Опишите вашу ситуацию"
                      value={consultFormData.question}
                      onChange={(e) => setConsultFormData({...consultFormData, question: e.target.value})}
                      className="text-lg p-6 mt-2 border-2"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-xl py-8"
                  >
                    <Icon name="Phone" className="mr-3" size={24} />
                    ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section className="py-16 px-4 bg-gradient-to-r from-secondary to-orange-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Остались вопросы? Мы поможем!
          </h2>
          <p className="text-xl mb-8">
            Получите бесплатную консультацию от наших специалистов
          </p>
          <Button 
            onClick={scrollToConsult}
            size="lg" 
            className="bg-white text-secondary hover:bg-gray-100 text-xl px-12 py-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Icon name="MessageCircle" className="mr-3" size={28} />
            ЗАДАТЬ ВОПРОС СПЕЦИАЛИСТУ
          </Button>
        </div>
      </section>

      <footer className="bg-primary text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Scale" size={32} />
                <span className="text-2xl font-heading font-bold">Витакон</span>
              </div>
              <p className="text-gray-300">37 офисов по всей России</p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-4">Контакты</h4>
              <a href="tel:88006001974" className="flex items-center gap-2 text-white hover:text-secondary transition-colors text-lg">
                <Icon name="Phone" size={20} />
                8 (800) 600-19-74
              </a>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-4">Отзывы</h4>
              <a 
                href="https://yandex.ru/profile/115872286637?lang=ru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icon name="Star" size={20} />
                Читать отзывы на Яндекс
              </a>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="text-sm text-gray-300 mb-4">
              <p className="font-semibold mb-2">ООО "ВИТАКОН"</p>
              <p>г. Курган, ул. Пичугина, стр. 9, пом. 1, офис 221</p>
              <p>ИНН 7451388149 | ОГРН 1157451003973</p>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              © 2026 ВИТАКОН. Все права защищены.<br/>
              Банкротство влечет негативные последствия, в том числе ограничения на получение кредита и повторное банкротство в течение пяти лет. Предварительно обратитесь к своему кредитору и в МФЦ.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

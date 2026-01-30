import json
import os
import requests
from datetime import datetime

def handler(event: dict, context) -> dict:
    """Обработка заявок с отправкой в Битрикс24 и Telegram"""
    
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        name = body.get('name', '').strip()
        phone = body.get('phone', '').strip()
        city = body.get('city', '').strip()
        question = body.get('question', '').strip()
        form_type = body.get('form_type', 'unknown')
        quiz_data = body.get('quiz_data', {})
        
        if not name or not phone:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Имя и телефон обязательны'}),
                'isBase64Encoded': False
            }
        
        bitrix_webhook = 'https://vitakon.bitrix24.ru/rest/114/ay1zn61hmm7j7kmt/'
        
        bitrix_data = {
            'fields': {
                'TITLE': f'Заявка с сайта: {name}',
                'NAME': name,
                'PHONE': [{'VALUE': phone, 'VALUE_TYPE': 'WORK'}],
                'COMMENTS': f"Форма: {form_type}\nТелефон: {phone}\nГород: {city}\n"
            }
        }
        
        if city:
            bitrix_data['fields']['ADDRESS_CITY'] = city
        
        if question:
            bitrix_data['fields']['COMMENTS'] += f"Вопрос: {question}\n"
        
        if quiz_data:
            bitrix_data['fields']['COMMENTS'] += f"\nДанные опроса:\n"
            bitrix_data['fields']['COMMENTS'] += f"- Сумма долга: {quiz_data.get('debt', 'не указано')}\n"
            bitrix_data['fields']['COMMENTS'] += f"- Залоговое имущество: {quiz_data.get('collateral', 'не указано')}\n"
            bitrix_data['fields']['COMMENTS'] += f"- Город: {quiz_data.get('city', 'не указано')}\n"
            bitrix_data['fields']['COMMENTS'] += f"- Способ связи: {quiz_data.get('contact', 'не указано')}\n"
        
        bitrix_response = requests.post(
            f'{bitrix_webhook}crm.lead.add.json',
            json=bitrix_data,
            timeout=10
        )
        
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        telegram_chat_id = '-1003873391577'
        
        telegram_message = f"🔔 Новая заявка!\n\n"
        telegram_message += f"👤 Имя: {name}\n"
        telegram_message += f"📞 Телефон: {phone}\n"
        
        if city:
            telegram_message += f"🏙 Город: {city}\n"
        
        if question:
            telegram_message += f"💬 Вопрос: {question}\n"
        
        telegram_message += f"\n📋 Тип формы: {form_type}\n"
        telegram_message += f"🕐 Время: {datetime.now().strftime('%d.%m.%Y %H:%M')}"
        
        if quiz_data:
            telegram_message += f"\n\n📊 Данные опроса:"
            telegram_message += f"\n💰 Сумма долга: {quiz_data.get('debt', 'не указано')}"
            telegram_message += f"\n🏠 Залоговое имущество: {quiz_data.get('collateral', 'не указано')}"
            telegram_message += f"\n📍 Город: {quiz_data.get('city', 'не указано')}"
            telegram_message += f"\n📬 Способ связи: {quiz_data.get('contact', 'не указано')}"
        
        telegram_response = None
        if telegram_token:
            telegram_response = requests.post(
                f'https://api.telegram.org/bot{telegram_token}/sendMessage',
                json={
                    'chat_id': telegram_chat_id,
                    'text': telegram_message,
                    'parse_mode': 'HTML'
                },
                timeout=10
            )
        
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена',
                'bitrix_status': bitrix_response.status_code if bitrix_response else None,
                'telegram_status': telegram_response.status_code if telegram_response else None
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }

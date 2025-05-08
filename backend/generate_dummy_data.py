# Save as generate_dummy_data.py and run: python generate_dummy_data.py > dummy_data.sql

import random
from datetime import datetime, timedelta

categories = [
    ('Technical', ['Wire Cut', 'Transformer Fault']),
    ('Commercial', ['High Bills', 'Tariff Issues']),
    ('Metering', ['Unable to load token', 'Meter Fault']),
    ('Payment', ['Uncredited payment', 'Overpayment']),
    ('Enquiries', ['Office Location', 'Tariff Info'])
]

statuses = ['open', 'closed', 'in_progress']

def random_date(start, end):
    delta = end - start
    return start + timedelta(seconds=random.randint(0, int(delta.total_seconds())))

start_date = datetime(2024, 1, 1)
end_date = datetime.now()

# Generate 5000 cases
print("-- Cases")
for i in range(100001, 105001):
    account_id = random.randint(100001, 100100)
    cat, subs = random.choice(categories)
    subcat = random.choice(subs)
    assigned_user_id = random.randint(1, 10)
    created_user_id = random.randint(1, 10)
    status = random.choice(statuses)
    date_created = random_date(start_date, end_date)
    date_modified = random_date(date_created, end_date)
    desc = f'Case description {i}'
    print(f"INSERT INTO cases (id, account_id, description, category, subcategory, assigned_user_id, created_user_id, status, date_created, date_modified) VALUES ({i}, {account_id}, '{desc}', '{cat}', '{subcat}', {assigned_user_id}, {created_user_id}, '{status}', '{date_created.strftime('%Y-%m-%d %H:%M:%S')}', '{date_modified.strftime('%Y-%m-%d %H:%M:%S')}');")

# Generate 10000 updates
print("-- Updates")
for i in range(1, 10001):
    case_id = random.randint(100001, 105000)
    update_text = f'Update text {i}'
    updated_by = random.randint(1, 10)
    date_created = random_date(start_date, end_date)
    print(f"INSERT INTO updates (id, case_id, update_text, updated_by, date_created) VALUES ({i}, {case_id}, '{update_text}', {updated_by}, '{date_created.strftime('%Y-%m-%d %H:%M:%S')}');")
# Save as generate_accounts_sql.py

first_names = [
    "Alex", "Taylor", "Jordan", "Morgan", "Casey", "Riley", "Jamie", "Avery",
    "Peyton", "Quinn", "Harper", "Reese", "Skyler", "Rowan", "Sawyer", "Emerson",
    "Finley", "Dakota", "Elliot", "Hayden", "Jesse", "Kendall", "Logan", "Parker",
    "Remy", "Sage"
]
last_names = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
    "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
    "Harris", "Sanchez", "Clark"
]

business_units = [
    ("Ijaiye", "Abule Egba"),
    ("Akute", "Abule Egba"),
    ("Iju", "Abule Egba"),
    ("Dopemu", "Akowonjo"),
    ("Egbeda", "Akowonjo"),
    ("Ipaja", "Akowonjo"),
    ("Idimu", "Akowonjo"),
    ("PTC", "Ikeja"),
    ("Ifako", "Ikeja"),
    ("Oregun", "Ikeja"),
    ("Oba-Akran", "Ikeja"),
    ("Epe", "Ikorodu"),
    ("Odogunyan", "Ikorodu"),
    ("Adiyan", "Ikorodu"),
    ("Ketu", "Shomolu"),
    ("Magodo", "Shomolu"),
    ("Ilupeju", "Shomolu"),
    ("GRA", "Shomolu"),
    ("Ijegun", "Oshodi"),
    ("Ikotun", "Oshodi"),
    ("Igando", "Oshodi"),
    ("Oke-Afa", "Oshodi"),
]

print("INSERT INTO accounts (account_id, first_name, last_name, address, undertaking, business_unit) VALUES")
values = []
for i, account_id in enumerate(range(100075, 100101)):
    fn = first_names[i % len(first_names)]
    ln = last_names[i % len(last_names)]
    address = f"{account_id - 100000 + 1} Power Lane, Cityville"
    undertaking, business_unit = business_units[i % len(business_units)]
    values.append(f"({account_id}, '{fn}', '{ln}', '{address}', '{undertaking}', '{business_unit}')")

print(",\n".join(values) + ";")
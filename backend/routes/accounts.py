from flask import Blueprint, request, jsonify
from backend.models.schema import Account, Case, User
from backend.database import db_session

accounts_bp = Blueprint('accounts', __name__)

@accounts_bp.route('/', methods=['GET'])
def get_accounts():
    accounts = db_session.query(Account).all()
    return jsonify([{
        'account_id': account.account_id,
        'first_name': account.first_name,
        'last_name': account.last_name,
        'address': account.address,
        'business_unit': account.business_unit,
        'undertaking': account.undertaking
    } for account in accounts])

@accounts_bp.route('/account_details/<int:account_id>', methods=['GET'])
def get_account_details(account_id):
    account = db_session.query(Account).get(account_id)
    if account:
        return jsonify({
            'account_id': account.account_id,
            'first_name': account.first_name,
            'last_name': account.last_name,
            'address': account.address,
            'business_unit': account.business_unit,
            'undertaking': account.undertaking
        })
    return jsonify({'error': 'Account not found'}), 404

@accounts_bp.route('/account_cases/<int:account_id>', methods=['GET'])
def get_account_cases(account_id):
    cases = db_session.query(Case).filter_by(account_id=account_id).all()
    result = []
    for case in cases:
        assigned_user = db_session.query(User).get(case.assigned_user_id)
        assigned_user_name = (
            f"{assigned_user.first_name} {assigned_user.last_name}" if assigned_user else "Unknown"
        )
        result.append({
            'case_id': case.id,
            'category': case.category,
            'subcategory': case.subcategory,
            'assigned_user_name': assigned_user_name
        })
    return jsonify(result)


@accounts_bp.route('/create', methods=['POST'])
def create_account():
    data = request.get_json()
    required_fields = ['first_name', 'last_name', 'address', 'business_unit', 'undertaking']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    new_account = Account(
        first_name=data['first_name'],
        last_name=data['last_name'],
        address=data['address'],
        business_unit=data['business_unit'],
        undertaking=data['undertaking']
    )
    db_session.add(new_account)
    db_session.commit()
    return jsonify({
        'message': 'Account created successfully',
        'account_id': new_account.account_id
    }), 201
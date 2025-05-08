from datetime import datetime
from flask import Blueprint, request, jsonify
from backend.models.schema import Case, Update, Account, User
from backend.database import db_session

cases_bp = Blueprint('cases', __name__)

@cases_bp.route('/', methods=['GET'])
def get_cases():
    cases = db_session.query(Case).all()
    return jsonify([case.to_dict() for case in cases]), 200

@cases_bp.route('/case_details/<int:case_id>', methods=['GET'])
def get_case_details(case_id):
    case = db_session.query(Case).get(case_id)
    if not case:
        return jsonify({"error": "Case not found"}), 404

    # Get updates related to this case
    updates = db_session.query(Update).filter_by(case_id=case_id).all()

    # Get related account info
    account = db_session.query(Account).get(case.account_id)
    case_dict = case.to_dict()
    if account:
        case_dict["business_unit"] = account.business_unit
        case_dict["undertaking"] = account.undertaking
    else:
        case_dict["business_unit"] = None
        case_dict["undertaking"] = None

    # Add created_user and assigned_user full names
    created_user = db_session.query(User).get(case.created_user_id)
    assigned_user = db_session.query(User).get(case.assigned_user_id)
    case_dict["created_user_name"] = (
        f"{created_user.first_name} {created_user.last_name}" if created_user else "Unknown"
    )
    case_dict["assigned_user_name"] = (
        f"{assigned_user.first_name} {assigned_user.last_name}" if assigned_user else "Unknown"
    )

    # Attach creator's full name to each update
    updates_list = []
    for u in updates:
        update_dict = u.to_dict()
        user = db_session.query(User).get(u.created_user_id)
        if user:
            update_dict["created_by"] = f"{user.first_name} {user.last_name}"
        else:
            update_dict["created_by"] = "Unknown"
        updates_list.append(update_dict)

    return jsonify({
        "case": case_dict,
        "updates": updates_list
    })

@cases_bp.route('/create_case', methods=['POST'])
def create_case():
    data = request.json
    new_case = Case(
        account_id=data['account_id'],
        created_user_id=data['created_user_id'],
        assigned_user_id=data['assigned_user_id'],
        status=data['status'],
        description=data['description'],
        category=data['category'],
        subcategory=data['subcategory']
    )
    db_session.add(new_case)
    db_session.commit()
    return jsonify(new_case.to_dict()), 201

""" @cases_bp.route('/update_case/<int:case_id>', methods=['PUT'])
def update_case(case_id):
    case = db_session.query(Case).get(case_id)
    if not case:
        return jsonify({'message': 'Case not found'}), 404

    data = request.json
    case.account_id = data.get('account_id', case.account_id)
    case.status = data.get('status', case.status)
    case.category = data.get('category', case.category)
    case.subcategory = data.get('subcategory', case.subcategory)
    case.description = data.get('description', case.description)

    db_session.commit()
    return jsonify(case.to_dict()), 200 """


@cases_bp.route('/update_case/<int:case_id>', methods=['PUT'])
def update_case(case_id):
    data = request.json
    case = db_session.query(Case).filter(Case.id == case_id).first()
    if not case:
        return jsonify({'message': 'Case not found'}), 404

    # Only update allowed fields
    if 'assigned_user_id' in data:
        case.assigned_user_id = data['assigned_user_id']
    if 'status' in data:
        case.status = data['status']
    case.date_modified = datetime.utcnow()

    db_session.commit()
    return jsonify({'message': 'Case updated successfully'}), 200

@cases_bp.route('/delete_case/<int:case_id>', methods=['DELETE'])
def delete_case(case_id):
    case = db_session.query(Case).get(case_id)
    if not case:
        return jsonify({'message': 'Case not found'}), 404

    db_session.delete(case)
    db_session.commit()
    return jsonify({'message': 'Case deleted successfully'}), 200

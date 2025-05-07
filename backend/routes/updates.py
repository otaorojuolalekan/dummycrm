from flask import Blueprint, request, jsonify
from backend.models.schema import Update, Case, User
from backend.database import db_session

updates_bp = Blueprint('updates', __name__)

@updates_bp.route('/', methods=['POST'])
def add_update():
    data = request.json
    new_update = Update(
        created_user_id=data['created_user_id'],
        case_id=data['case_id'],
        update_description=data['update_description']
    )
    db_session.add(new_update)
    db_session.commit()
    # Fetch user name for response
    user = db_session.query(User).filter(User.user_id == new_update.created_user_id).first()
    created_by = f"{user.first_name} {user.last_name}" if user else "Unknown"
    return jsonify({
        'id': new_update.id,
        'case_id': new_update.case_id,
        'update_description': new_update.update_description,
        'created_user_id': new_update.created_user_id,
        'created_by': created_by
    }), 201

@updates_bp.route('/updates/case/<int:case_id>', methods=['GET'])
def get_updates_for_case(case_id):
    updates = db_session.query(Update).filter(Update.case_id == case_id).all()
    result = []
    for update in updates:
        user = db_session.query(User).filter(User.user_id == update.created_user_id).first()
        created_by = f"{user.first_name} {user.last_name}" if user else "Unknown"
        result.append({
            'id': update.id,
            'update_description': update.update_description,
            'created_user_id': update.created_user_id,
            'created_by': created_by
        })
    return jsonify(result), 200

@updates_bp.route('/updates/<int:update_id>', methods=['GET'])
def get_update(update_id):
    update = db_session.query(Update).filter(Update.id == update_id).first()
    if update:
        user = db_session.query(User).filter(User.user_id == update.created_user_id).first()
        created_by = f"{user.first_name} {user.last_name}" if user else "Unknown"
        return jsonify({
            'id': update.id,
            'case_id': update.case_id,
            'update_description': update.update_description,
            'created_user_id': update.created_user_id,
            'created_by': created_by
        }), 200
    return jsonify({'message': 'Update not found'}), 404
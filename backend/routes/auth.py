from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models.schema import User
from backend.database import db_session
import os
from dotenv import load_dotenv
load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = db_session.query(User).filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        # Here you would typically create a session or token
        return jsonify({"message": "Login successful", "user_id": user.user_id}), 200
    return jsonify({"message": "Invalid username or password"}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    # Logic for logging out the user (e.g., clearing session or token)
    return jsonify({"message": "Logout successful"}), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    username = data.get('username')
    password = data.get('password')
    is_admin = data.get('is_admin', 0)
    department = data.get('department')

    hashed_password = generate_password_hash(password)

    new_user = User(first_name=first_name, last_name=last_name, username=username,
                    password=hashed_password, is_admin=is_admin, department=department)

    db_session.add(new_user)
    db_session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/get_users', methods=['GET'])
def get_accounts():
    users = db_session.query(User).all()
    return jsonify([{
        'user_id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'username': user.username,
        'department': user.department,
        'is_admin': user.is_admin,
        'full_name': f"{user.first_name} {user.last_name}"
    } for user in users])

@auth_bp.route('/get_user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = db_session.query(User).filter_by(user_id=user_id).first()
    if user:
        return jsonify({
            'user_id': user.user_id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'username': user.username,
            'department': user.department,
            'is_admin': user.is_admin,
            'full_name': f"{user.first_name} {user.last_name}"
        })
    return jsonify({'error': 'User not found'}), 404



@auth_bp.route('/user_list', methods=['GET'])
def user_list():
    users = db_session.query(User).all()
    return jsonify([{
        'user_id': user.user_id,
        'assigned_name': f"{user.first_name} {user.last_name}",
    } for user in users])


from flask import Flask
from backend.routes.auth import auth_bp
from backend.routes.accounts import accounts_bp
from backend.routes.cases import cases_bp
from backend.routes.updates import updates_bp
from backend.database import Base, engine
from flask_cors import CORS


# Ensure tables are created
Base.metadata.create_all(engine)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

@app.route('/')
def index():
    return "CRMIFY Backend is running!"

# Register blueprints for routes
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(accounts_bp, url_prefix='/accounts')
app.register_blueprint(cases_bp, url_prefix='/cases')
app.register_blueprint(updates_bp, url_prefix='/updates')

if __name__ == '__main__':
    app.run(debug=True)
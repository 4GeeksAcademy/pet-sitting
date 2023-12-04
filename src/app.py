"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from flask_cors import CORS
# from models import Person


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False

CORS(app)

app.config["JWT-SECRET_KEY"]=os.environ.get("JWT-SECRET_KEY")
jwt=JWTManager(app)
# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# # add the admin
# setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/reset-password/<token>')
def reset_password_route(token):
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    token = request.json.get('token')
    new_password = request.json.get('new_password')

    try:
        # Decodificar o token JWT para obter o email do usuário
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        email = payload.get('email')

        # Validar se o token não expirou e se o email é válido
        # (Você pode adicionar mais validações conforme necessário)

        # Encontrar o usuário pelo email
        user = User.query.filter_by(email=email).first()
        if user:
            # Atualizar a senha do usuário
            user.password = generate_password_hash(new_password)
            db.session.commit()
            return jsonify({'message': 'Password reset successful.'}), 200
        else:
            return jsonify({'error': 'Usuário não encontrado.'}), 404

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expirado.'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Token inválido.'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

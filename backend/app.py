from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret'  # 実際には安全な場所に保管してください
jwt = JWTManager(app)

# 仮のユーザーデータ（ユーザー名: パスワードハッシュとユーザー情報を格納）
users = {
    "user1": {
        "password_hash": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "name": "ユーザー1",
        "email": "user1@example.com",
        "address": "東京都千代田区XXX",
        "occupation": "会社員"
    }
}

# ログイン認証のエンドポイント
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    user = users.get(username, None)
    if user and check_password_hash(user['password_hash'], password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "ユーザー名またはパスワードが間違っています"}), 401

# ユーザー情報を返すエンドポイント
@app.route('/user-info', methods=['GET'])
@jwt_required()
def user_info():
    current_user_id = get_jwt_identity()
    user = users.get(current_user_id, None)
    if user:
        user_info = {
            "name": user["name"],
            "email": user["email"],
            "address": user["address"],
            "occupation": user["occupation"]
        }
        return jsonify(user_info), 200
    else:
        return jsonify({"msg": "ユーザー情報が見つかりません"}), 404

if __name__ == '__main__':
    app.run(debug=True)

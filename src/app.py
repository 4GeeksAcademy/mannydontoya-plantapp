"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, jsonify,request,url_for,send_from_directory,abort,make_response
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db,User, BlogPost, PostLike, Comment, CommentLike
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import re
import hashlib
# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

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


# Configura la extensión Flask-JWT-Extended
app.config["JWT_SECRET_KEY"] = "super19"  # ¡Cambia las palabras "super-secret" por otra cosa!
jwt = JWTManager(app)

CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
def validate_password(password):  
    reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"
     
    # compiling regex
    pat = re.compile(reg)
     
    # searching regex                 
    return re.search(pat, password)  

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

@app.route('/users', methods=['GET'])
def get_users():
    """logged_user = get_jwt_identity();
    user = User.query.filter_by(username=logged_user).first()"""
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    response_body = {
    "users":users
    }
    return jsonify(response_body), 200


@app.route('/signup', methods=['POST'])
def handle_signup():
    data = request.json
    existUser = User.query.filter_by(username=data["username"]).first()
    existEmail = User.query.filter_by(email=data["email"]).first()
    
    validemail = re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', data["email"])
    
    # Validate input data
    response_error = {"errors": {}}
    
    if existUser:
        response_error["errors"]["User"] = "User already exists"
    if existEmail:
        response_error["errors"]["Email"] = "Email already in use"
    if not data["username"]:
        response_error["errors"]["UserEmpty"] = "Empty username"
    if not data["email"]:
        response_error["errors"]["EmailEmpty"] = "Empty email"
    if not data["password"]:
        response_error["errors"]["PasswordEmpty"] = "Empty password"
    if not validemail and data["email"]:
        response_error["errors"]["InvalidEmail"] = "Invalid email"
    if not validate_password(data["password"]):
        response_error["errors"]["InvalidPassword"] = "The password must have at least 8 characters, special symbols, number, uppercase and lowercase."
    if data["rpassword"] != data["password"]:
        response_error["errors"]["PasswordMismatch"] = "Passwords do not match."
        
    if response_error["errors"]:
        return make_response(jsonify(response_error), 400)
        
    # Hash password before storing
    encoded_pass = hashlib.sha256(data["password"].encode("utf-8")).hexdigest()
    
    user1 = User(
        email=data["email"],
        username=data["username"],
        password=encoded_pass,
        is_active=False
    )
    db.session.add(user1)
    db.session.commit()
    
    return jsonify({"message": "User successfully created"}), 200

@app.route('/login', methods=['POST'])
def handle_login():
    encodepass = hashlib.sha256(request.json["password"].encode("utf-8")).hexdigest()
    user = User.query.filter_by(username=request.json["username"], password= encodepass).first()
    useremail = User.query.filter_by(email=request.json["username"], password=encodepass).first()
    if user is not None:
        access_token=create_access_token(identity=user.username)
        user.is_active=True
        db.session.commit()
        return jsonify({"token":access_token,"id":user.id,"username":user.username}),200
    elif useremail is not None:
        access_token=create_access_token(identity=useremail.username)
        useremail.is_active=True
        db.session.commit()
        return jsonify({"token":access_token,"id":useremail.id,"username":useremail.username}),200
    else:       
        return make_response(jsonify({"error":"Missing or Incorrect Credentials"}),401) 
        

# @app.route('/logoff', methods=['POST'])
# @jwt_required()
# def handle_logoff():
#     user = User.query.filter_by(username=request.json["username"]).first()
#     user.is_active=False;
#     db.session.commit()
#     return jsonify({"message":"User successfuly logoff"}),200

@app.route('/logoff', methods=['POST'])
@jwt_required()
def handle_logoff():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    user.is_active = False
    db.session.commit()
    return jsonify({"message": "User successfully logged out"}), 200


@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get([id])
    db.session.delete(user)
    db.session.commit()
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    response_body = {
    "users":users
    }
    return jsonify(response_body), 200

@app.route('/user/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user = User.query.get(id)
    if user is not None:
        response_body = {
        "user":user.serialize()
        }
        return jsonify(response_body), 200
    else:
         return make_response(jsonify({"error":"Not found"}),404)  





@app.route('/profile', methods=['POST'])
@jwt_required()
def handle_profile():
    data = request.json
    existUser = False
    existEmail = False
    finalUser=None
    User2 = User.query.filter_by(username=data["username"]).all()
    Email = User.query.filter_by(email=data["email"]).all()
    for us in User2:
        if(us.id != data["id"]):
            existUser=True
        else:
            finalUser=us    
    for em in Email:
        if(em.id != data["id"]):
            existEmail=True
        else:
            finalUser=em            
    validemail = re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', data["email"])
    
    # Validate input data
    response_error = {"errors": {}}
    
    if existUser:
        response_error["errors"]["User"] = "User already exists"
    if existEmail:
        response_error["errors"]["Email"] = "Email already in use"
    if not data["username"]:
        response_error["errors"]["UserEmpty"] = "Empty username"
    if not data["email"]:
        response_error["errors"]["EmailEmpty"] = "Empty email"
    if not validemail and data["email"]:
        response_error["errors"]["InvalidEmail"] = "Invalid email"
    if not data["password"] =="" and not validate_password(data["password"]):
        response_error["errors"]["InvalidPassword"] = "The password must have at least 8 characters, special symbols, number, uppercase and lowercase."
    if data["rpassword"] != data["password"]:
        response_error["errors"]["PasswordMismatch"] = "Passwords do not match."
        
    if response_error["errors"]:
        return make_response(jsonify(response_error), 406)
        
    # Hash password before storing
    encoded_pass = hashlib.sha256(data["password"].encode("utf-8")).hexdigest()
    finalUser.email=data["email"]
    finalUser.username=data["username"]
    if not data["password"] =="":
        finalUser.password=encoded_pass
    db.session.commit()
    
    return jsonify({"message": "User successfully updated"}), 200

# ----------------------------- blog routes -----------------------------
# ----------------------------- blog routes -----------------------------
# ----------------------------- blog routes -----------------------------
# ----------------------------- blog routes -----------------------------
@app.route("/blog_posts", methods=["GET"])
def get_all_posts():
    posts = BlogPost.query.all()
    return jsonify([post.serialize() for post in posts]), 200

@app.route("/blog_posts/<int:id>", methods=["GET"])
def get_post(id):
    post = BlogPost.query.get_or_404(id)
    return jsonify(post.serialize()), 200

@app.route("/blog_posts", methods=["POST"])
def create_post():
    data = request.json
    author = User.query.get(data["author_id"])
    if not author:
        return jsonify({"error": "Author not found"}), 404
    new_post = BlogPost(
        title=data["title"],
        content=data["content"],
        image_url=data.get("image_url"),
        author=author
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify(new_post.serialize()), 201

@app.route("/blog_posts/<int:blog_id>/edit", methods=["PUT"])
def edit_blog(blog_id):
    # Get the user ID from the request headers
    user_id = request.headers.get('userId')

    if not user_id:
        return jsonify({"message": "Unauthorized: Missing userId"}), 401

    try:
        # Find the blog by its ID
        blog = BlogPost.query.get(blog_id)

        if not blog:
            return jsonify({"message": "Blog not found"}), 404

        # Check if the logged-in user is the author of the blog
        if blog.author_id != int(user_id):
            return jsonify({"message": "Unauthorized: You are not the author of this blog"}), 403

        # Get the data from the request
        data = request.json

        # Update the blog fields
        if "title" in data:
            blog.title = data["title"]
        if "content" in data:
            blog.content = data["content"]
        if "image_url" in data:
            blog.image_url = data["image_url"]

        # Save the changes
        db.session.commit()

        return jsonify({
            "message": "Blog updated successfully",
            "blog": blog.serialize()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/delete_blog/<int:blog_id>', methods=['DELETE'])
def delete_blog(blog_id):
    # Get the user ID from the request headers or session
    user_id = request.headers.get('userId')  # This should match `store.userId` in the frontend

    if not user_id:
        return jsonify({"message": "Unauthorized: Missing userId"}), 401

    try:
        # Find the blog by its ID
        blog = BlogPost.query.get(blog_id)

        if not blog:
            return jsonify({"message": "Blog not found"}), 404

        # Check if the logged-in user is the author of the blog
        if blog.author_id != int(user_id):
            return jsonify({"message": "Unauthorized: You are not the author of this blog"}), 403

        # If the user is the author, delete the blog
        db.session.delete(blog)
        db.session.commit()

        return jsonify({"message": "Blog deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route("/blog_posts/<int:post_id>/like", methods=["POST"])
def like_post(post_id):
    if not request.headers.get('userId'):
        return jsonify({"error": "Unauthorized"}), 401
        
    data = request.json
    user_id = request.headers.get('userId')
    
    existing_like = PostLike.query.filter_by(
        user_id=user_id,
        post_id=post_id
    ).first()
    
    try:
        if existing_like:
            if existing_like.is_like == data["is_like"]:
                db.session.delete(existing_like)
            else:
                existing_like.is_like = data["is_like"]
        else:
            new_like = PostLike(
                user_id=user_id,
                post_id=post_id,
                is_like=data["is_like"]
            )
            db.session.add(new_like)
        
        db.session.commit()
        return jsonify({"message": "Success"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/blog_posts/<int:post_id>/comments", methods=["GET"])
def get_comments(post_id):
    comments = Comment.query.filter_by(post_id=post_id).all()
    return jsonify([comment.serialize() for comment in comments]), 200

@app.route("/blog_posts/<int:post_id>/comments", methods=["POST"])
def add_comment(post_id):
    if not request.headers.get('userId'):
        return jsonify({"error": "Unauthorized"}), 401
        
    data = request.json
    user_id = request.headers.get('userId')
    
    new_comment = Comment(
        content=data["content"],
        user_id=user_id,
        post_id=post_id
    )
    
    db.session.add(new_comment)
    db.session.commit()
    
    return jsonify(new_comment.serialize()), 201

@app.route("/comments/<int:comment_id>", methods=["DELETE"])
def delete_comment(comment_id):
    user_id = request.headers.get('userId')
    
    if not user_id:
        return jsonify({"message": "Unauthorized: Missing userId"}), 401
        
    try:
        comment = Comment.query.get(comment_id)
        
        if not comment:
            return jsonify({"message": "Comment not found"}), 404
            
        if comment.user_id != int(user_id):
            return jsonify({"message": "Unauthorized: You are not the author of this comment"}), 403
            
        db.session.delete(comment)
        db.session.commit()
        
        return jsonify({"message": "Comment deleted successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/comments/<int:comment_id>/like", methods=["POST"])
def like_comment(comment_id):
    if not request.headers.get('userId'):
        return jsonify({"error": "Unauthorized"}), 401
        
    data = request.json
    user_id = request.headers.get('userId')
    
    existing_like = CommentLike.query.filter_by(
        user_id=user_id,
        comment_id=comment_id
    ).first()
    
    if existing_like:
        if existing_like.is_like == data["is_like"]:
            db.session.delete(existing_like)
        else:
            existing_like.is_like = data["is_like"]
    else:
        new_like = CommentLike(
            user_id=user_id,
            comment_id=comment_id,
            is_like=data["is_like"]
        )
        db.session.add(new_like)
    
    db.session.commit()
    return jsonify({"message": "Success"}), 200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

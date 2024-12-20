  
import os
from flask_admin import Admin
from .models import db, User, Plant, Favorite, BlogPost, Comment, PostLike, CommentLike
from flask_admin.contrib.sqla import ModelView

class BlogPostModelView(ModelView):
    column_list = (
        'author.email', 
        'author.username', 
        'author.id',
        'title', 
        'content', 
        'image_url', 
        'created_at', 
        'likes_count', 
        'dislikes_count', 
        'comments_count'
    )
    
    column_labels = {
        'author.email': 'Author Email',
        'author.username': 'Author Username',
        'likes_count': 'Likes',
        'dislikes_count': 'Dislikes',
        'comments_count': 'Comments'
    }
    
    column_searchable_list = ('title', 'content', 'author.email', 'author.username')
    column_filters = ('created_at', 'author.email')
    
    column_formatters = {
        'likes_count': lambda v, c, m, n: sum(1 for like in m.likes if like.is_like),
        'dislikes_count': lambda v, c, m, n: sum(1 for like in m.likes if not like.is_like),
        'comments_count': lambda v, c, m, n: len(m.comments)
    }
    
    can_create = True
    can_edit = True
    can_delete = True
    
    create_modal = True
    edit_modal = True

class CommentModelView(ModelView):
    column_list = (
        'post.title',
        'user.username',
        'content',
        'created_at',
        'likes_count',
        'dislikes_count'
    )
    
    column_labels = {
        'post.title': 'Blog Post',
        'user.username': 'Commenter',
        'likes_count': 'Likes',
        'dislikes_count': 'Dislikes'
    }
    
    column_searchable_list = ('content', 'user.username', 'post.title')
    column_filters = ('created_at', 'user.username', 'post.title')
    
    column_formatters = {
        'likes_count': lambda v, c, m, n: sum(1 for like in m.likes if like.is_like),
        'dislikes_count': lambda v, c, m, n: sum(1 for like in m.likes if not like.is_like)
    }
    
    can_create = True
    can_edit = True
    can_delete = True
    
    create_modal = True
    edit_modal = True

class PostLikeModelView(ModelView):
    column_list = (
        'post.title', 
        'post.author.username',  # Blog author's username 
        'user.username',         # Liker's username
        'is_like', 
        'created_at'
    )
    column_labels = {
        'post.title': 'Blog Post',
        'post.author.username': 'Post Author',
        'user.username': 'Liked/Disliked By',
        'is_like': 'Like/Dislike'
    }
    column_filters = ('is_like', 'created_at', 'user.username', 'post.author.username')
    column_searchable_list = ('user.username', 'post.author.username', 'post.title')

class CommentLikeModelView(ModelView):
    column_list = (
        'comment.post.title',     # Blog post title
        'comment.user.username',  # Comment author's username
        'user.username',         # Liker's username
        'comment.content', 
        'is_like', 
        'created_at'
    )
    column_labels = {
        'comment.post.title': 'Blog Post',
        'comment.user.username': 'Comment Author',
        'user.username': 'Liked/Disliked By',
        'comment.content': 'Comment',
        'is_like': 'Like/Dislike'
    }
    column_filters = ('is_like', 'created_at', 'user.username', 'comment.user.username')
    column_searchable_list = ('user.username', 'comment.user.username', 'comment.content')

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Plant, db.session))
    admin.add_view(ModelView(Favorite, db.session))
    admin.add_view(BlogPostModelView(BlogPost, db.session))
    admin.add_view(CommentModelView(Comment, db.session))
    admin.add_view(PostLikeModelView(PostLike, db.session))
    admin.add_view(CommentLikeModelView(CommentLike, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
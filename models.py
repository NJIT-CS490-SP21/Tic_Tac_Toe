from app import DB

class Person(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    username = DB.Column(DB.String(80), unique=True, nullable=False)
    email = DB.Column(DB.String(120), unique=True, nullable=False)
    
    def __repr__(self):
        return '<Person %r>' % self.username
import pymysql.cursors
from flask import Flask, render_template, jsonify, request
from datetime import datetime

app = Flask(__name__, static_url_path='/')

connection = pymysql.connect(host='localhost',
                             user='root',
                             db='blog',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/getallblogs")
def getallblogs():
    print('getting all blogs')

    blogs = []
    result = []
    with connection.cursor() as cursor:
        cursor.execute('SELECT * FROM blogs')
        result = cursor.fetchall()

    for entry in result:
        blogs.append({
            "id": entry['id'],
            'title': entry['title'],
            'description': entry['description'],
            'content': entry['content'],
            'created_at': entry['created_at']
        })

    print('all blogs loaded')

    return {
        "status": True,
        "mode": "getallblogs",
        "data": blogs,
    }


@app.route('/newblog')
def newblog():
    title = request.args.get('title')
    descr = request.args.get('description')
    content = request.args.get('content')

    print('creating new blog with title ', title)

    with connection.cursor() as cursor:
        sql = "INSERT INTO blogs (title, description, content) VALUES (%s, %s, %s)"
        val = (title, descr, content)
        cursor.execute(sql, val)
    connection.commit()

    print('new blog successfully created')

    return {
        'status': True,
        'mode': 'newblog',
        'data': True,
    }


@app.route('/deleteblog')
def deleteblog():
    id_ = request.args.get('id')

    print("delete blog with id = ", id_)
    sql = "DELETE FROM blogs WHERE id = " + id_

    with connection.cursor() as cursor:
        cursor.execute(sql)
    connection.commit()

    print('blog deleted')

    return {
        'status': True,
        'mode': 'deleteblog',
        'data': True,
    }


@app.route('/update')
def update():
    id_ = request.args.get('id')
    title = request.args.get('title')
    description = request.args.get('description')
    content = request.args.get('content')

    print('updating...')
    with connection.cursor() as cursor:
        sql = f"UPDATE blogs SET title = '{title}', description = '{description}', content = '{content}' WHERE id = '{id_}'"
        cursor.execute(sql)
    print('updated')
    return {'status': True}


if __name__ == "__main__":
    app.run(
        host='127.0.0.1',
        port='5511',
        debug=True,
    )
    connection.close()
    print("closed")

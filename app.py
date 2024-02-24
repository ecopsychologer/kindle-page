import os
from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('update_content')
def handle_update_content(message):
    socketio.emit('update', message)

@app.route('/tabs')
def list_tabs():
    tabs = os.listdir('tabs/')
    return render_template('list_tabs.html', tabs=tabs)

@app.route('/pdf-viewer')
def pdf_viewer():
    return render_template('pdf_viewer.html')

@app.route('/tabs/<filename>')
def tab_file(filename):
    return send_from_directory('tabs', filename)

@app.route('/send_update/<message>')
def send_update(message):
    socketio.emit('update', {'message': message})
    return "Message sent: " + message

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)

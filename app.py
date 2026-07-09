from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

OPENCAGE_API_KEY = 'b139f378033a4b8aa2c8560b7a46bdbf'



@app.route('/')
def index():
    return render_template('login.html')
  


@app.route('/get-address', methods=['POST'])
def get_address():
    data = request.get_json()
    lat = data.get('latitude')
    lng = data.get('longitude')
    


    if not lat or not lng:
        return jsonify({'address': 'Invalid coordinates'}), 400



    api_url = f'https://api.opencagedata.com/geocode/v1/json?q={lat}+{lng}&key={OPENCAGE_API_KEY}'
    response = requests.get(api_url)
    json_data = response.json()

    if json_data['results']:
        address = json_data['results'][0]['formatted']
    else:
        address = 'No address found for these coordinates.'

    return jsonify({'address': address})


if __name__ == '__main__':
    app.run(debug=True)


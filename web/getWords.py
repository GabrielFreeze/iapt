from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import os


app = Flask(__name__)
cors = CORS(app)
df = pd.read_csv(os.path.join('..','data','gabra','final','lexemes.csv'), usecols=['lemma','glosses'])

def getWords():
    words = df.sample(n=5)
    return words.to_dict()



@app.route("/getwords", methods=["POST"])
def receiver():
#    data = request.get_json()

   data = jsonify(getWords())

   return data

#Run the app:
if __name__ == "__main__":
     app.run()
from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import os


app = Flask(__name__)
cors = CORS(app)
df = pd.read_csv(os.path.join('..','data','gabra','final','lexemes.csv'), usecols=['lemma','glosses','root','pos'])

def getWords():
    
    nouns = df[df['pos']=='NOUN'].sample(n=3)
    adjectives = df[df['pos']=='NOUN'].sample(n=2)
    other = df.sample(n=2)

    words = pd.concat([nouns, adjectives, other])
    
    return words.to_dict()


@app.route("/getwords", methods=["POST"])
def receiver():
#    data = request.get_json()

   data = jsonify(getWords())

   return data

#Run the app:
if __name__ == "__main__":
     app.run()
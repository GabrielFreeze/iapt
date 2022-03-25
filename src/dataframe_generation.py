import pandas as pd
import os
import json

path = os.path.join(os.path.dirname(__file__),'..','data','gabra','sources.json')
df = pd.DataFrame()

with open(path) as f:
    lines = f.readlines()
    
    
    for i,l in enumerate(lines):
        
        if len(l) != 1:
            json_object = json.loads(l)
            df_tmp = pd.json_normalize(json_object)
            df = pd.concat([df,df_tmp])

print(df.head())

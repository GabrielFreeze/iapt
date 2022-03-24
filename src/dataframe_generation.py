import pandas as pd
import os
import json
from pandas import json_normalize


path = os.path.join(os.path.dirname(__file__),'..','data','gabra','lexemes.json')
df = pd.DataFrame()

# with open(path) as f:
#     for l in f.readlines():
#         df_tmp =         
    
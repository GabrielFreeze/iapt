import os 
import pandas as pd

path = os.path.join(os.getcwd(),'data','gabra','final')

df = pd.read_csv(os.path.join(path,'lexemes.csv'))

with open(os.path.join(path,'to_translate.txt'),'w',encoding='utf-8') as f:
    f.writelines([g+'\n' for g in df['glosses']])
    pass

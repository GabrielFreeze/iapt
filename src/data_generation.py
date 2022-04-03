import pandas as pd
import os
import bson

files = ['lexemes','sources','roots','wordforms']
for file in files:
    read_path = os.path.join(os.getcwd(),'..','data','gabra', file+".bson")
    write_path = os.path.join(os.getcwd(),'..','data','gabra',file+".csv")


    with open(read_path, 'rb', ) as f:
        data = bson.decode_all(f.read())

    df = pd.DataFrame(data)

    df.drop("_id", axis=1, inplace=True)

    df.to_csv(write_path, index=False, header=True, encoding='utf-32')
    print(f'Finished {file}')

print('\nFinished All')
    

import re
import os
import pandas as pd
import seaborn as sns

folder = os.path.join(os.getcwd(),'..','data','korpus')
# subjects = ['Academic','Culture','European','Law','News',
#             'Opinion','Parliament','Religion','Sport']
subjects = []

with open(os.path.join(folder,'korpus.csv'), 'w', encoding='utf-8') as f1:
    for sbj in subjects:
        with open(os.path.join(folder,sbj,sbj+'.csv'), 'r', encoding='utf-8') as f2:
            f1.write('\n')
            f1.write(f2.read())
            print(f'{sbj} Finished')

print('All Finished')
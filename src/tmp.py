import re
import os
import pandas as pd

folder = os.path.join(os.getcwd(),'..','data','korpus')
subjects = ['Parliament']

for sbj in subjects:
    data = []
    path = os.path.join(folder,sbj)
    
    for filename in os.listdir(path):
        filepath = os.path.join(path,filename)
        
        with open(filepath,'r', encoding='utf-8') as f:
            print(filename)
            lines = f.readlines()
            
            for l in lines:
                d = l.split('\t')
                
                #Start and End Token
                if len(d) == 1:
                    if re.search(r'<s id="[0-9]*">', d[0]): data.append(['<s>','START',None,None])
                    elif re.search(r'</s>', d[0]):          data.append(['</s>','END',None,None])
                
                elif len(d) > 1:
                    d[-1] = d[-1][:-1]
                    data.append(d)
                    
    df = pd.DataFrame(data, columns=['Word','POS','Lemma','Root'])
    df.to_csv(os.path.join(path,sbj+'.csv'), index=False)

print('Finished!')
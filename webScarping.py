import requests as r
from bs4 import BeautifulSoup
res= r.get('https://www.geeksforgeeks.org/python-programming-language/')
# print(res.status_code)  
# print (res.content)

# print(soup.prettify())
if(res.status_code==200):
    soup=BeautifulSoup(res.content,'html.parser')
    divs = soup.find_all('div')
    for divi in divs:
        s=divi.text.strip()
        print(s)
else:
    print("Failed to retrieve the webpage")
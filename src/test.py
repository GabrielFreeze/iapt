import requests

url = "https://google-translate1.p.rapidapi.com/language/translate/v2"

payload = "source=en&target=mt&q=an event of crucifixion"
headers = {
	"content-type": "application/x-www-form-urlencoded",
	"Accept-Encoding": "application/gzip",
	"X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
	"X-RapidAPI-Key": "a6cb32e7fdmsh7c05392c744d13fp124dc7jsn1c3c7db144f7"
}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
from app.models.models import Word
from app.db.mysql_connector import MysqlConnector
from app.config import config


DB = config.get('DB')
mysql_connector = MysqlConnector(config=DB)

irregular_verbs_path = './irregular_verbs.txt'
regular_path = './regular.txt'


irregular_verbs = []
regular = []


with open(irregular_verbs_path, encoding="utf-8") as file:
    content = file.read().split('\n')
if len(content) % 4 != 0:
    raise Exception(f"Wczytywany plik {irregular_verbs_path} ma błędną strukturę")
for i in range(0, len(content), 4):
    obj = Word(translation=content[i + 3], expression=content[i], imperfekt=content[i + 1], perfekt=content[i + 2], type=3)
    irregular_verbs.append(obj)

with open(regular_path, encoding="utf-8") as file:
    content = file.read().split('\n')
if len(content) % 2 != 0:
    raise Exception(f"Wczytywany plik {regular_path} ma błędną strukturę")
for i in range(0, len(content), 2):
    word = Word(translation=content[i + 1],expression=content[i],type=2)
    regular.append(word)

for word in irregular_verbs:
    mysql_connector.insert_vocabulary(word)

for word in regular:
    mysql_connector.insert_vocabulary(word)

print("done")

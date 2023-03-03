sql = {
    "getLanguages": "SELECT id, name FROM languages",
    "getVocabularyType": "SELECT id, name FROM vocabulary_type WHERE language={language}",
    "getVocabulary": "SELECT id, translation, expression, imperfekt, perfekt FROM vocabulary WHERE type={type}",
    "getUser": "SELECT u.id as id, u.username as username, u.password as password, r.name as role FROM users as u INNER JOIN role as r ON u.role = r.id WHERE u.username = '{login}'",
    "insertVocabulary": "INSERT INTO vocabulary (id, translation, expression, imperfekt, perfekt, type) VALUES (NULL, %s, %s, %s, %s, %s)"
}

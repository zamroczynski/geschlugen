sql = {
    "getLanguages": "SELECT id, name FROM languages",
    "getVocabularyType": "SELECT id, name FROM vocabulary_type WHERE language={language}",
    "getVocabulary": "SELECT id, translation, expression, imperfekt, perfekt FROM vocabulary WHERE type={type}",
    "getUser": "SELECT users.id as id, users.login as login, users.password as password role.name as role FROM users WHERE login={login} INNER JOIN role ON users.role = role.id",
}

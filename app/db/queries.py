sql = {
    "getLanguages": "SELECT id, name FROM languages",
    "getVocabularyType": "SELECT id, name FROM vocabulary_type WHERE language={language}",
    "getVocabulary": "SELECT id, translation, expression, imperfekt, perfekt FROM vocabulary WHERE type={type}",
    "getUser": "SELECT users.id as id, users.login as login, role.name as role FROM users WHERE password={password} INNER JOIN role ON users.role = role.id",
}

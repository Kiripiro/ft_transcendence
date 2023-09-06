ft_transcendence

Notion link:
https://www.notion.so/Trans-en-dance-f98eac71a6054a0e92b86e17580d126f

.env in the main directory:
```
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=R3allyStr0ngPa$$word
POSTGRES_DB=transcendence

APP_PORT=3000

ADMIN_LOGS=admin (POSTGRES_USER)
POSTGRES_PASSWORD=R3allyStr0ngPa$$word
```

backend/src/common/envs/development.env:
```
#Development file

PORT=5001
BASE_URL=https://localhost:5001
CLIENT_URL=https://localhost:3000

DATABASE_HOST=db
DATABASE_NAME=transcendence
DATABASE_USER=backend
DATABASE_PASSWORD=test_password
DATABASE_PORT=5432

API_UID= /* UID 42 API KEY */
API_SECRET= /* SECRET 42 API KEY */
API_authorizationURI=https://api.intra.42.fr/oauth/token
API_redirectURI=https://localhost:5001/auth/login
API_endpoint=https://api.intra.42.fr/v2/

SECRET=super-cat
SALT=10
```

Before starting the project, run:
"npm -i" inside the /frontend and /backend directories

# 🛒 Proyecto TintaCRUD  
CRUD completo de productos — **Backend en Django** + **Frontend en React**

Este proyecto contiene dos aplicaciones:

- **backend/** → API REST en Django  
- **frontend/** → Aplicación React con interfaz en tabla para gestionar productos  

Incluye operaciones completas: **Crear, Listar, Editar y Eliminar productos**.

---

# 🚀 Requisitos previos

Asegurate de tener instalados:

- **Python 3.10+**
- **Node.js 16+**
- **npm 8+**
- **Git**

---

# 📦 Instalación

## 🔹 1. Clonar el repositorio

```bash
git clone https://github.com/JulianArias18/tintacrud.git
cd tintacrud

🖥️ Backend – Django

Ubicación del backend: /backend

1. Crear entorno virtual
cd backend
python -m venv venv

2. Activar entorno virtual

Windows:

venv\Scripts\activate


Linux/Mac:

source venv/bin/activate

3. Instalar dependencias
pip install -r requirements.txt

4. Aplicar migraciones
python manage.py migrate

5. Crear superusuario (opcional)
python manage.py createsuperuser

6. Ejecutar el backend
python manage.py runserver


El backend quedará disponible en:

👉 http://localhost:8000

🎨 Frontend – React

Ubicación del frontend: /frontend

1. Instalar dependencias
cd ../frontend
npm install

2. Iniciar la aplicación
npm start


El frontend queda disponible en:

👉 http://localhost:3000

🔗 Endpoints principales del backend

GET /productos/ → obtener lista

POST /productos/ → crear producto

PUT /productos/<id>/ → editar

DELETE /productos/<id>/ → eliminar

🧩 Arquitectura del proyecto
tintacrud/
│── backend/
│   ├── manage.py
│   ├── productos/
│   ├── db.sqlite3
│   ├── requirements.txt
│
│── frontend/
│   ├── src/
│   ├── package.json
│
└── README.md
FROM python

WORKDIR /geschlugen

COPY ./requirements.txt ./app/

RUN pip install --no-cache-dir --upgrade -r ./app/requirements.txt

COPY . ./app

#ENV PYTHONPATH "${PYTHONPATH}:/app"

CMD ["python3", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]